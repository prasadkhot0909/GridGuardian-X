import React, { useMemo } from 'react'
import StatCard from './StatCard.jsx'
import { normalizeStatus } from '../utils/format.js'
import CardSkeleton from './Skeletons.jsx'

export default function StatsGrid({ transformers, isLoading }) {
  const counts = useMemo(() => {
    const c = { total: transformers.length, healthy: 0, warning: 0, critical: 0 }
    transformers.forEach((t) => {
      const s = normalizeStatus(t.health_status)
      if (s === 'healthy') c.healthy += 1
      else if (s === 'warning') c.warning += 1
      else if (s === 'critical') c.critical += 1
    })
    return c
  }, [transformers])

  if (isLoading) {
    return (
      <div className="stats-grid">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="glass" style={{ borderRadius: 18, padding: 22, height: 104 }}>
            <CardSkeleton lines={2} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="stats-grid">
      <StatCard label="Total Units" value={counts.total} bgClass="bg-units" delay={0} />
      <StatCard label="Healthy" value={counts.healthy} bgClass="bg-healthy" delay={0.05} />
      <StatCard label="Warning" value={counts.warning} bgClass="bg-warning" delay={0.1} />
      <StatCard label="Critical" value={counts.critical} bgClass="bg-critical" delay={0.15} />
    </div>
  )
}