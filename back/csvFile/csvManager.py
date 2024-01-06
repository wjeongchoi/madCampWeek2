import csv
import os

# RCP_SNO 	        #레시피일련번호
# RCP_TTL	        레시피제목
# CKG_NM	        #요리명 
# RGTR_ID	        등록자ID
# RGTR_NM	        등록자명
# INQ_CNT	        조회수
# RCMM_CNT	        추천수
# SRAP_CNT	        스크랩수
# CKG_MTH_ACTO_NM	요리방법별명
# CKG_STA_ACTO_NM	요리상황별명
# CKG_MTRL_ACTO_NM	요리재료별명
# CKG_KND_ACTO_NM	요리종류별명
# CKG_IPDC	        #요리소개
# CKG_MTRL_CN	    #요리재료내용(파싱)
# CKG_INBUN_NM	    #요리인분명
# CKG_DODF_NM	    #요리난이도명
# CKG_TIME_NM	    #요리시간명
# FIRST_REG_DT	    #최초등록일시



filename='TB_RECIPE_SEARCH-220701.csv'
os.chdir('C:\\Users\\82102\\Downloads')



def opencsv(filename):
    f = open(filename, 'r', encoding='cp949', errors='ignore' )
    reader = csv.reader(f)
    
    output = []
    for i in reader:
        temp = []
        #0 2 12 13 14 15 16 17
        for j in range(len(i)):
            if(j == 0 or j == 2 or (j >= 12 and j <=17)):
                temp.append(i[j])
        output.append(temp)
    return output

def writecsv(filename, the_list):
    with open(filename, 'w', newline='') as f:
        a = csv.writer(f)
        a.writerows(the_list)
        f.close()

if __name__ == "__main__":
    output = opencsv(filename)
    # something to do
    print(output[1][0])
    print(output[3][0])
    writecsv('C:\\Users\\82102\\Downloads\\out.csv', output)
    




    