import React, { useMemo } from 'react'
import { Boxes, ShieldCheck, TriangleAlert, OctagonAlert } from 'lucide-react'
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
      <StatCard icon={Boxes} label="Total Units" value={counts.total} accent="var(--blue)" delay={0} />
      <StatCard icon={ShieldCheck} label="Healthy" value={counts.healthy} accent="var(--success)" delay={0.05} />
      <StatCard icon={TriangleAlert} label="Warning" value={counts.warning} accent="var(--warning)" delay={0.1} />
      <StatCard icon={OctagonAlert} label="Critical" value={counts.critical} accent="var(--critical)" delay={0.15} />
    </div>
  )
}
