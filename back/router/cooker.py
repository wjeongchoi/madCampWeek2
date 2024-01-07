from fastapi import Depends, HTTPException, APIRouter
import models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

cooker = APIRouter()

### CREATE ### 
# create cooker
@cooker.post("/", response_model=schemas.Cooker)
def create_cooker(cooker_data: schemas.CookerCreate, db: Session = Depends(get_db)):
    # Check if the cooker already exists
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_data.cookerName).first()
    if db_cooker:
        # If cooker exists, raise an HTTPException
        raise HTTPException(status_code=400, detail="Cooker already exists")

    # Create a new cooker if not exist
    db_cooker = models.Cooker(
        cookerID=cooker_data.cookerID,
        cookerName=cooker_data.cookerName
    )

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



### DELETE ### 
# delete cooker
@cooker.delete("/{cooker_name}")
def delete_cooker(cooker_name: str, db: Session = Depends(get_db)):
    db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerName == cooker_name).first()
    
    if db_cooker is None:
        raise HTTPException(status_code=400, detail="Cooker not found")

    # Delete associations in t_myCookers
    db.execute(models.t_myCookers.delete().where(models.t_myCookers.c.cookerID == db_cooker.cookerID))

    # Delete the cooker
    db.delete(db_cooker)
    db.commit()

    return {"message": "Cooker deleted successfully"}

