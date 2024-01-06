# coding: utf-8
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, SmallInteger, String, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Cooker(Base):
    __tablename__ = 'cookers'

    cookerName = Column(String(100), nullable=False)
    cookerID = Column(String(36), primary_key=True)

    users = relationship('User', secondary='myCookers')


class DetailRecipe(Base):
    __tablename__ = 'detailRecipes'

    detailRecipeID = Column(String(36), primary_key=True)
    description = Column(String(300))
    order = Column(Integer)
    ImageSrc = Column(String(100))


class Ingredient(Base):
    __tablename__ = 'ingredients'

    ingredientID = Column(String(36), primary_key=True)
    ingredientName = Column(String(100), nullable=False)

    users = relationship('User', secondary='myIngredients')


class Recipe(Base):
    __tablename__ = 'recipes'

    recipeID = Column(String(36), primary_key=True)
    title = Column(String(100))
    subTitle = Column(String(300))
    manId = Column(Integer)
    cookTime = Column(SmallInteger)
    like = Column(SmallInteger)
    writedTime = Column(Date)
    modifiedTime = Column(Date)
    level = Column(SmallInteger)

    users = relationship('User', secondary='likeRecipe')
    users1 = relationship('User', secondary='myRecipe')


class User(Base):
    __tablename__ = 'users'

    userID = Column(String(36), primary_key=True)
    email = Column(String(50))
    password = Column(String(100))
    name = Column(String(50), nullable=False)
    imgSrc = Column(String(100))
    create_time = Column(DateTime, nullable=False)


class CompleteRecipe(Base):
    __tablename__ = 'completeRecipe'

    recipeID = Column(ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True)
    ingredientID = Column(ForeignKey('ingredients.ingredientID'), primary_key=True, nullable=False)
    cookerID = Column(ForeignKey('cookers.cookerID'), primary_key=True, nullable=False, index=True)

    cooker = relationship('Cooker')
    ingredient = relationship('Ingredient')
    recipe = relationship('Recipe')


t_likeRecipe = Table(
    'likeRecipe', metadata,
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True),
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False)
)


t_myCookers = Table(
    'myCookers', metadata,
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False),
    Column('cookerID', ForeignKey('cookers.cookerID'), primary_key=True, nullable=False, index=True)
)


t_myIngredients = Table(
    'myIngredients', metadata,
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False),
    Column('ingredientID', ForeignKey('ingredients.ingredientID'), primary_key=True, nullable=False, index=True)
)


t_myRecipe = Table(
    'myRecipe', metadata,
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True),
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False)
)
