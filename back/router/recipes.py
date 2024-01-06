from fastapi import Depends, HTTPException, APIRouter
import  models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

recipe = APIRouter()


# 레시피 작성
@recipe.post("/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe.recipeID).first()
    if db_recipe:
        raise HTTPException(status_code=400, detail="recipe already existed")
    db_recipe = models.Recipe(title=recipe.title, 
                          subTitle=recipe.subTitle, 
                          manId=recipe.manId, 
                          cookTime=recipe.cookTime, 
                          like=recipe.like, 
                          writedTime=recipe.writedTime,
                          modifiedTime=recipe.modifiedTime,
                          level=recipe.level)
    db.add(db_recipe) 
    db.commit() 
    db.refresh(db_recipe) 
    return db_recipe

# # 레시피 디테일 작성 - 나중에
# @recipe.post("/{recipe_id}/detail", response_model=schemas.RecipeDetail)
# def create_detail_recipe(recipe_id: str, recipeDetail: schemas.RecipeDetailCreate, db: Session = Depends(get_db)):
#     db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeId == recipe_id).first()
#     if db_recipe:
#         raise HTTPException(status_code=400, detail="recipe already existed")
#     return crud.create_detail_recipe(db=db, recipeDetail=recipeDetail, recipe=db_recipe)

# 레시피들
@recipe.get("/", response_model=List[schemas.Recipe])
def get_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = db.query(models.Recipe).offset(skip).limit(limit).all()
    return recipes

# 레시피
@recipe.get("/{recipe_id}", response_model=schemas.Recipe)
def get_recipe(recipe_id: str, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeId == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe



# 레시피 디테일 - 나중에
# @recipe.get("/{recipe_id}/details", response_model=schemas.Recipe)
# def get_recipe_details(recipe_id: str, db: Session = Depends(get_db)):
#     db_recipe = crud.recipe(db, recipe_id=recipe_id)
#     if db_recipe is None:
#         raise HTTPException(status_code=404, detail="User not found")
    
#     # db.add(new_recipe)
#     # db.commit()
#     # db.refresh(new_recipe)
#     # return db_recipe.

# 레시피 도구 - 테스트 
@recipe.get("/{recipe_id}/cookers", response_model=List[schemas.Cooker])
def get_recipe_cookers(recipe_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.CompleteRecipe).filter(models.Recipe.recipeID == recipe_id).offset(skip).limit(limit).all()
    response_data = []
    for cooker in cookers:
        c = db.query(models.Recipe).filter(models.Cooker.cookerID == cooker.cookerID).first()
        response_data.append(c)
    return response_data



# 레시피 재료
@recipe.get("/{recipe_id}/ingredients", response_model=List[schemas.Ingredient])
def get_recipe_details(recipe_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.CompleteRecipe).filter(models.Recipe.recipeID == recipe_id).offset(skip).limit(limit).all()
    response_data = []
    for ingredient in ingredients:
        i = db.query(models.Ingredient).filter(models.Ingredient.ingredientID == ingredient.ingredientID).first()
        response_data.append(i)
    return response_data
