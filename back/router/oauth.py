from fastapi import Depends, HTTPException, APIRouter
from starlette.config import Config
from typing import Optional
import aiohttp

oauth = APIRouter()
config = Config(".env")
REDIRECT_URI = "http://www.localhost:8000/oauth/kakao"
REDIRECT_KAKAO_KEY = config("KAKAO_KEY")
KAKAO_CLIENT_SECRET = config("KAKAO_CLIENT_SECRET")

#get 요청
async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()
        
async def send_post_request(url, data, headers=None):
    async with aiohttp.ClientSession() as session:
        # 만약 헤더가 있다면, headers 매개변수를 사용하여 전달
        async with session.post(url, data=data, headers=headers) as response:
            return await response.text()
        
        
# oauth
@oauth.get('/url')
def oauth_url_api():
    # json
    return {"kakao_oauth_url": f'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id={REDIRECT_KAKAO_KEY}&redirect_uri={REDIRECT_URI}'}
    
@oauth.get("/kakao")
async def request_ouath_with_kakao(code: Optional[str] = None):
    url = "https://kauth.kakao.com/oauth/token"
    payload = {'grant_type': 'authorization_code',
               "code": f'{code}',
               "redirect_uri": f'{REDIRECT_URI}',
               'client_id': f'{REDIRECT_KAKAO_KEY}',
               'client_secret': f'{KAKAO_CLIENT_SECRET}'}
    headers = {
               "Content-Type": "application/x-www-form-urlencoded"
               }

    result = await send_post_request(url, data=payload, headers=headers)
    # json_object = json.loads(result)
    # print("result",  json_object['access_token'])
    return result

