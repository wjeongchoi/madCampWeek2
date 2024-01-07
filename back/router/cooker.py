from fastapi import Depends, HTTPException, APIRouter
import models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

cooker = APIRouter()

### CREATE ### 
# create cooker - 통과
@cooker.post("/", response_model=schemas.Cooker)
def create_cooker(cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker.cookerName).first()
    if db_cooker is None:
        return db_cooker
    db_cooker = models.Cooker(cookerID=cooker.cookerID,
                              cookerName=cooker.cookerName)

    db.add(db_cooker) 
    db.commit() 
    db.refresh(db_cooker) 
    return db_cooker

### READ ### 
# get all cookers
@cooker.get("/", response_model=List[schemas.Cooker])
def get_cookers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = db.query(models.Cooker).offset(skip).limit(limit).all()
    return cookers

# get all cooker
@cooker.get("/{cooker_name}", response_model=schemas.Cooker)
def get_cooker(cooker_name: str, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_name).first()
    if db_cooker is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db_cooker


### UDATE ###
# update cooker
@cooker.put("/{cooker_name}", response_model=schemas.Cooker)
def update_cooker(cooker_name: str, cooker: schemas.CookerUpdate, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_name).first()
    if db_cooker is None:
        raise HTTPException(status_code=404, detail="cooker not found")
    db_cooker.cookerName = cooker.cookerName
    db.commit() 
    return db_cooker


### DELETE ### 
# delete cooker
@cooker.delete("/{cooker_name}")
def delete_cooker(cooker_name: str, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_name).first()
    
    if db_cooker is None:
        raise HTTPException(status_code=400, detail="cooker not found")
    db_my_cookers = db.query(models.MyCookers).filter(models.MyCookers.cookerID == db_cooker.cookerID).all()
    for db_my_cooker in db_my_cookers:
        db.delete(db_my_cooker)
    db.delete(db_cooker)
    db.commit()
    return {"message": "cooker deleted successfully"}


