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
    token_url = "https://kauth.kakao.com/oauth/token"
    token_data = {
        "grant_type": "authorization_code",
        "client_id": KAKAO_CLIENT_ID,
        "redirect_uri": KAKAO_REDIRECT_URI,
        "code": code,
        "client_secret": KAKAO_CLIENT_SECRET
    }
    token_headers = {"Content-Type": "application/x-www-form-urlencoded"}

    token_result = await send_post_request(token_url, token_data, token_headers)
    access_token = json.loads(token_result)['access_token']

    # Fetch user info from Kakao
    user_info_url = "https://kapi.kakao.com/v2/user/me"
    user_info_headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
    user_info_result = await fetch_data(user_info_url, user_info_headers)
    user_info = json.loads(user_info_result)
    email = user_info.get('kakao_account', {}).get('email', None)

    if not email:
        return {"status": "email_required"}


    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == email).first()
    if db_user is None:
        # User not registered, create new user
        properties = user_info.get('properties', {})
        name = properties.get('nickname', 'Unknown')
        imgSrc = properties.get('profile_image', '')

        new_user = models.User(
                    userID=uuid.uuid4(),
                    email=email,
                    password=bcrypt.hashpw(uuid.uuid4().hex.encode('utf-8'), bcrypt.gensalt()), 
                    name=name, 
                    createdTime=date.today(),
                    imgSrc=imgSrc)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    else:
        # User exists, log them in
        return db_user
