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

## C. 데이터 구조

![diagram](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/ab4ce26b-10ab-4e53-94b4-64c1d3e8dfcb)

| Entity | 설명 |
| --- | --- |
| users | 사용자 entity |
| recipes | 레시피 entity |
| ingredients | 재료 entity  |
| cookers | 조리도구 entity |
| detailRecipes | 레시피 안에 들어가는 자세한 레시피 |
| myIngredients | 내 냉장고에 있는(내가 사용할 수 있는) 재료 |
| myCookers | 내가 사용할  수 있는 조리도구 |
| likeRecipes | 좋아요를 누른 레시피 |
| myRecipes | 내가 작성한 레시피 |
| recipeWithIngredient | 레시피에 사용된 재료를 저장 |
| recipeWithCooker | 레시피에 사용된 조리도구를를 저장 |

## D. API 정보

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

## E. 어플리케이션 소개
자취생들을 위한 레시피 추천 어플리케이션


### 0. 인트로


### 1. Search
전체 레시피를 추천받을 수 있습니다.
만개의 레시피 API를 이용하여 
메뉴이름을 통해 레시피를 검색할 수 있습니다.
~사용된 재료를 통해 레시피를 검색할 수 있습니다.~

### 2. Recommand
- ```레시피 추천 메인```의 상단에 오늘의 추천 메뉴를 띄어줍니다.
- 내가 가지고 있는 재료와 조리도구를 기반으로 레시피를 추천 받을 수 있습니다.
- 재료와 조리도구를 태그형태로 추가해 레시피 추천을 받을 수 있습니다.
- ```추천받기```에 들어가면 내 냉장고에 있는 재료와 내가 가지고 있는 조리도구를 디폴트로 설정됩니다.
- ```당신을 위한 레시피```에서는 내가 관심있는 레시피를 맞춤형으로 추천해 줍니다.



### 3. User's recipe
- 다른 사람들이 작성한 레시피를 볼 수 있습니다.
- 좋아요를 눌러 내가 좋아요한 레시피를 한 눈에 볼 수 있습니다.
- 상단의 ```내 레시피 등록하기```를 통해 레시피 등록화면으로 이동할 수 있습니다.
- ```레시피 등록화면```에서 레시피를 등록할 수 있습니다.


### 4. Login
- 카카오 ouath를 이용한 로그인이 가능합니다.
- 이메일/패스워드 기반의 로그인이 가능합니다.
    - 로그인 관련 정보를 ```JWT토큰```을 사용해 암호화하여 관리합니다.
- 로그인 시 사용자와 관련된 정보에 접근이 가능합니다.
   - 내 재료/조리도구 수정이 가능합니다.
   - 레시피 업로드가 가능합니다.
   - 이메일을 제외한 개인 정보 수정 가능합니다.

### 5. Home
-  내가 좋아요한 레시피/내 재료/내 조리도구를 한 눈에 볼 수 있는 화면입니다.
   - 

## F. 색상

primary <div style="background-color: #FFCA0F"><img width="50px" height="50px" /></div>
