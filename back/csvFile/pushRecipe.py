# import mysql.connector


# conn = mysql.connector.connect(
#     host='127.0.0.1',  # 데이터베이스 호스트
#     port=3333,  # 데이터베이스 포트
#     user='root',  # 데이터베이스 사용자명
#     password='gobackhome12!',  # 데이터베이스 비밀번호
#     database='madcamp2'  # 접속하려는 데이터베이스 이름
# )


# cursor = conn.cursor()

# # 0 만개 아이디
# # 1 이름
# # 2 부제
# # 5 난이도 1 아무나, 2 초급, 3 중급 4 고급
# # 6 시간

# # cities.txt 파일에서 도시 정보 읽어오기
# with open("cities.txt", "r", encoding="utf-8") as file:
#     cities_list = file.read().splitlines()

# # 도시 정보를 CITY 테이블에 추가
# insert_query = "INSERT INTO recipes (recipeId, title, subTitle, manId, cookTime, ) VALUES (%s)"
# #
# for city_info in cities_list:
#     city_name = city_info.split(". ")[1]
#     try:
#         cursor.execute(insert_query, (city_name,))
#         conn.commit()
#         print(f"{city_name}가 CITY 테이블에 추가되었습니다.")
#     except mysql.connector.Error as err:
#         print(f"도시 추가 오류: {err}")

# conn.close()