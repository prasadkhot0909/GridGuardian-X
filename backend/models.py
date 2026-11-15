from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
from datetime import datetime


class Transformer(Base):
    __tablename__ = "transformers"

    id = Column(Integer, primary_key=True, index=True)
    transformer_id = Column(String, unique=True, nullable=False)
    location = Column(String)
    temperature = Column(Float)
    voltage = Column(Float)
    current = Column(Float)
    load = Column(Float)
    humidity = Column(Float)
    oil_temperature = Column(Float)
    age = Column(Integer)
    health_status = Column(String)
    failure_probability = Column(Float)
    
    # New additions for Root Cause and Map logic
    failure_reason = Column(String, nullable=True)
    service_zone = Column(String, nullable=True)
    customers_impacted = Column(Integer, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)