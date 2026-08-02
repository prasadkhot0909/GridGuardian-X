# GridGuardian X

AI-powered transformer health monitoring dashboard — futuristic dark UI, glassmorphism, live telemetry.

## Stack

- React 18 + Vite
- Framer Motion (animation)
- Chart.js + react-chartjs-2 (analytics)
- Axios (data fetching)
- Lucide React (icons)
- Plain CSS with a design-token system (no UI framework)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` and expects a backend at:

```
GET http://127.0.0.1:8000/transformers
```

returning a JSON array of objects shaped like:

```json
{
  "id": 1,
  "transformer_id": "TRX-101",
  "location": "Sector 7 — Substation A",
  "temperature": 68.4,
  "load": 0.72,
  "health_status": "Healthy",
  "failure_probability": 0.08
}
```

`load` and `failure_probability` may be sent either as a 0–1 fraction or a 0–100 number — both are handled.

## No backend yet?

A zero-dependency mock server is included for demos:

```bash
node mock-server/server.js
```

It serves realistic, slightly-jittering data on port 8000 so the dashboard behaves like a live feed. Swap it out for the real API at any time — no frontend changes required.

## Behavior notes

- Polls `/transformers` every 5 seconds; the first load shows skeleton loaders, later refreshes update silently in the background.
- If the backend is unreachable, the header shows **Backend Offline**, a toast fires once, and the fleet section shows a reconnect state — no fake data is ever substituted.
- Search filters by transformer ID or location; the status dropdown filters by health tier.
- `health_status` is matched case-insensitively against Healthy / Warning / Critical.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/            axios client + fetch function
  components/     UI components (cards, charts, header, grids, toasts)
  components/charts/  Chart.js chart components
  context/        Toast notification context
  hooks/          useClock, useTransformers (polling)
  utils/          formatting + status helpers
```
