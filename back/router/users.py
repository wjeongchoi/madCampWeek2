import datetime
from fastapi import Depends, HTTPException, APIRouter, requests
import models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List
from starlette.config import Config
from .auth import create_jwt_token, decode_jwt_token
import bcrypt
 

user = APIRouter()

### CREATE ### 
# create user
@user.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    new_user = models.User(
                userID=user.userID,
                email=user.email, 
                password=hashed_password, 
                name=user.name, 
                createdTime=user.createdTime, 
                imgSrc=user.imgSrc)
    db.add(new_user) 
    db.commit()    
    db.refresh(new_user) 
    return new_user

@user.get("/login", response_model=schemas.UserLoginResponse)
def login_user(email: str, password: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user:
        # Verify the password
        if bcrypt.checkpw(password.encode('utf-8'), db_user.password.encode('utf-8')):
            return {"userID": db_user.userID}
        else:
            raise HTTPException(status_code=401, detail="Incorrect password")
    else:
        raise HTTPException(status_code=404, detail="User not found")






# add ingredient in my refrigerator
@user.post("/{userID}/ingredients", response_model=schemas.UserIngredientResponse)
def add_user_ingredient(userID: str, ingredient_data: schemas.IngredientCreate, db: Session = Depends(get_db)):
    # Check if the user exists
    db_user = db.query(models.User).filter(models.User.userID == userID).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the ingredient exists
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_data.ingredientName).first()
    if not db_ingredient:
        # Optionally create the ingredient if not exist
        db_ingredient = models.Ingredient(ingredientID=ingredient_data.ingredientID,
                                          ingredientName=ingredient_data.ingredientName)
        db.add(db_ingredient)
        db.commit()
        db.refresh(db_ingredient)

    # Create or update the association in t_myIngredients
    association = models.t_myIngredients.insert().values(
        userID=db_user.userID, 
        ingredientID=db_ingredient.ingredientID
    )
    db.execute(association)
    db.commit()

    # Prepare and return the response
    return {"message": "Ingredient added to user successfully"}


# add cooker in my refrigerator
@user.post("/{user_id}/cooker", response_model=schemas.Cooker)
def create_my_cooker(user_id: str, cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not registered")

    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
    if not db_cooker:
        new_cooker = models.Cooker(
            cookerID=cooker.cookerID,
            cookerName=cooker.cookerName)
        db.add(new_cooker) 
        db.commit()   
        db.refresh(new_cooker)
        db_cooker = new_cooker

    # Associate cooker with user using t_myCookers table
    association = models.t_myCookers.insert().values(
        userID=db_user.userID,
        cookerID=db_cooker.cookerID
    )
    db.execute(association)
    db.commit()

    return db_cooker


# add my like recipe
@user.post("/{user_id}/like/recipe", response_model=schemas.LikeRecipeResponse)
def like_recipe(user_id: str, recipe_data: schemas.RecipeLike, db: Session = Depends(get_db)):
    # Check if the user exists
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the recipe exists
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_data.recipeID).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # Create or update the association in t_likeRecipes
    association = models.t_likeRecipes.insert().values(
        userID=db_user.userID, 
        recipeID=db_recipe.recipeID
    )
    db.execute(association)
    db.commit()

    # Prepare and return the response
    return {"message": "Recipe liked successfully"}




# add my recipe
@user.post("/{user_id}/recipe", response_model=schemas.Recipe)
def create_my_recipe(user_id: str, recipe_data: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="User not registered")

    # Directly create a new recipe
    new_recipe = models.Recipe(
        recipeID=recipe_data.recipeID,
        title=recipe_data.title,
        subTitle=recipe_data.subTitle,
        manId=recipe_data.manId,
        cookTime=recipe_data.cookTime,
        like=recipe_data.like,
        writedTime=recipe_data.writedTime,
        modifiedTime=recipe_data.modifiedTime,
        level=recipe_data.level
    )
    db.add(new_recipe) 
    db.commit()   
    db.refresh(new_recipe)

    # Associate recipe with user using t_myRecipes table
    association = models.t_myRecipes.insert().values(
        userID=db_user.userID, 
        recipeID=new_recipe.recipeID
    )
    db.execute(association)

        # Process ingredients
    for ingredient_data in recipe_data.ingredients:
        db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_data.ingredientName).first()
        if not db_ingredient:
            db_ingredient = models.Ingredient(ingredientID=ingredient_data.ingredientID,
                                              ingredientName=ingredient_data.ingredientName)
            db.add(db_ingredient)
            db.commit()
            db.refresh(db_ingredient)

        # Associate ingredient with recipe
        association = models.t_recipeWithIngredient.insert().values(
            recipeID=new_recipe.recipeID, 
            ingredientID=db_ingredient.ingredientID
        )
        db.execute(association)

    # Process cookers
    for cooker_data in recipe_data.cookers:
        db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_data.cookerName).first()
        if not db_cooker:
            db_cooker = models.Cooker(cookerID=cooker_data.cookerID,
                                      cookerName=cooker_data.cookerName)
            db.add(db_cooker)
            db.commit()
            db.refresh(db_cooker)

        # Associate cooker with recipe
        association = models.t_recipeWithCooker.insert().values(
            recipeID=new_recipe.recipeID, 
            cookerID=db_cooker.cookerID
        )
        db.execute(association)

    db.commit()

    return new_recipe


