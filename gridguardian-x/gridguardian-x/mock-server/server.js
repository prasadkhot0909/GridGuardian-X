/**
 * Optional zero-dependency mock backend for GridGuardian X.
 * Only for local demo purposes when the real backend isn't running yet.
 * Run with: node mock-server/server.js
 * Serves GET http://127.0.0.1:8000/transformers with CORS enabled,
 * and jitters values slightly on every request to simulate live telemetry.
 */
import { createServer } from 'node:http'

const BASE = [
  { id: 1, transformer_id: 'TRX-101', location: 'Sector 7 — Substation A', temperature: 68, load: 0.72, health_status: 'Healthy', failure_probability: 0.08 },
  { id: 2, transformer_id: 'TRX-102', location: 'Sector 7 — Substation B', temperature: 81, load: 0.88, health_status: 'Warning', failure_probability: 0.41 },
  { id: 3, transformer_id: 'TRX-203', location: 'Downtown Grid Node 3', temperature: 94, load: 0.97, health_status: 'Critical', failure_probability: 0.79 },
  { id: 4, transformer_id: 'TRX-118', location: 'Riverside Feeder 2', temperature: 55, load: 0.44, health_status: 'Healthy', failure_probability: 0.05 },
  { id: 5, transformer_id: 'TRX-145', location: 'North Industrial Park', temperature: 77, load: 0.81, health_status: 'Warning', failure_probability: 0.36 },
  { id: 6, transformer_id: 'TRX-089', location: 'Harbor District Line 1', temperature: 62, load: 0.58, health_status: 'Healthy', failure_probability: 0.11 },
  { id: 7, transformer_id: 'TRX-212', location: 'Central Business District', temperature: 89, load: 0.93, health_status: 'Critical', failure_probability: 0.85 },
  { id: 8, transformer_id: 'TRX-134', location: 'West End Substation', temperature: 71, load: 0.66, health_status: 'Healthy', failure_probability: 0.14 },
]

function jitter(base) {
  return base.map((t) => ({
    ...t,
    temperature: Math.round((t.temperature + (Math.random() * 4 - 2)) * 10) / 10,
    load: Math.max(0, Math.min(1, t.load + (Math.random() * 0.06 - 0.03))),
    failure_probability: Math.max(0, Math.min(1, t.failure_probability + (Math.random() * 0.04 - 0.02))),
  }))
}

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  if (req.url === '/transformers' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(jitter(BASE)))
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

const PORT = 8000
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Mock GridGuardian backend running at http://127.0.0.1:${PORT}/transformers`)
})
