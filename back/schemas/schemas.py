from pydantic import BaseModel # 객체 타입설정
from datetime import datetime

# User
class UserBase(BaseModel):
    email: str
    name: str
    imageSrc: str
    # userType:
    createdTime: datetime
    deletedTime: datetime

class UserCreate(UserBase):
    password: str
   

class User(UserBase):
    class Config:
        orm_mode = True