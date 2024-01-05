from fastapi import Depends, HTTPException, APIRouter
import crud, models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

cooker = APIRouter()

# cooker
@cooker.post("/", response_model=schemas.Cooker)
def create_cooker(cooker: schemas.CookerCreate, db: Session = Depends(get_db)):
    db_ingradiant = crud.cooker(db, ingradiant_name=cooker.cookerName)
    if db_ingradiant:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.cooker(db=db, cooker=cooker)


@cooker.get("/", response_model=List[schemas.Cooker])
def get_cookers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    cookers = crud.cookers(db, skip=skip, limit=limit)
    return cookers

@cooker.get("/{cooker_name}", response_model=schemas.Cooker)
def get_cooker(cooker_name: int, db: Session = Depends(get_db)):
    db_cooker = crud.cooker(db, cooker_name=cooker_name)
    if db_cooker is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_cooker