### READ ### 
# get add users
@user.get("/", response_model=List[schemas.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users



# get user
@user.get("/{user_id}", response_model=schemas.User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
    
# get my cookers
@user.get("/{user_id}/cookers", response_model=List[schemas.Cooker])
def get_my_cookers(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.t_myCookers).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for cooker in cookers:
        c = db.query(models.Cooker).filter(models.Cooker.cookerID == cooker.cookerID).first()
        response_data.append(c)
    return response_data

# get my ingredients 
@user.get("/{user_id}/ingredients", response_model=List[schemas.Ingredient])
def get_my_ingredients(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.t_myIngredients).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for ingredient in ingredients:
        i = db.query(models.Ingredient).filter(models.Ingredient.ingredientID == ingredient.ingredientID).first()
        response_data.append(i)
    return response_data

# get my like recipes - 테스트 필요
@user.get("/{user_id}/like/recipes", response_model=List[schemas.Recipe])
def get_my_like_recipes(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    likeRecipes = db.query(models.t_likeRecipes).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for likeRecipe in likeRecipes:
        l = db.query(models.Recipe).filter(models.Recipe.recipeID == likeRecipe.recipeID).first()
        response_data.append(l)
    return response_data

# get my recipes
@user.get("/{user_id}/recipes", response_model=List[schemas.Recipe])
def get_my_recipes(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    myRecipes = db.query(models.t_myRecipes).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for myRecipe in myRecipes:
        m = db.query(models.Recipe).filter(models.Recipe.recipeID == myRecipe.recipeID).first()
        response_data.append(m)
    return response_data


### UPDATE ### 
# update user
@user.put("/{user_id}", response_model=schemas.User)
def update_user(user_id: str, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.imgSrc = user.imgSrc
    db_user.name = user.name
    db_user.password = user.password
    db.commit() 
    return db_user

### DELETE ### 
# delete user
@user.delete("/{user_id}")
def delete_user(user_id: str, db: Session = Depends(get_db)):
    # Check if the user exists
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")


    # Delete associations from likeRecipes
    db.execute(models.t_likeRecipes.delete().where(models.t_likeRecipes.c.userID == user_id))

    # Delete associations from myCookers
    db.execute(models.t_myCookers.delete().where(models.t_myCookers.c.userID == user_id))

    # Delete associations from other tables like myRecipes, myIngredients, etc.
    # Adjust these lines according to your association tables and requirements
    db.execute(models.t_myRecipes.delete().where(models.t_myRecipes.c.userID == user_id))
    db.execute(models.t_myIngredients.delete().where(models.t_myIngredients.c.userID == user_id))
    # Add similar lines for other associations if needed

    # Delete the user
    db.delete(db_user)
    db.commit()

    return {"message": "User deleted successfully"}


# delete user's ingredient
@user.delete("/{user_id}/ingredient/{ingredient_name}")
def delete_user_ingredient(user_id: str, ingredient_name: str, db: Session = Depends(get_db)):
    # Delete the user's ingredient association
    delete_statement = models.t_myIngredients.delete().where(
        models.t_myIngredients.c.userID == user_id,
        models.t_myIngredients.c.ingredientID == (
            db.query(models.Ingredient.ingredientID)
            .filter(models.Ingredient.ingredientName == ingredient_name)
            .subquery()
        )
    )
    result = db.execute(delete_statement)
    db.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Ingredient not found for the user")

    return {"message": "Ingredient deleted from user successfully"}


# delete user's cooker
@user.delete("/{user_id}/cooker/{cooker_name}")
def delete_user_cooker(user_id: str, cooker_name: str, db: Session = Depends(get_db)):
    # Delete the user's cooker association
    delete_statement = models.t_myCookers.delete().where(
        models.t_myCookers.c.userID == user_id,
        models.t_myCookers.c.cookerID == (
            db.query(models.Cooker.cookerID)
            .filter(models.Cooker.cookerName == cooker_name)
            .subquery()
        )
    )
    result = db.execute(delete_statement)
    db.commit()

    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Cooker not found for the user")

    return {"message": "Cooker deleted from user successfully"}
