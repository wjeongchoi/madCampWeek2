# coding: utf-8
from sqlalchemy import Column, Date, DateTime, ForeignKey, Integer, SmallInteger, String, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
metadata = Base.metadata

class Cooker(Base):
    __tablename__ = 'cookers'

    cookerID = Column(String(36), primary_key=True, nullable=False)
    cookerName = Column(String(100), nullable=False, unique=True)
    
    users = relationship('User', secondary='myCookers')
    recipe = relationship('Recipe', secondary='recipeWithCooker')

class DetailRecipe(Base):
    __tablename__ = 'detailRecipes'
    detailRecipeID = Column(String(36), primary_key=True)
    description = Column(String(300))
    order = Column(Integer)
    imgSrc = Column(String(100))
    recipeID = Column(String(36), ForeignKey("recipes.recipeID"))
    recipe_detail = relationship('Recipe', back_populates="recipe")


class Ingredient(Base):
    __tablename__ = 'ingredients'

    ingredientID = Column(String(36), primary_key=True, nullable=False)
    ingredientName = Column(String(100), nullable=False, unique=True)

    recipe = relationship('Recipe', secondary='recipeWithIngredient')
    users = relationship('User', secondary='myIngredients')


class Recipe(Base):
    __tablename__ = 'recipes'

    recipeID = Column(String(36), primary_key=True, nullable=False)
    title = Column(String(100))
    subTitle = Column(String(300))
    manId = Column(Integer)
    cookTime = Column(SmallInteger)
    like = Column(SmallInteger)
    writedTime = Column(Date)
    modifiedTime = Column(Date)
    level = Column(SmallInteger)
    
    # relation
    users = relationship('User', secondary='likeRecipes')
    users1 = relationship('User', secondary='myRecipes')
    cooker = relationship('Cooker', secondary='recipeWithCooker')
    ingredient = relationship('Ingredient', secondary='recipeWithIngredient')
    recipe = relationship('DetailRecipe', back_populates="recipe_detail")

class User(Base):
    __tablename__ = 'users'

    userID = Column(String(36), primary_key=True, nullable=False)
    email = Column(String(50))
    password = Column(String(100))
    name = Column(String(50), nullable=False)
    imgSrc = Column(String(100))
    createdTime = Column(DateTime, nullable=False)

    like_recipes = relationship('Recipe', secondary='likeRecipes')
    my_recipes = relationship('Recipe', secondary='myRecipes')
    my_cookers = relationship('Cooker', secondary='myCookers')
    my_ingredients = relationship('Ingredient', secondary='myIngredients')
    
    
class RecipeWithCooker(Base):
    __tablename__ = 'recipeWithCooker'

    recipeID = Column(String(36), ForeignKey('recipes.recipeID'), primary_key=True, nullable=False)
    cookerID = Column(String(36), ForeignKey('cookers.cookerID'), primary_key=True, nullable=False)
    cooker = relationship('Cooker')
    recipe = relationship('Recipe')
    
class RecipeWithIngredient(Base):
    __tablename__ = 'recipeWithIngredient'

    recipeID = Column(String(36), ForeignKey('recipes.recipeID'), primary_key=True, nullable=False, index=True)
    ingredientID = Column(String(36), ForeignKey('ingredients.ingredientID'), primary_key=True, nullable=False)
    ingredient = relationship('Ingredient')
    recipe = relationship('Recipe')

class LikeRecipes(Base):
    __tablename__ = "likeRecipes"

    userID = Column(String(36), ForeignKey("users.userID"), primary_key=True)
    recipeID = Column(String(36), ForeignKey('recipes.recipeID'), primary_key=True)
    user = relationship("User")
    recipe = relationship("Recipe")
    
class MyCookers(Base):
    __tablename__ = "myCookers"

    userID = Column(String(36), ForeignKey("users.userID"), primary_key=True)
    cookerID = Column(String(36), ForeignKey("cookers.cookerID"), primary_key=True)
    user = relationship("User")
    cooker = relationship("Cooker")
    

class MyIngredients(Base):
    __tablename__ = "myIngredients"

    userID = Column(String(36), ForeignKey("users.userID"), primary_key=True)
    ingredientID = Column(String(36), ForeignKey("ingredients.ingredientID"), primary_key=True)
    user = relationship("User")
    ingredient = relationship("Ingredient")



class MyRecipes(Base):
    __tablename__ = "myRecipes"

    userID = Column(String(36), ForeignKey("users.userID"), primary_key=True)
    recipeID = Column(String(36), ForeignKey("recipes.recipeID"), primary_key=True)
    user = relationship("User")
    recipe = relationship("Recipe")
