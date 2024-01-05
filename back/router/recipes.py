from fastapi import Depends, HTTPException, APIRouter
import crud, models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

recipe = APIRouter()


# recipe
@recipe.post("/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = crud.recipe(db, recipe_id=recipe.recipeId)
    if db_recipe:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_recipe(db=db, recipe=recipe)


@recipe.get("/", response_model=List[schemas.Recipe])
def get_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = crud.recipes(db, skip=skip, limit=limit)
    return recipes

@recipe.get("/{recipe_id}", response_model=schemas.Recipe)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud.recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_recipe