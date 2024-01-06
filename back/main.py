from typing import List
from starlette.config import Config
from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy.orm import Session

import crud, models.models as models, schemas.schemas as schemas
from database import SessionLocal, engine


from router.oauth import oauth
from router.users import user
from router.recipes import recipe
from router.ingrendient import ingredient
from router.cooker import cooker



# 데이터베이스 테이블 생성하기
models.Base.metadata.create_all(bind=engine)

app = FastAPI()
config = Config(".env")


        
app.include_router(oauth, prefix="/oauth",tags=["auth"])
app.include_router(user, prefix="/users",tags=["user"])
app.include_router(recipe, prefix="/recipes",tags=["recipe"])
app.include_router(ingredient, prefix="/ingredients",tags=["ingredient"])
app.include_router(cooker, prefix="/cookers",tags=["cooker"])



