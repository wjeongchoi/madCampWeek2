from sqlalchemy.orm import Session
from datetime import date

# 기존에 생성한 모델과 스키마 불러오기
import models.models as models, schemas.schemas as schemas


# User
def user(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# def user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = user.password
    db_user = models.User(email=user.email, 
                          password=hashed_password, 
                          name=user.name, 
                          createdTime=user.createdTime, 
                          imageSrc=user.imageSrc, 
                          deletedTime=user.deletedTime)
    db.add(db_user) 
    db.commit()    
    db.refresh(db_user) 
    return db_user

# Recipe
def recipe(db: Session, recipe_id: str):
    return db.query(models.Recipe).filter(models.Recipe.recipeId == recipe_id).first()


def recipes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Recipe).offset(skip).limit(limit).all()

def create_recipe(db: Session, recipe: schemas.RecipeCreate):

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


# Ingredient
def ingredient(db: Session, ingredient_name: str):
    return db.query(models.Ingredient).filter(models.Ingredient.ingredientName == ingredient_name).first()


def ingredients(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ingredient).offset(skip).limit(limit).all()

def create_ingredient(db: Session, ingredient: schemas.IngredientCreate):
    db_ingredient = models.Ingredient(ingredient=ingredient.ingredientName)
    db.add(db_ingredient) 
    db.commit() 
    db.refresh(db_ingredient) 
    return db_ingredient


# Cooker
def cooker(db: Session, cooker_name: str):
    return db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_name).first()


def cookers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Cooker).offset(skip).limit(limit).all()

def create_cooker(db: Session, cooker: schemas.CookerCreate):
    db_cooker = models.Ingredient(cooker=cooker.cookerName)
    db.add(db_cooker) 
    db.commit() 
    db.refresh(db_cooker) 
    return db_cooker


