from sqlalchemy.orm import Session

# 기존에 생성한 모델과 스키마 불러오기
import models.models as models, schemas.schemas as schemas


# User
def get_user_by_email(db: Session, user_email: int):
    return db.query(models.User).filter(models.User.email == user_email).first()


def users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "temptemp"
    db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db.add(db_user) 
    db.commit() 
    db.refresh(db_user) 
    return db_user

