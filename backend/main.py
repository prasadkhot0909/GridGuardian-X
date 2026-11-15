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


@app.on_event("startup")
def seed_initial_data():
    """Automatically seeds initial mock transformer data if the database is empty."""
    db: Session = next(get_db())
    try:
        count = db.query(models.Transformer).count()
        if count == 0:
            print("Database is empty. Seeding initial transformer fleet...")
            
            # Sample units matching your schema fields with mapping data added
            mock_units = [
                {
                    "transformer_id": "TR-ALPHA-01",
                    "location": "Substation North - Sector 4",
                    "temperature": 68.5,
                    "voltage": 11.2,
                    "current": 420.0,
                    "load": 45.2,
                    "humidity": 55.0,
                    "oil_temperature": 65.0,
                    "age": 3,
                    "service_zone": "Sector 4 North, Commercial Blocks 12-15",
                    "customers_impacted": 1450
                },
                {
                    "transformer_id": "TR-BETA-04",
                    "location": "Substation Central - Sector 2",
                    "temperature": 88.4,
                    "voltage": 10.8,
                    "current": 780.0,
                    "load": 82.1,
                    "humidity": 65.0,
                    "oil_temperature": 84.5,
                    "age": 7,
                    "service_zone": "Sector 2 Central, Residential Phase 1",
                    "customers_impacted": 3200
                },
                {
                    "transformer_id": "TR-GAMMA-09",
                    "location": "Industrial Zone - Grid 7",
                    "temperature": 104.2,
                    "voltage": 9.5,
                    "current": 950.0,
                    "load": 96.8,
                    "humidity": 78.0,
                    "oil_temperature": 99.1,
                    "age": 12,
                    "service_zone": "Grid 7 Industrial, Heavy Machinery Park",
                    "customers_impacted": 850
                },
                {
                    "transformer_id": "TR-DELTA-12",
                    "location": "Substation West - Sector 1",
                    "temperature": 70.1,
                    "voltage": 11.0,
                    "current": 490.0,
                    "load": 52.0,
                    "humidity": 50.0,
                    "oil_temperature": 67.2,
                    "age": 2,
                    "service_zone": "Sector 1 West, Mixed Commercial",
                    "customers_impacted": 2100
                }
            ]

            for unit_data in mock_units:
                # Unpack health status, failure probability, and root cause reason
                health_status, failure_probability, failure_reason = predict_health(
                    unit_data["temperature"],
                    unit_data["load"],
                    unit_data["oil_temperature"]
                )

                new_transformer = models.Transformer(
                    transformer_id=unit_data["transformer_id"],
                    location=unit_data["location"],
                    temperature=unit_data["temperature"],
                    voltage=unit_data["voltage"],
                    current=unit_data["current"],
                    load=unit_data["load"],
                    humidity=unit_data["humidity"],
                    oil_temperature=unit_data["oil_temperature"],
                    age=unit_data["age"],
                    health_status=health_status,
                    failure_probability=failure_probability,
                    failure_reason=failure_reason,
                    service_zone=unit_data.get("service_zone", "Unknown Sector"),
                    customers_impacted=unit_data.get("customers_impacted", 0)
                )
                db.add(new_transformer)
            
            db.commit()
            print("Successfully seeded initial transformer fleet with AI predictions, root-cause reasons, and map data!")
    except Exception as e:
        print(f"Startup seeding note: {e}")
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "GridGuardian X Backend Running Successfully 🚀"}


@app.post("/transformers")
def create_transformer(
    transformer: schemas.TransformerCreate,
    db: Session = Depends(get_db)
):

    # AI Prediction & Root Cause Analysis
    health_status, failure_probability, failure_reason = predict_health(
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
        failure_probability=failure_probability,
        failure_reason=failure_reason,
        # Defaulting to unknown for new POST entries unless added to schemas.py
        service_zone="Unknown Sector", 
        customers_impacted=0
    )

    db.add(new_transformer)
    db.commit()
    db.refresh(new_transformer)

    return {
        "message": "Transformer added successfully",
        "id": new_transformer.id,
        "health_status": health_status,
        "failure_probability": failure_probability,
        "failure_reason": failure_reason
    }


@app.get("/transformers")
def get_transformers(db: Session = Depends(get_db)):
    transformers = db.query(models.Transformer).all()
    return transformers