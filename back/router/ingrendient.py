from fastapi import Depends, HTTPException, APIRouter
import  models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List


ingredient = APIRouter()

### CREATE ###
# ingredient - 테스트 통과
@ingredient.post("/", response_model=schemas.Ingredient)
@ingredient.post("/", response_model=schemas.Ingredient)
def create_ingredient(ingredient_data: schemas.IngredientCreate, db: Session = Depends(get_db)):
    # Check if the ingredient already exists
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_data.ingredientName).first()
    if db_ingredient:
        # If ingredient exists, raise an HTTPException
        raise HTTPException(status_code=400, detail="Ingredient already exists")

    # Create a new ingredient if not exist
    new_ingredient = models.Ingredient(
        ingredientID=ingredient_data.ingredientID,
        ingredientName=ingredient_data.ingredientName
    )

    db.add(new_ingredient)
    db.commit()
    db.refresh(new_ingredient)

    return new_ingredient

# get all ingredients
@ingredient.get("/", response_model=List[schemas.Ingredient])
def get_ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.Ingredient).offset(skip).limit(limit).all()
    return ingredients

# get ingredient
@ingredient.get("/{ingredient_name}", response_model=schemas.Ingredient)
def get_ingradinat(ingredient_name: str, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingredient


### DELETE ### 
# delete ingredient
@ingredient.delete("/{ingredient_name}")
def delete_ingredient(ingredient_name: str, db: Session = Depends(get_db)):
    db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()
    if db_ingredient is None:
        raise HTTPException(status_code=400, detail="Ingredient not found")

    # Delete associations in t_myIngredients
    db.execute(models.t_myIngredients.delete().where(models.t_myIngredients.c.ingredientID == db_ingredient.ingredientID))

    # Delete the ingredient
    db.delete(db_ingredient)
    db.commit()

    return {"message": "Ingredient deleted successfully"}

