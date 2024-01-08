from fastapi import Depends, HTTPException, APIRouter, requests, status
import models.models as models, schemas.schemas as schemas
from starlette.config import Config
from sqlalchemy.orm import Session
from database import get_db
import aiohttp
import json
import bcrypt
import uuid
from datetime import date
from jose import JWTError, jwt
from logging import error


auth = APIRouter()
config = Config(".env")
    
JWT_SECRET_KEY = config("JWT_SECRET_KEY")
KAKAO_REDIRECT_URI = config("KAKAO_REDIRECT_URI")
KAKAO_CLIENT_ID = config("KAKAO_KEY")
KAKAO_CLIENT_SECRET = config("KAKAO_CLIENT_SECRET")

# JWT 토큰을 처리하는데 사용할 OAuth2PasswordBearer 객체 생성
ALGORITHM = "HS256"

def create_jwt_token(data):
    return jwt.encode(data, JWT_SECRET_KEY, algorithm=ALGORITHM)
  
# token validation
def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")




#get 요청
async def fetch_data(url, headers=None):
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            return await response.text()

async def send_post_request(url, data, headers=None):
    async with aiohttp.ClientSession() as session:
        # 만약 헤더가 있다면, headers 매개변수를 사용하여 전달
        async with session.post(url, data=data, headers=headers) as response:
            return await response.text()


# Kakao login endpoint
@auth.get("/kakao")
def kakao_login():
    return {"url": f"https://kauth.kakao.com/oauth/authorize?client_id={KAKAO_CLIENT_ID}&redirect_uri={KAKAO_REDIRECT_URI}&response_type=code"}


# Kakao callback endpoint
@auth.get("/kakao/callback")
async def kakao_callback(code: str, db: Session = Depends(get_db)):
    # Exchange code for token
    url = "https://kauth.kakao.com/oauth/token"
    data={
            "grant_type": "authorization_code",
            "client_id": KAKAO_CLIENT_ID,
            "redirect_uri": KAKAO_REDIRECT_URI,
            "code": code,
            "client_secret": KAKAO_CLIENT_SECRET
        }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    result = await send_post_request(url, data, headers)
    access_token = json.loads(result)['access_token']
    jwt_data = {
        "isOauth": True,
        "token": access_token
    }
    
    password = str(create_jwt_token(jwt_data))
    print(password, len(password))
    db_user = db.query(models.User).filter(models.User.email == password).first()
    if db_user is None: # user not registered
        headers = {
            "Authorization": f"Bearer ${access_token}",
            "Content-type:": "application/x-www-form-urlencoded;charset=utf-8"
        }
        result = await fetch_data("https://kapi.kakao.com/v2/user/me", headers=headers)
        proerties = json.loads(result)['properties']
        name = proerties['nickname']
        imgSrc = proerties['profile_image']

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        new_user = models.User(
                    userID=uuid.uuid4(),
                    email=password, 
                    password=hashed_password, 
                    name=name, 
                    createdTime=date.today(),
                    imgSrc=imgSrc)
        db.add(new_user) 
        db.commit()    
        db.refresh(new_user) 
        return new_user   
    return db_user