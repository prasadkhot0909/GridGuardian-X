from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from predict import predict_health
import models
import schemas

Base.metadata.create_all(bind=engine)

app = FastAPI(title="GridGuardian X API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175"
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "GridGuardian X Backend Running Successfully 🚀"}


@app.post("/transformers")
def create_transformer(
    transformer: schemas.TransformerCreate,
    db: Session = Depends(get_db)
):

    # AI Prediction
    health_status, failure_probability = predict_health(
        transformer.temperature,
        transformer.load,
        transformer.oil_temperature
    )

    new_transformer = models.Transformer(
        transformer_id=transformer.transformer_id,
        location=transformer.location,
        temperature=transformer.temperature,
        voltage=transformer.voltage,
        current=transformer.current,
        load=transformer.load,
        humidity=transformer.humidity,
        oil_temperature=transformer.oil_temperature,
        age=transformer.age,
        health_status=health_status,
        failure_probability=failure_probability
    )

    db.add(new_transformer)
    db.commit()
    db.refresh(new_transformer)

    return {
        "message": "Transformer added successfully",
        "id": new_transformer.id,
        "health_status": health_status,
        "failure_probability": failure_probability
    }


@app.get("/transformers")
def get_transformers(db: Session = Depends(get_db)):
    transformers = db.query(models.Transformer).all()
    return transformers