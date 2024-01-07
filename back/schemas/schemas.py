from pydantic import UUID4, BaseModel # 객체 타입설정
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

class UserUpdate(UserBase):
    password: str
    
class User(UserBase):
    class Config:
        from_attributes = True
        

# ingredient
class IngredientBase(BaseModel):
    ingredientID: Optional[str] = uuid.uuid4()
    ingredientName: str
    
class IngredientCreate(IngredientBase):
    pass

class IngredientUpdate(IngredientBase):
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

class CookerUpdate(CookerBase):
    pass
   
class Cooker(CookerBase):
    class Config:
        from_attributes = True  
        
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

class RecipeCreate(RecipeBase):
    ingredients: Optional[List[IngredientCreate]] = []
    cookers: Optional[List[CookerCreate]] = []
    

class RecipeUpdate(RecipeBase):
    isModify: bool
    
   
class Recipe(RecipeBase):
    class Config:
        from_attributes = True

        

# Recipe detail
class DetailRecipeBase(BaseModel):
    detailRecipeID: Optional[str] = uuid.uuid4()
    description: Optional[str] = ""
    order: Optional[int] = 1
    imgSrc: Optional[str] = None
    recipeID: Optional[str] = None

class DetailRecipeCreate(DetailRecipeBase):
    pass

class DetailRecipeUpdate(DetailRecipeBase):
    pass
   
class DetailRecipe(DetailRecipeBase):
    class Config:
        from_attributes = True

class UserIngredientResponse(BaseModel):
    message: str

class RecipeLike(BaseModel):
    recipeID: UUID4  # or another type, depending on your ID structure

class LikeRecipeResponse(BaseModel):
    message: str