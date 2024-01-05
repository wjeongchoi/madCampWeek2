from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum, Date, UUID, SmallInteger
from database import Base

class User(Base):
    __tablename__ = "users"
    email = Column(String(50), primary_key=True, unique=True, index=True)
    password = Column(String(100), nullable=True)
    name = Column(String(50))
    imageSrc =  Column(String(20), nullable=True)
    # userType =  Column(Enum)
    createdTime =  Column(Date, nullable=True)
    deletedTime =  Column(Date, nullable=True)
    
    
class Recipe(Base):
    __tablename__ = "recipes"
    recipeId = Column(UUID(as_uuid=True), primary_key=True, unique=True, index=True)
    title = Column(String(100))
    subTitle = Column(String(300), nullable=True)
    manId =  Column(Integer, nullable=True)
    cookTime =  Column(SmallInteger)
    like =  Column(SmallInteger)
    # userType =  Column(Enum)
    writedTime =  Column(Date)
    modifiedTime =  Column(Date)
    level = Column(SmallInteger)
    
    
class Ingradiant(Base):
    __tablename__ = "ingradiant"
    ingradiantName = Column(String(100), primary_key=True, unique=True)
    
    
class Cooker(Base):
    __tablename__ = "cookers"
    cookerName = Column(String(100), primary_key=True, unique=True)
    
    
class DetailRecipe(Base):
    __tablename__ = "detailRecipes"
    detailRecipeId =  Column(String(36), primary_key=True)
    description = Column(String(300))
    order = Column(Integer, autoincrement=True)
    ImageSrc = Column(String(100), nullable=True)