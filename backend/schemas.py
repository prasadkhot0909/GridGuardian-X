from pydantic import BaseModel

class TransformerCreate(BaseModel):
    transformer_id: str
    location: str
    temperature: float
    voltage: float
    current: float
    load: float
    humidity: float
    oil_temperature: float
    age: int
    