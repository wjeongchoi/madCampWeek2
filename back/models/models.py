# coding: utf-8
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, SmallInteger, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Cooker(Base):
    __tablename__ = 'cookers'

    cookerName = Column(String(100), nullable=False, unique=True)
    cookerID = Column(Integer, primary_key=True)


class DetailRecipe(Base):
    __tablename__ = 'detailRecipes'

    detailRecipeID = Column(String(36), primary_key=True)
    description = Column(String(300))
    order = Column(Integer)
    ImageSrc = Column(String(100))


class Ingredient(Base):
    __tablename__ = 'ingredient'

    ingredientID = Column(Integer, primary_key=True)
    ingredientName = Column(String(100), nullable=False)


class Recipe(Base):
    __tablename__ = 'recipes'

    recipeID = Column(String(36), primary_key=True, unique=True)
    title = Column(String(100))
    subTitle = Column(String(300))
    manId = Column(Integer)
    cookTime = Column(SmallInteger)
    like = Column(SmallInteger)
    writedTime = Column(Date)
    modifiedTime = Column(Date)
    level = Column(SmallInteger)


class User(Base):
    __tablename__ = 'users'

    userID = Column(Integer, primary_key=True)
    email = Column(String(50))
    password = Column(String(100))
    name = Column(String(50), nullable=False)
    imgSrc = Column(String(100))
    create_time = Column(DateTime, nullable=False)


class IngredientCookerRecipe(Base):
    __tablename__ = 'IngredientCookerRecipe'

    recipeID = Column(String(36), primary_key=True, nullable=False)
    ingredientID = Column(ForeignKey('ingredient.ingredientID'), primary_key=True, nullable=False, index=True)
    cookerID = Column(ForeignKey('cookers.cookerID'), primary_key=True, nullable=False, index=True)

    cooker = relationship('Cooker')
    ingredient = relationship('Ingredient')
