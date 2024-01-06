from fastapi import Depends, HTTPException, APIRouter
import crud, models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

cooker = APIRouter()

# cooker - 통과
@cooker.post("/", response_model=schemas.Cooker)
def create_cooker(cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
    if db_cooker:
        raise HTTPException(status_code=400, detail="cooker already registered")
    db_cooker = models.Cooker(cookerID=cooker.cookerID,
                              cookerName=cooker.cookerName)
    db.add(db_cooker) 
    db.commit() 
    db.refresh(db_cooker) 
    return db_cooker

@cooker.get("/", response_model=List[schemas.Cooker])
def get_cookers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.Cooker).offset(skip).limit(limit).all()
    return cookers

@cooker.get("/{cooker_name}", response_model=schemas.Cooker)
def get_cooker(cooker_name: int, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
    if db_cooker is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_cooker