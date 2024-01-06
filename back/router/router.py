from router.oauth import oauth
from router.users import user
from router.recipes import recipe
from back.router.ingrendient import ingredient
from router.cooker import cooker
from database import SessionLocal, engine

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
