from fastapi import Depends, HTTPException, APIRouter
import  models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List
from .ingrendient import create_ingredient
from .cooker import create_cooker

recipe = APIRouter()


### CRETAE ### 
# create recipe
@recipe.post("/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate,
                  db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe.recipeID).first()
    if db_recipe:
        raise HTTPException(status_code=400, detail="recipe already existed")
    db_recipe = models.Recipe(
                          recipeID=recipe.recipeID,
                          title=recipe.title, 
                          subTitle=recipe.subTitle, 
                          manId=recipe.manId, 
                          cookTime=recipe.cookTime, 
                          like=recipe.like, 
                          writedTime=recipe.writedTime,
                          modifiedTime=recipe.modifiedTime,
                          level=recipe.level)
    for ingredient in recipe.ingredients:
        db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient.ingredientName).first()
        if db_ingredient is None:
            db_ingredient = models.Ingredient(ingredientID=ingredient.ingredientID,
                                      ingredientName=ingredient.ingredientName)
            db.add(db_ingredient) 
        db_recipe_with_ingredient = models.RecipeWithIngredient(recipeID=db_recipe.recipeID,
                                                                ingredientID=db_ingredient.ingredientID)
        db.add(db_recipe_with_ingredient) 
    for cooker in recipe.cookers:
        db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
        if db_cooker is None:
            db_cooker = models.Cooker(cookerID=cooker.cookerID,
                                    cookerName=cooker.cookerName)
            db.add(db_cooker) 
        db_recipe_with_cooker = models.RecipeWithCooker(
                            recipeID=db_recipe.recipeID,
                            cookerID=db_cooker.cookerID)
        db.add(db_recipe_with_cooker) 
    db.add(db_recipe) 
    db.commit() 
    return db_recipe

# create detail recipe
@recipe.post("/{recipe_id}/detail", response_model=schemas.DetailRecipe)
def create_detail_recipe(recipe_id: str, detailRecipe: schemas.DetailRecipeCreate, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=400, detail="recipe not existed")

    db_detail_recipe = models.DetailRecipe(
                        detailRecipeID=detailRecipe.detailRecipeID,
                        description=detailRecipe.description, 
                        order=detailRecipe.order, 
                        imgSrc=detailRecipe.imgSrc, 
                        recipeID=db_recipe.recipeID
                        )
    db.add(db_detail_recipe) 
    db.commit() 
    db.refresh(db_detail_recipe) 
    return db_detail_recipe

### READ ###
# get all recipes
@recipe.get("/", response_model=List[schemas.Recipe])
def get_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = db.query(models.Recipe).offset(skip).limit(limit).all()
    return recipes

# get recipe
@recipe.get("/{recipe_id}", response_model=schemas.Recipe)
def get_recipe(recipe_id: str, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

# get cookers used in recipe
@recipe.get("/{recipe_id}/cookers", response_model=List[schemas.Cooker])
def get_recipe_cookers(recipe_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.RecipeWithCooker).filter(models.Recipe.recipeID == recipe_id).offset(skip).limit(limit).all()
    return cookers

# get ingredients used in recipe
@recipe.get("/{recipe_id}/ingredients", response_model=List[schemas.Ingredient])
def get_recipe_details(recipe_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.RecipeWithIngredient).filter(models.Recipe.recipeID == recipe_id).offset(skip).limit(limit).all()
    return ingredients

# get detail recipes
@recipe.get("/{recipe_id}/details", response_model=List[schemas.DetailRecipe])
def get_recipe_details(recipe_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="recipe not found")
    db_detail_recipes= db.query(models.DetailRecipe).filter(models.DetailRecipe.recipeID == db_recipe.recipeID).offset(skip).limit(limit).all()
    return db_detail_recipes

### UPDATE ### 
# update recipe
@recipe.put("/{recipe_id}", response_model=schemas.Recipe)
def update_recipe(recipe_id: str, recipe: schemas.RecipeUpdate,  db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db_recipe.title = recipe.title
    db_recipe.subTitle = recipe.subTitle
    db_recipe.manId = recipe.manId
    db_recipe.cookTime = recipe.cookTime
    db_recipe.like = recipe.like
    db_recipe.modifiedTime = recipe.modifiedTime if recipe.isModify else None
    db_recipe.level = recipe.level
    db.commit() 
    db.refresh(db_recipe) 
    return db_recipe


### DELETE ### 
# delete recipe
@recipe.delete("/{recipe_id}")
def delete_ingredient(recipe_id: str, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=400, detail="recipe not found")
    db_my_recipes = db.query(models.MyRecipes).filter(models.MyRecipes.recipeID == db_recipe.recipeID).all()
    db_like_recipes = db.query(models.LikeRecipes).filter(models.LikeRecipes.recipeID == db_recipe.recipeID).all()
    db_detail_recipes = db.query(models.DetailRecipe).filter(models.DetailRecipe.recipeID == db_recipe.recipeID).all()
    for dy_my_recipe in db_my_recipes:
        db.delete(dy_my_recipe)
    for db_like_recipe in db_like_recipes:
        db.delete(db_like_recipe)
    for db_detail_recipe in db_detail_recipes:
        db.delete(db_detail_recipe)
    db.delete(db_recipe)
    db.commit()
    return {"message": "recipe deleted successfully"}

# delete detail recipe
@recipe.delete("/{detail_id}/detail")
def delete_ingredient(detail_id: str, db: Session = Depends(get_db)):
    db_detail_recipe = db.query(models.DetailRecipe).filter(models.DetailRecipe.detailRecipeID == detail_id).first()
    if db_detail_recipe is None:
        raise HTTPException(status_code=400, detail="recipe not found")
    db.delete(db_detail_recipe)
    db.commit()
    return {"message": "detail recipe deleted successfully"}



