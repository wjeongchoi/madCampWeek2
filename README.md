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
| auth/kakao | 카카오 로그인 창 url 가져오기 |
| auth/kakao/callback | kakao로그인을 통해 토큰 가져오기 |
| users/ | 유저들 다 가져오기 |
| users/login | 이메일/패스워드 기반의 로그인 요청 |
| user/{user_id} | 유저 정보 모두 가져오기 |
| users/{user_id}/cookers/ | 내 조리도구들 가져오기 |
| users/{user_id}/ingredients | 내 재료들 가져오기(냉장고) |
| users/{user_id}/like/recipes | 좋아요한 레시피 가져오기 |
| users/{user_id}/recipes | 레시피 id로 가져오기 |
| recipes/ | 레시피 다 가져오기 |
| recipes/{recipe_id} | 레시피 가져오기 |
| recipes/{recipe_Id}/details | 레시피에 해당하는 디테일 가져오기 |
| recipes/{recipe_id}/cookers | 레시피에 사용된 조리도구들 가져오기 |
| recipes/{recipe_Id}/ingredients | 레시피 에 사용된 재료들 가져오기 |
| recipes/search | 이름 기반 레시피 검색 |
| recipes/recommend | 재료/조리도구 기반 레시피 검색 |
| ingredients/ | 재료 전부 가져오기 |
| ingredients/{ingredient_name} | 재료 가져오기 |
| cookers/ | 조리도구 전부 가져오기 |
| cookers/{cooker_name} | 조리도구 가져오기 |

### POST

| url | 설명 |
| --- | --- |
| users/ | 유저 생성 |
| users/{user_id}/ingredients | 유저의 재료 추가 |
| users/{user_id}/cooker | 유저의 조리도구 추가 |
| users/{user_id}/like/recipe | 유저의 좋아요 레시피 추가 |
| users/{user_id}/recipe | 유저의 레시피 추가 |
| recipes/ | 레시피 추가 |
| recipes/{recipe_id}/detail | 레시피 디테일 추가 |
| ingredients/ | 재료 추가 |
| cookers/ | 조리도구 추가 |

### PUT

| url | 설명 |
| --- | --- |
| uses/{user_id} | 유저 정보 수정 |
| recipes/{recipe_id} | 레시피 정보 수정 |
| recipes/{recipe_id}/{detailRecipe_id} | 레시피 디테일 수정 |

### DELETE

| url | 설명 |
| --- | --- |
| users/{user_id} | 유저 삭제 |
| users/{user_id}/ingredient/{ingredient_name} | 유저의 재료 삭제 |
| users/{user_id}/cooker/{cooker_name} | 유저의 조리도구 삭제 |
| recipes/{recipe_id} | 레시피 삭제 |
| recipes/details/{detail_id} | 레시피 디테일 삭제 |
| ingredients/{ingredient_name} | 재료 삭제 |
| cookers/{cooker_name} | 조리도구 삭제 |



## E. 어플리케이션 소개
자취생들을 위한 레시피 추천 어플리케이션

### 1. Login
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/928eb0df-ee8a-4bac-93a6-44c0ba12f588" width="300" height="650" />


- 카카오 ouath를 이용한 로그인이 가능합니다.
- 이메일/패스워드 기반의 로그인이 가능합니다.
    - 로그인 관련 정보를 ```JWT토큰```을 사용해 암호화하여 관리합니다.
- 로그인 시 사용자와 관련된 정보에 접근이 가능합니다.
   - 내 재료/조리도구 수정이 가능합니다.
   - 레시피 업로드가 가능합니다.
   - 이메일을 제외한 개인 정보 수정 가능합니다.
 

### 2. Home

<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/c2803459-029e-4e62-bb5e-0d2e83b5330f"  width="300" height="650" />


-  내가 좋아요한 레시피/내 재료/내 조리도구를 한 눈에 볼 수 있는 화면입니다.
-  검색 화면으로 바로 이동할 수 있습니다.


### 3. Search
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/4e4d0908-abc2-45a9-9466-4e3a2ec10a2d"  width="300" height="650"  />


전체 레시피를 추천받을 수 있습니다.
만개의 레시피 API를 이용하여 
메뉴이름을 통해 레시피를 검색할 수 있습니다.
~사용된 재료를 통해 레시피를 검색할 수 있습니다.~

### 4. Recommend
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/3ac4d9cf-75bb-4413-953a-315ac8c87414"  width="300" height="650"  />
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/eb588eea-a987-411f-94b1-47b7bcf796ea"  width="300" height="650"  />


- ```레시피 추천 메인```의 상단에 오늘의 추천 메뉴를 띄어줍니다.
- 내가 가지고 있는 재료와 조리도구를 기반으로 레시피를 추천 받을 수 있습니다.
- 재료와 조리도구를 태그형태로 추가해 레시피 추천을 받을 수 있습니다.
- ```추천받기```에 들어가면 내 냉장고에 있는 재료와 내가 가지고 있는 조리도구를 디폴트로 설정됩니다.
- ```당신을 위한 레시피```에서는 내가 관심있는 레시피를 맞춤형으로 추천해 줍니다.



### 5. User's recipe

<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/bebe0e0a-9e04-4870-af59-f1839a14f476"  width="300" height="650" />
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/37ebeea4-7e63-4a4d-98ca-5d6aff51f9a9"  width="300" height="650"  />

- 다른 사람들이 작성한 레시피를 볼 수 있습니다.
- 좋아요를 눌러 내가 좋아요한 레시피를 한 눈에 볼 수 있습니다.
- 상단의 ```내 레시피 등록하기```를 통해 레시피 등록화면으로 이동할 수 있습니다.
- ```레시피 등록화면```에서 레시피를 등록할 수 있습니다.

### 6. My Page
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/562b3e6b-b223-473f-88f8-acca4f9f02cd"  width="300" height="650"  />
<img src="https://github.com/wjeongchoi/madCampWeek2/assets/144689054/7c7772cd-daa1-4696-95d9-6ebc4240d37e"  width="300" height="650"  />



## F. 색상
| 이름 | 색상 블럭 | 
| --- | --- |
| Primary |  ![primaryLight](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/8fff589d-ebfe-42f4-b71a-4684c3686594)![primary](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/82f9725c-a3c1-49a5-a32a-a4fe3095f4d6)![primaryDark](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/f22c76c5-461a-4435-8013-2732b358ed90) |
|  Red | ![warning](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/4968a104-82d5-410f-bd49-e405f21c1192)![red](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/0fa127b0-06f6-4c4b-baef-7150d45c2508)![like](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/05037645-1307-4c13-ae14-87e1a50483d2) |
|   Gray | ![gray50](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/68774f90-ef79-491f-84f5-7a2fbc68cec6)![gray100](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/b5359996-053a-4427-9c17-f45a243e1588)![gray200](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/7b289465-2092-44bf-99fe-a37d47aaa7bc)![gray300](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/dd51c033-1239-4189-82ca-f0f56595f688)![gray400](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/09657934-a4b5-4c31-9f5d-feb787b4ebea)![gray500](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/612386de-d395-4ca6-af2f-20bd9a80d7c5)![gray600](https://github.com/wjeongchoi/madCampWeek2/assets/64767436/991f6918-32dd-425f-a4da-295bd6022738) |


