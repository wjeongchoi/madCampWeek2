from fastapi import Depends, HTTPException, APIRouter
import crud, models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

ingredient = APIRouter()

# ingredient
@ingredient.post("/", response_model=schemas.Ingredient)
def create_ingredient(ingredient: schemas.IngredientCreate, db: Session = Depends(get_db)):
    db_ingredient = crud.ingredient(db, ingredient_name=ingredient.ingredientName)
    if db_ingredient:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.ingredient(db=db, ingredient=ingredient)


@ingredient.get("/", response_model=List[schemas.Ingredient])
def get_ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = crud.ingredients(db, skip=skip, limit=limit)
    return ingredients

@ingredient.get("/{ingredient_name}", response_model=schemas.Ingredient)
def get_ingradinat(ingredient_name: int, db: Session = Depends(get_db)):
    db_ingredient = crud.ingredient(db, ingredient_name=ingredient_name)
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingredient
