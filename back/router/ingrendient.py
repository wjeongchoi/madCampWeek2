from fastapi import Depends, HTTPException, APIRouter
import  models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

ingredient = APIRouter()

### CREATE ###
# ingredient - 테스트 통과
@ingredient.post("/", response_model=schemas.Ingredient)
def create_ingredient(ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient.ingredientName).first()
    if db_ingredient is None:
        return db_ingredient
    db_ingredient = models.Ingredient(ingredientID=ingredient.ingredientID,
                                      ingredientName=ingredient.ingredientName)
    db.add(db_ingredient) 
    db.commit() 
    db.refresh(db_ingredient) 
    return db_ingredient

# get all ingredients
@ingredient.get("/", response_model=List[schemas.Ingredient])
def get_ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.Ingredient).offset(skip).limit(limit).all()
    return ingredients

# get ingredient
@ingredient.get("/{ingredient_name}", response_model=schemas.Ingredient)
def get_ingradinat(ingredient_name: int, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingredient

### UPDATE ###
# update ingredient
@ingredient.put("/{ingredient_name}", response_model=schemas.Cooker)
def update_ingredient(ingredient_name: str, ingredient: schemas.IngredientUpdate, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="ingredient not found")
    db_ingredient.ingredientName = ingredient.ingredientName
    db.commit() 
    db.refresh(db_ingredient) 
    return db_ingredient


### DELETE ### 
# delete ingredient
@ingredient.delete("/{ingredient_name}")
def delete_ingredient(ingredient_name: str, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=400, detail="ingredient not found")
    db_my_ingedients = db.query(models.MyIngredients).filter(models.MyIngredients.ingredientID == db_ingredient.ingredientID).all()
    for db_my_ingedient in db_my_ingedients:
        db.delete(db_my_ingedient)
    db.delete(db_ingredient)
    db.commit()
    return {"message": "ingredient deleted successfully"}
