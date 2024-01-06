from pydantic import BaseModel # 객체 타입설정
from datetime import date
from typing import Optional, List
import uuid


# User
class UserBase(BaseModel):
    userID: Optional[str] = uuid.uuid4()
    imgSrc: Optional[str] = None
    createdTime: Optional[date] = date.today()
    email: str
    name: str
    
class UserCreate(UserBase):
    password: str

   
class User(UserBase):
    class Config:
        from_attributes = True
        
class UserUpdate(UserBase):
    password: str
    name: str
        
        
# Recipe
class RecipeBase(BaseModel):
    recipeID: Optional[str] = uuid.uuid4()
    title: str
    subTitle: str
    manId: Optional[int] = None
    cookTime: Optional[int] = None
    like: Optional[int] = 0
    writedTime: Optional[date] = date.today()
    modifiedTime: Optional[date] = date.today()
    level: Optional[int] = 0
    
    # users_like: Optional[List[str]] = []
    # users_my: Optional[List[str]] = []

class RecipeCreate(RecipeBase):
    pass
   
class Recipe(RecipeBase):
    class Config:
        from_attributes = True
        
        
# ingredient
class IngredientBase(BaseModel):
    ingredientID: Optional[str] = uuid.uuid4()
    ingredientName: str
    
    

class IngredientCreate(IngredientBase):
    pass
   
class Ingredient(IngredientBase):
    class Config:
        from_attributes = True
        
# Cooker
class CookerBase(BaseModel):
    cookerID: Optional[str] = uuid.uuid4()
    cookerName: str
    

class CookerCreate(CookerBase):
    pass
   
class Cooker(CookerBase):
    class Config:
        from_attributes = True
        

# Recipe detail
class DetailRecipeBase(BaseModel):
    detailRecipeID: Optional[str] = uuid.uuid4()
    description: Optional[str] = ""
    order: Optional[int] = 1
    imageSrc: Optional[str] = None
    recipeID: Optional[str] = None

class DetailRecipeCreate(DetailRecipeBase):
    pass
   
class DetailRecipe(DetailRecipeBase):
    class Config:
        from_attributes = True