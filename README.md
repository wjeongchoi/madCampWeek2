# 맞춤혼밥
자취생들을 위한 레시피 추천 어플리케이션

대표 이미지

-----------------
Download HERE!




## A. 개발 인원
- **신지섭** 한양대학교 컴퓨터소프트웨어학부 20학번
- **최우정** KAIST 화학과 21학번

## B. 개발 환경
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
<img src="https://img.shields.io/badge/React Native-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white"/>

 - Language : Python 3.10.11, Typescript: 5.3.3
 - DB: mySQL 8.0.35
 - Framework: React Native: 0.72.6, fastAPI 0.108.0
 - IDE: VScode
 - Target Device: Galaxy S7

## C. API 정보 & 데이터 구조


![스크린샷 2024-01-07 오후 8.22.09.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a5241534-a062-439e-bfb8-d9f21ae24137/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-01-07_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.22.09.png)

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

## D. 어플리케이션 소개
자취생들을 위한 

### 0. 인트로


### 1. Search
전체 레시피를 추천받을 수 있습니다.

### 2. Recommand
내가 가지고 있는 재료와 조리도구를 기반으로 레시피를 추천 받을 수 있음


### 3. User's recipe
다른 사람들이 작성한 레시피를 볼 수 있음
좋아요를 눌러 한 눈에 볼 수 있음

### 4. Login
카카오 로그인
이메일/패스워드 기반 로그인
로그인 시user관련 정보에 접근 가능
내 재료/조리도구 수정 가능

### 5. Home
나와 관련된 레시피, 재료, 조리도구를 볼 수 있음

