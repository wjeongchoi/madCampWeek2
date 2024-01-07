from fastapi import Depends, HTTPException, APIRouter
import models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List


user = APIRouter()

### CREATE ### 
# create user
@user.post("/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = user.password
    # TO DO: hash password
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





# add ingredient in my refrigerator
@user.post("/{user_id}/ingredients", response_model=schemas.Ingredient)
def create_my_ingredient(user_id: str, ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="user not registered")
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient.ingredientName).first()
    if not db_ingredient:
        new_ingredient = models.Ingredient(
            ingredientID=ingredient.ingredientID,
            ingredientName=ingredient.ingredientName)
        db.add(new_ingredient) 
        db.commit()   
        db.refresh(new_ingredient) 

        db_ingredient=new_ingredient
        
    new_my_ingredient = models.MyIngredients(userID=db_user.userID, ingredientID=db_ingredient.ingredientID)
    db.add(new_my_ingredient)
    db.commit()
    db.refresh(new_my_ingredient)
    return db_ingredient

# add cooker in my refrigerator
@user.post("/{user_id}/cooker", response_model=schemas.Cooker)
def create_my_cooker(user_id: str, cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
        raise HTTPException(status_code=400, detail="user not registered")
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
    if not db_cooker:
        new_cooker = models.Cooker(
            cookerID=cooker.cookerID,
            cookerName=cooker.cookerName)
        db.add(new_cooker) 
        db.commit()   
        db.refresh(new_cooker) 

        db_cooker=new_cooker
        
    new_my_cooker = models.MyCookers(userID=db_user.userID, cookerID=db_cooker.cookerID)
    db.add(new_my_cooker)
    db.commit()
    db.refresh(new_my_cooker)
    return db_cooker

# 레시피 식별을 id로 할지 title로 할지 고민중
# add my like recipe
@user.post("/{user_id}/like/recipe", response_model=schemas.Recipe)
def create_my_like_recipe(user_id: str, recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
            raise HTTPException(status_code=400, detail="user not registered")
    db_recipe = db.query(models.Recipe).filter(models.Recipe.title == recipe.title).first()
    if not db_recipe:
        new_recipe = models.Recipe(
            recipeID=recipe.recipeID,
            title=recipe.title,
            subTitle = recipe.subTitle,
            manId = recipe.manId,
            cookTime = recipe.cookTime,
            like = recipe.like,
            writedTime = recipe.writedTime,
            modifiedTime = recipe.modifiedTime,
            level = recipe.level)
        db.add(new_recipe) 
        db.commit()   
        db.refresh(new_recipe) 

        db_recipe=new_recipe
        
    new_my_recipe = models.MyRecipes(userID=db_user.userID, recipeID=db_recipe.recipeID)
    db.add(new_my_recipe)
    db.commit()
    db.refresh(new_my_recipe)
    return db_recipe



# add my recipe
@user.post("/{user_id}/recipe", response_model=schemas.Recipe)
def create_my_like_recipe(user_id: str, recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if not db_user:
            raise HTTPException(status_code=400, detail="user not registered")
    db_recipe = db.query(models.Recipe).filter(models.Recipe.title == recipe.title).first()
    if not db_recipe:
        new_recipe = models.Recipe(
            recipeID=recipe.recipeID,
            title=recipe.title,
            subTitle = recipe.subTitle,
            manId = recipe.manId,
            cookTime = recipe.cookTime,
            like = recipe.like,
            writedTime = recipe.writedTime,
            modifiedTime = recipe.modifiedTime,
            level = recipe.level)
        db.add(new_recipe) 
        db.commit()   
        db.refresh(new_recipe) 

        db_recipe=new_recipe
        
    new_my_recipe = models.LikeRecipes(userID=db_user.userID, recipeID=db_recipe.recipeID)
    db.add(new_my_recipe)
    db.commit()
    db.refresh(new_my_recipe)
    return db_recipe


### READ ### 
# get add users
@user.get("/", response_model=List[schemas.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users



# get user
@user.get("/{user_id}", response_model=schemas.User)
def get_user(user_id: str, recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user
    
# get my cookers - 통과
@user.get("/{user_id}/cookers", response_model=List[schemas.Cooker])
def get_my_cookers(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.MyCookers).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for cooker in cookers:
        c = db.query(models.Cooker).filter(models.Cooker.cookerID == cooker.cookerID).first()
        response_data.append(c)
    return response_data

# get my ingredients - 테스트 필요
@user.get("/{user_id}/ingredients", response_model=List[schemas.Ingredient])
def get_my_ingredients(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.MyIngredients).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for ingredient in ingredients:
        i = db.query(models.Ingredient).filter(models.Ingredient.ingredientID == ingredient.cookerID).first()
        response_data.append(i)
    return response_data

# get my like recipes - 테스트 필요
@user.get("/{user_id}/like/recipes", response_model=List[schemas.Recipe])
def get_my_like_recipes(user_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    likeRecipes = db.query(models.LikeRecipes).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
    response_data = []
    for likeRecipe in likeRecipes:
        l = db.query(models.Recipe).filter(models.Recipe.recipeID == likeRecipe.recipeID).first()
        response_data.append(l)
    return response_data

# get my recipes
@user.get("/{user_id}/recipes", response_model=List[schemas.Recipe])
def get_my_recipes(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    myRecipes = db.query(models.MyCookers).filter(models.User.userID == user_id).offset(skip).limit(limit).all()
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
# delete user - cascade설정하기
@user.delete("/{user_id}")
def delete_ingredient(user_id: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.userID == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=400, detail="user not found")
    db_my_ingredients = db.query(models.MyIngredients).filter(models.MyIngredients.userID == db_user.userID).all()
    db_my_cookers = db.query(models.MyCookers).filter(models.MyCookers.userID == db_user.userID).all()
    db_my_recipes = db.query(models.MyRecipes).filter(models.MyRecipes.userID == db_user.userID).all()
    db_like_recipes = db.query(models.LikeRecipes).filter(models.LikeRecipes.userID == db_user.userID).all()
    for db_my_ingredient in db_my_ingredients:
        db.delete(db_my_ingredient)
    for db_my_cooker in db_my_cookers:
        db.delete(db_my_cooker)
    for db_my_recipe in db_my_recipes:
        db.delete(db_my_recipe)
    for db_like_recipe in db_like_recipes:
        db.delete(db_like_recipe)   
    db.delete(db_user)
    db.commit()
    return {"message": "user deleted successfully"}