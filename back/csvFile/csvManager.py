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

filename='TB_RECIPE_SEARCH-20231130.csv'
os.chdir('C:\\Users\\82102\\Downloads')



def opencsv(filename):
    f = open(filename, 'r', encoding='cp949')
    reader = csv.reader(f)
    output = []
    for i in reader:
        output.append(i)
    return output

def writecsv(filename, the_list):
    with open(filename, 'w', newline='') as f:
        a = csv.writer(f, delimiter=',')
        a.writerows(the_list)


if __name__ == "__main__":
    output = opencsv(filename)
    # something to do
    
    
    
    writecsv('out.csv', output)
    




    