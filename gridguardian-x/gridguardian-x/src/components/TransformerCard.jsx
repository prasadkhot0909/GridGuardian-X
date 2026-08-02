import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Thermometer, Gauge } from 'lucide-react'
import StatusBadge from './StatusBadge.jsx'
import RiskBar from './RiskBar.jsx'
import { formatTemp, formatLoad, toRiskPercent, normalizeStatus } from '../utils/format.js'

const STATUS_GLOW = {
  healthy: 'rgba(52, 211, 153, 0.35)',
  warning: 'rgba(251, 191, 36, 0.35)',
  critical: 'rgba(251, 113, 133, 0.4)',
  unknown: 'rgba(148, 163, 184, 0.25)',
}

export default function TransformerCard({ transformer, index }) {
  const status = normalizeStatus(transformer.health_status)
  const risk = toRiskPercent(transformer.failure_probability)
  const glow = STATUS_GLOW[status]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.3), ease: 'easeOut' }}
      whileHover={{ y: -5 }}
      className="glass"
      style={{
        borderRadius: 18,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 0 0 var(--glass-highlight) inset, 0 20px 44px -18px ${glow}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div className="glass-hairline" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div>
          <h3 className="mono" style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: '0.01em' }}>
            {transformer.transformer_id ?? `UNIT-${transformer.id}`}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
            <MapPin size={12.5} color="var(--text-muted)" />
            <span className="text-secondary" style={{ fontSize: 12.5 }}>
              {transformer.location || 'Location unknown'}
            </span>
          </div>
        </div>
        <StatusBadge status={transformer.health_status} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '18px 0' }}>
        <MetricTile icon={Thermometer} label="Temperature" value={formatTemp(transformer.temperature)} accent="var(--blue-deep)" />
        <MetricTile icon={Gauge} label="Load" value={formatLoad(transformer.load)} accent="var(--cyan)" />
      </div>

      <RiskBar percent={risk} />
    </motion.div>
  )
}

function MetricTile({ icon: Icon, label, value, accent }) {
  return (
    <div
      style={{
        borderRadius: 12,
        padding: '10px 12px',
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid var(--glass-border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <Icon size={12.5} color={accent} />
        <span style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {label}
        </span>
      </div>
      <p className="mono" style={{ fontSize: 16, fontWeight: 600 }}>
        {value}
      </p>
    </div>
  )
}
