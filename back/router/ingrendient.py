from fastapi import Depends, HTTPException, APIRouter
import  models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

ingredient = APIRouter()

# ingredient - 테스트 통과
@ingredient.post("/", response_model=schemas.Ingredient)
def create_ingredient(ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient.ingredientName).first()
    if db_ingredient:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_ingredient = models.Ingredient(ingredientID=ingredient.ingredientID,
                                      ingredientName=ingredient.ingredientName)
    db.add(db_ingredient) 
    db.commit() 
    db.refresh(db_ingredient) 
    return db_ingredient


@ingredient.get("/", response_model=List[schemas.Ingredient])
def get_ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.Ingredient).offset(skip).limit(limit).all()
    return ingredients

@ingredient.get("/{ingredient_name}", response_model=schemas.Ingredient)
def get_ingradinat(ingredient_name: int, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingredient
