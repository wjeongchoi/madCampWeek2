from fastapi import Depends, HTTPException, APIRouter, Query
import models.models as models, schemas.schemas as schemas
from sqlalchemy.orm import Session
from database import get_db
from typing import List, Optional


recipe = APIRouter()

### CREATE ### 
# Create recipe
@recipe.post("/", response_model=schemas.Recipe)
def create_recipe(recipe_data: schemas.RecipeCreate, db: Session = Depends(get_db)):
    # Check if recipe already exists
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_data.recipeID).first()
    if db_recipe:
        raise HTTPException(status_code=400, detail="Recipe already exists")

    # Create new recipe object
    new_recipe = models.Recipe(
        recipeID=recipe_data.recipeID,
        title=recipe_data.title,
        subTitle=recipe_data.subTitle,
        manId=recipe_data.manId,
        cookTime=recipe_data.cookTime,
        like=recipe_data.like,
        writedTime=recipe_data.writedTime,
        modifiedTime=recipe_data.modifiedTime,
        level=recipe_data.level
    )

    db.add(new_recipe)
    db.commit()
    db.refresh(new_recipe)

    # Handling ingredients
    for ingredient_data in recipe_data.ingredients:
        db_ingredient = db.query(models.Ingredient).filter(models.Ingredient.ingredientID == ingredient_data.ingredientID).first()
        if not db_ingredient:
            db_ingredient = models.Ingredient(ingredientID=ingredient_data.ingredientID, ingredientName=ingredient_data.ingredientName)
            db.add(db_ingredient)
            db.commit()
            db.refresh(db_ingredient)
        existing_association = db.execute(models.t_recipeWithIngredient.select().where(
            models.t_recipeWithIngredient.c.recipeID == new_recipe.recipeID,
            models.t_recipeWithIngredient.c.ingredientID == db_ingredient.ingredientID
        )).fetchone()

        if not existing_association:
            association = models.t_recipeWithIngredient.insert().values(recipeID=new_recipe.recipeID, ingredientID=db_ingredient.ingredientID)
            db.execute(association)

    # Handling cookers
    for cooker_data in recipe_data.cookers:
        db_cooker = db.query(models.Cooker).filter(models.Cooker.cookerID == cooker_data.cookerID).first()
        if not db_cooker:
            db_cooker = models.Cooker(cookerID=cooker_data.cookerID, cookerName=cooker_data.cookerName)
            db.add(db_cooker)
            db.commit()
            db.refresh(db_cooker)
        existing_association = db.execute(models.t_recipeWithCooker.select().where(
            models.t_recipeWithCooker.c.recipeID == new_recipe.recipeID,
            models.t_recipeWithCooker.c.ingredientID == db_ingredient.cookerID
        )).fetchone()

        if not existing_association:
            association = models.t_recipeWithCooker.insert().values(recipeID=new_recipe.recipeID, ingredientID=db_cooker.cookerID)
            db.execute(association)

    db.commit()

    return new_recipe

@recipe.post("/{recipe_id}/detail", response_model=schemas.DetailRecipe)
def create_recipe_detail(recipe_id: str, detail_data: schemas.DetailRecipeCreate, db: Session = Depends(get_db)):
    # Check if the recipe exists
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if not db_recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # Create new recipe detail object
    new_detail = models.DetailRecipe(
        detailRecipeID=detail_data.detailRecipeID,
        description=detail_data.description,
        order=detail_data.order,
        imgSrc=detail_data.imgSrc,
        recipeID=recipe_id
    )

    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)

    return new_detail


### READ ###
# Get all recipes
@recipe.get("/", response_model=List[schemas.Recipe])
def get_recipes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    recipes = db.query(models.Recipe).offset(skip).limit(limit).all()
    return recipes

# Get recipe by ID
@recipe.get("/{recipe_id}", response_model=schemas.Recipe)
def get_recipe(recipe_id: str, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return db_recipe

@recipe.get("/{recipe_id}/details", response_model=List[schemas.DetailRecipe])
def get_recipe_details(recipe_id: str, db: Session = Depends(get_db)):
    # Fetching the details of the recipe
    details = db.query(models.DetailRecipe).filter(models.DetailRecipe.recipeID == recipe_id).all()

    if not details:
        raise HTTPException(status_code=404, detail="Recipe details not found")

    return details

@recipe.get("/{recipe_id}/cookers", response_model=List[schemas.Cooker])
def get_recipe_cookers(recipe_id: str, skip: int = 0, limit: int = 100,db: Session = Depends(get_db)):
    cookers = db.query(models.t_recipeWithCooker).filter(models.t_recipeWithCooker.c.recipeID == recipe_id).offset(skip).limit(limit).all()
    response_data = []
    for cooker in cookers:
        c = db.query(models.Cooker).filter(models.Cooker.cookerID == cooker.cookerID).first()
        response_data.append(c)
    return response_data

@recipe.get("/{recipe_id}/ingredients", response_model=List[schemas.Ingredient])
def get_recipe_ingredients(recipe_id: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    ingredients = db.query(models.t_recipeWithIngredient).filter(models.t_recipeWithIngredient.c.recipeID == recipe_id).offset(skip).limit(limit).all()
    
    response_data = []
    for ingredient in ingredients:
        i = db.query(models.Ingredient).filter(models.Ingredient.ingredientID == ingredient.ingredientID).first()
        response_data.append(i)
    return response_data


@recipe.get("/search", response_model=List[schemas.Recipe])
def search_recipes(name: str = Query(None, min_length=1), db: Session = Depends(get_db)):
    # Searching for recipes by name
    if name:
        recipes = db.query(models.Recipe).filter(models.Recipe.title.contains(name)).all()
        return recipes
    else:
        raise HTTPException(status_code=400, detail="Search query cannot be empty")

@recipe.get("/recommend", response_model=List[schemas.Recipe])
def recommend(
    ingredient_ids: Optional[List[str]] = Query(None),
    cooker_ids: Optional[List[str]] = Query(None),
    db: Session = Depends(get_db)
):
    # Building the query
    query = db.query(models.Recipe)

    # Filter by ingredients if provided
    if ingredient_ids:
        query = query.join(models.t_recipeWithIngredient, models.Recipe.recipeID == models.t_recipeWithIngredient.c.recipeID)
        query = query.filter(models.t_recipeWithIngredient.c.ingredientID.in_(ingredient_ids))

    # Filter by cookers if provided
    if cooker_ids:
        query = query.join(models.t_recipeWithCooker, models.Recipe.recipeID == models.t_recipeWithCooker.c.recipeID)
        query = query.filter(models.t_recipeWithCooker.c.cookerID.in_(cooker_ids))

    # Get the distinct recipes after applying filters
    recipes = query.distinct().all()

    return recipes

### UPDATE ### 
# Update recipe
@recipe.put("/{recipe_id}", response_model=schemas.Recipe)
def update_recipe(recipe_id: str, recipe: schemas.RecipeUpdate, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")

    db_recipe.title = recipe.title
    db_recipe.subTitle = recipe.subTitle
    db_recipe.manId = recipe.manId
    db_recipe.cookTime = recipe.cookTime
    db_recipe.like = recipe.like
    db_recipe.modifiedTime = recipe.modifiedTime if recipe.isModify else None
    db_recipe.level = recipe.level

    db.commit() 
    db.refresh(db_recipe) 
    return db_recipe

@recipe.put("/details/{detailRecipeID}", response_model=schemas.DetailRecipe)
def update_recipe_detail(detailRecipeID: str, detail_data: schemas.DetailRecipeUpdate, db: Session = Depends(get_db)):
    # Fetch and update the recipe detail by detailRecipeID
    db_detail = db.query(models.DetailRecipe).filter(models.DetailRecipe.detailRecipeID == detailRecipeID).first()
    if not db_detail:
        raise HTTPException(status_code=404, detail="Recipe detail not found")

    db_detail.description = detail_data.description
    db_detail.order = detail_data.order
    db_detail.imgSrc = detail_data.imgSrc

    db.commit()
    db.refresh(db_detail)

    return db_detail

### DELETE ### 
# Delete recipe
@recipe.delete("/{recipe_id}")
def delete_recipe(recipe_id: str, db: Session = Depends(get_db)):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.recipeID == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")

    # Delete associations with cookers and ingredients
    db.execute(models.t_recipeWithCooker.delete().where(models.t_recipeWithCooker.c.recipeID == recipe_id))
    db.execute(models.t_recipeWithIngredient.delete().where(models.t_recipeWithIngredient.c.recipeID == recipe_id))

    db.delete(db_recipe)
    db.commit()
    return {"message": "Recipe deleted successfully"}

@recipe.delete("/details/{detailRecipeID}")
def delete_recipe_detail(detailRecipeID: str, db: Session = Depends(get_db)):
    # Fetch and delete the recipe detail by detailRecipeID
    db_detail = db.query(models.DetailRecipe).filter(models.DetailRecipe.detailRecipeID == detailRecipeID).first()
    if not db_detail:
        raise HTTPException(status_code=404, detail="Recipe detail not found")

    db.delete(db_detail)
    db.commit()

    return {"message": "Recipe detail deleted successfully"}