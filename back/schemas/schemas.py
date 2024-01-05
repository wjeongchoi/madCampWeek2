from pydantic import BaseModel # 객체 타입설정
from datetime import date
from typing import Optional
from datetime import date
import uuid

# User
class UserBase(BaseModel):
    imageSrc: Optional[str] = None
    createdTime: Optional[date] = date.today()
    deletedTime: Optional[date] = None

class UserCreate(UserBase):
    email: str
    password: str
    name: str
   
class User(UserBase):
    class Config:
        from_attributes = True
        
class UserUpdate(UserBase):
    password: str
    name: str
        
        
# Recipe
class RecipeBase(BaseModel):
    recipeId: Optional[str] = uuid.uuid4()
    title: str
    subTitle: str
    manId: Optional[str] = None
    cookTime: Optional[int] = None
    like: Optional[int] = 0
    level: Optional[int] = 0
    writedTime: Optional[date] = date.today()
    modifiedTime: Optional[date] = date.today()

class RecipeCreate(RecipeBase):
    pass
   
class Recipe(RecipeBase):
    class Config:
        from_attributes = True
        
        
# Ingradiant
class IngradiantBase(BaseModel):
    ingradiantName: str

class IngradiantCreate(IngradiantBase):
    pass
   
class Ingradiant(IngradiantBase):
    class Config:
        from_attributes = True
        
# Cooker
class CookerBase(BaseModel):
    cookerName: str

class CookerCreate(CookerBase):
    pass
   
class Cooker(CookerBase):
    class Config:
        from_attributes = True
        



# Recipe detail
class RecipeDetailBase(BaseModel):
    description: Optional[str] = ""
    order: Optional[int] = 1
    imageSrc: Optional[str] = None

class RecipeDetailCreate(RecipeDetailBase):
    pass
   
class RecipeDetail(RecipeDetailBase):
    class Config:
        from_attributes = True