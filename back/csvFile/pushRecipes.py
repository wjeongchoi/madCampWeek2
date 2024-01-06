import csv
import os
import aiohttp
import asyncio
import time
import json
# 0 만개 아이디
# 1 이름
# 2 부제
# 5 난이도 1 아무나, 2 초급, 3 중급 4 고급
# 6 시간



filename='recipes.csv'
os.chdir('C:\\Users\\82102\\Downloads')



def opencsv(filename):
    f = open(filename, 'r', encoding='cp949', errors='ignore')
    reader = csv.reader(f)
    
    output = []
    for i in reader:
        temp = []
        check = True
        for j in range(len(i)):
            if(i[j] == ''):
                check = False
                break
            if(j == 5):
                if(i[j] == '아무나'):
                    i[j] = int(1)
                elif(i[j] == '초급'):
                    i[j] = int(2)
                elif(i[j] == '중급'):
                    i[j] = int(3)
                else:
                    i[j] = int(4)     
            temp.append(i[j])
        if(check == True):
            output.append(temp)
    return output

async def send_post_request(url, data, headers=None):
    async with aiohttp.ClientSession() as session:
        # 만약 헤더가 있다면, headers 매개변수를 사용하여 전달
        async with session.post(url, data=data, headers=headers) as response:
            return await response.text()


async def main():
    for i in range(1, 2):
        payload = {'title': str(output[i][1]),
                    "subTitle": str(output[i][2]),
                    "manId": int(output[i][0]),
                    "level": int(output[i][5]),
                    "cookTime": str(output[i][6])
                    }
        print(json.dumps(payload, ensure_ascii=False))
        url = 'http://127.0.0.1:8000/recipes'
        time.sleep(0.01)
        result = await send_post_request(url=url, data=json.dumps(payload, ensure_ascii=False))  
         
        
if __name__ == "__main__":
    
    output = opencsv(filename)
    asyncio.run(main())
    


    




    