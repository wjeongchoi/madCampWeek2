# coding: utf-8
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, SmallInteger, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata


class Cooker(Base):
    __tablename__ = 'cookers'

    cookerID = Column(String(36), primary_key=True)
    cookerName = Column(String(100), nullable=False, unique=True)

    users = relationship('User', secondary='myCookers')
    recipes = relationship('Recipe', secondary='recipeWithCooker')


class Ingredient(Base):
    __tablename__ = 'ingredients'

    ingredientID = Column(String(36), primary_key=True)
    ingredientName = Column(String(100), nullable=False, unique=True)

    users = relationship('User', secondary='myIngredients')
    recipes = relationship('Recipe', secondary='recipeWithIngredient')


class Recipe(Base):
    __tablename__ = 'recipes'

    recipeID = Column(String(36), primary_key=True)
    title = Column(String(100))
    subTitle = Column(String(300))
    manId = Column(Integer)
    cookTime = Column(SmallInteger)
    like = Column(SmallInteger, server_default=text("'0'"))
    writedTime = Column(Date)
    modifiedTime = Column(Date)
    level = Column(SmallInteger)

    users = relationship('User', secondary='likeRecipes')
    users1 = relationship('User', secondary='myRecipes')


class User(Base):
    __tablename__ = 'users'

    userID = Column(String(36), primary_key=True)
    email = Column(String(50))
    password = Column(String(100))
    name = Column(String(50), nullable=False)
    imgSrc = Column(String(100))
    createdTime = Column(DateTime, nullable=False)


class DetailRecipe(Base):
    __tablename__ = 'detailRecipes'

    detailRecipeID = Column(String(36), primary_key=True)
    description = Column(String(300))
    order = Column(Integer)
    imgSrc = Column(String(100))
    recipeID = Column(ForeignKey('recipes.recipeID'), index=True)

    recipe = relationship('Recipe')


t_likeRecipes = Table(
    'likeRecipes', metadata,
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False),
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True)
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


t_myRecipes = Table(
    'myRecipes', metadata,
    Column('userID', ForeignKey('users.userID'), primary_key=True, nullable=False),
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True)
)


t_recipeWithCooker = Table(
    'recipeWithCooker', metadata,
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False),
    Column('cookerID', ForeignKey('cookers.cookerID'), primary_key=True, nullable=False, index=True)
)


t_recipeWithIngredient = Table(
    'recipeWithIngredient', metadata,
    Column('recipeID', ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True),
    Column('ingredientID', ForeignKey('ingredients.ingredientID'), primary_key=True, nullable=False, index=True)
)