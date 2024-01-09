
대표 이미지

-----------------
Download HERE!




## 1. 개발 인원
- **신지섭** 한양대학교 컴퓨터소프트웨어학부 20학번
- **최우정** KAIST 화학과 21학번

## 2. 개발 환경
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white"/>

 mySQL 8.0.35
 
 fastAPI: 0.108.0
 
 react native: 0.72.6
 
 - Languege: type script, python
 - Framework: React Native, FastAPI
 - IDE: VScode
 - Target Device: Galaxy S7

## 3. API 정보

### GET
| url | 설명 |
| --- | --- |
| auth/url | 카카오 로그인 창 url 가져오기 |
| auth/kakao | kakao로그인을 통해 토큰 가져오기 |
| users/{user_id}/cooker/ | 내 조리도구들 가져오기 |
| users/{user_id}/ingredients | 내 재료들 가져오기(냉장고) |
| users/{user_id}/like/recipes | 좋아요한 레시피 가져오기 |
| users/{user_id}/recipes | 레시피 id로 가져오기 |
| users/ | 유저들 다 가져오기 |
| user/{user_id} | 유저 정보 가져오기 |
| recipes/ | 레시피 다 가져오기 |
| recipes/{recipe_id} | 레시피 가져오기 |
| recipes/{recipe_Id}/details | 레시피에 해당하는 디테일 가져오기 |
| recipes/{recipe_id}/cookers | 레시피에 사용된 조리도구들 가져오기 |
| recipes/{recipe_Id}/ingredients | 레시피 에 사용된 재료들 가져오기 |
| ingredients/ | 재료 전부 가져오기 |
| ingredients/{ingredient_name} | 재료 가져오기 |
| cookers/ | 조리도구 전부 가져오기 |
| cookers/{cooker_name} | 조리도구 가져오기 |
| recipes/search | 레시피 검색 |

### POST
| url | 설명 |
| --- | --- |
| user/ | 유저 생성 |
| users/{user_id}/ingredients | 유저의 재료 추가 |
| users/{user_id}/cooker | 유저의 조리도구 추가 |
| users/{user_id}/like/recipe | 유저의 좋아요 레시피 추가 |
| recipes/ | 레시피 추가 |
| recipes/{recipe_id}/detail | 레시피 디테일 추가 |
| ingredients/ | 재료 추가 |
| cookers/ | 조리도구 추가 |
| users/{user_id}/recipe | 유저의 레시피 추가 |

### PUT
| url | 설명 |
| --- | --- |
| recipes/{recipe_id}/detail | 레시피 detail 수정 |
| recipes/{recipe_id} | 레시피 수정 |

### DELETE

| url | 설명 |
| --- | --- |
| recipes/{recipe_id} | 레시피 삭제 |
| recipes/{detail_id}/detail | 레시피 디테일 삭제 |
| ingredients/{ingredient_name} | 재료 삭제 |
| cookers/{cooker_name} | 조리도구 삭제 |
| users/{user_id} | 유저 삭제 |
| users/{user_id}/ingredient/{ingredient_name} | 유저의 재료 삭제 |
| users/{user_id}/cooker/{cooker_name} | 유저의 조리도구 삭제 |
|  | 레시피의 조리도구 삭제 |
|  | 레시피의 재료 삭제 |

## 4. 어플리케이션 소개
