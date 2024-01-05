




from fastapi import Depends, HTTPException, APIRouter
import crud, models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List

ingradiant = APIRouter()

# ingradiant
@ingradiant.post("/", response_model=schemas.Ingradiant)
def create_ingradiant(ingradiant: schemas.IngradiantCreate, db: Session = Depends(get_db)):
    db_ingradiant = crud.ingradiant(db, ingradiant_name=ingradiant.ingradiantName)
    if db_ingradiant:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.ingradiant(db=db, ingradiant=ingradiant)


@ingradiant.get("/", response_model=List[schemas.Ingradiant])
def get_ingradinats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingradiants = crud.ingradiants(db, skip=skip, limit=limit)
    return ingradiants

@ingradiant.get("/{ingradiant_name}", response_model=schemas.Ingradiant)
def get_ingradinat(ingradiant_name: int, db: Session = Depends(get_db)):
    db_ingradiant = crud.ingradiant(db, ingradiant_name=ingradiant_name)
    if db_ingradiant is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_ingradiant
