/**
 * Normalizes health_status values from the backend into one of
 * 'healthy' | 'warning' | 'critical' | 'unknown'.
 */
export function normalizeStatus(status) {
  if (!status) return 'unknown'
  const s = String(status).trim().toLowerCase()
  if (s.includes('crit')) return 'critical'
  if (s.includes('warn')) return 'warning'
  if (s.includes('health') || s.includes('ok') || s.includes('normal')) return 'healthy'
  return 'unknown'
}

export const STATUS_META = {
  healthy: { label: 'Healthy', color: 'var(--success)' },
  warning: { label: 'Warning', color: 'var(--warning)' },
  critical: { label: 'Critical', color: 'var(--critical)' },
  unknown: { label: 'Unknown', color: 'var(--text-secondary)' },
}

/** Converts a failure_probability field (0–1 or 0–100) into a clamped 0–100 percentage. */
export function toRiskPercent(failureProbability) {
  if (failureProbability === null || failureProbability === undefined || Number.isNaN(Number(failureProbability))) {
    return 0
  }
  const n = Number(failureProbability)
  const pct = n <= 1 ? n * 100 : n
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10))
}

export function riskTier(pct) {
  if (pct >= 66) return 'critical'
  if (pct >= 33) return 'warning'
  return 'healthy'
}

export function formatTemp(temp) {
  if (temp === null || temp === undefined || Number.isNaN(Number(temp))) return '—'
  return `${Number(temp).toFixed(1)}°C`
}

export function formatLoad(load) {
  if (load === null || load === undefined || Number.isNaN(Number(load))) return '—'
  const n = Number(load)
  const pct = n <= 1 ? n * 100 : n
  return `${pct.toFixed(0)}%`
}

export function formatClock(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
