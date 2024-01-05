from typing import List
from starlette.config import Config
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

import crud, models.models as models, schemas.schemas as schemas
from database import SessionLocal, engine

# 데이터베이스 테이블 생성하기
models.Base.metadata.create_all(bind=engine)
app = FastAPI()

config = Config(".env")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# User
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.user(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.get("/users/", response_model=List[schemas.User])
def users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


# recipe
@app.post("/recipes/", response_model=schemas.Recipe)
def create_recipe(recipe: schemas.RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = crud.recipe(db, recipe_id=recipe.recipeId)
    if db_recipe:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_recipe(db=db, recipe=recipe)


@app.get("/recipes/", response_model=List[schemas.Recipe])
def recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = crud.recipes(db, skip=skip, limit=limit)
    return recipes

@app.get("/recipes/{recipe_id}", response_model=schemas.Recipe)
def recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = crud.recipe(db, recipe_id=recipe_id)
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_recipe


# ingradiant
@app.post("/ingradiants/", response_model=schemas.Ingradiant)
def create_ingradiant(ingradiant: schemas.IngradiantCreate, db: Session = Depends(get_db)):
    db_ingradiant = crud.ingradiant(db, ingradiant_name=ingradiant.ingradiantName)
    if db_ingradiant:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.ingradiant(db=db, ingradiant=ingradiant)


@app.get("/ingradiants/", response_model=List[schemas.Ingradiant])
def ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingradiants = crud.ingradiants(db, skip=skip, limit=limit)
    return ingradiants

@app.get("/ingradiants/{ingradiant_name}", response_model=schemas.Ingradiant)
def ingradinat(ingradiant_name: int, db: Session = Depends(get_db)):
    db_ingradiant = crud.ingradiant(db, ingradiant_name=ingradiant_name)
    if db_ingradiant is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingradiant



# cooker
@app.post("/cookers/", response_model=schemas.Cooker)
def create_cooker(cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_ingradiant = crud.cooker(db, ingradiant_name=cooker.cookerName)
    if db_ingradiant:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.cooker(db=db, cooker=cooker)


@app.get("/cookers/", response_model=List[schemas.Cooker])
def cookers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = crud.cookers(db, skip=skip, limit=limit)
    return cookers

@app.get("/cookers/{cooker_name}", response_model=schemas.Cooker)
def cooker(cooker_name: int, db: Session = Depends(get_db)):
    db_cooker = crud.cooker(db, cooker_name=cooker_name)
    if db_cooker is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_cooker

#