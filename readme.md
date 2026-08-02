# GridGuardian X

GridGuardian X is a full-stack transformer health monitoring application that combines a FastAPI backend with a React + Vite dashboard. It collects transformer telemetry, runs a simple health-risk prediction, and displays live status, charts, and fleet insights in a modern UI.

## Overview

This project has two main parts:

- Backend: FastAPI service for storing transformer data and generating health predictions.
- Frontend: React dashboard for viewing transformer health, risk, charts, and live status.

## Features

- Add and list transformer records through the API
- Predict health status and failure probability from temperature, load, and oil temperature
- Visualize transformer fleet metrics in charts and cards
- Display backend connectivity and refresh status in the dashboard
- Search and filter transformers by ID, location, and health state

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL via SQLAlchemy

### Frontend
- React 18
- Vite
- Chart.js + react-chartjs-2
- Framer Motion
- Axios
- Lucide React

## Project Structure

```text
backend/
  main.py
  database.py
  models.py
  schemas.py
  predict.py
  requirements.txt

gridguardian-x/gridguardian-x/
  src/
    api/
    components/
    context/
    hooks/
    utils/
  mock-server/
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL database

## Backend Setup

1. Open a terminal in the project root.
2. Create and activate a virtual environment:

```bash
cd backend
python -m venv venv
venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Set your database environment variable:

```bash
set DATABASE_URL=postgresql://username:password@localhost:5432/gridguardian
```

5. Start the backend server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- http://127.0.0.1:8000

### Backend API Endpoints

- GET / → health check
- GET /transformers → list all transformers
- POST /transformers → create a transformer and return prediction results

## Frontend Setup

1. Open a second terminal.
2. Install frontend dependencies:

```bash
cd gridguardian-x/gridguardian-x
npm install
```

3. Start the development server:

```bash
npm run dev
```

The dashboard will be available at:
- http://localhost:5173

## Demo / Mock Server

A mock server is included for UI demos if you do not want to run the backend immediately:

```bash
cd gridguardian-x/gridguardian-x
node mock-server/server.js
```

## Environment Notes

- The frontend expects the backend at http://127.0.0.1:8000.
- The backend uses the DATABASE_URL environment variable for connecting to PostgreSQL.
- Tables are created automatically when the FastAPI app starts.

## Development Notes

- The prediction logic is currently rule-based and lives in backend/predict.py.
- The frontend polls transformer data every few seconds for a near real-time experience.

## License

This project is for educational and demonstration purposes.
