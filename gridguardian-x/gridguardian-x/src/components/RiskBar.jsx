import React from 'react'
import { motion } from 'framer-motion'
import { riskTier } from '../utils/format.js'

const TIER_COLOR = {
  healthy: 'var(--success)',
  warning: 'var(--warning)',
  critical: 'var(--critical)',
}

export default function RiskBar({ percent }) {
  const tier = riskTier(percent)
  const color = TIER_COLOR[tier]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span className="eyebrow" style={{ color: 'var(--text-muted)' }}>
          AI Failure Risk
        </span>
        <span className="mono" style={{ fontSize: 12.5, fontWeight: 700, color }}>
          {percent.toFixed(1)}%
        </span>
      </div>
      <div
        style={{
          height: 7,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.06)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: 999,
            background: `linear-gradient(90deg, ${color}99, ${color})`,
            boxShadow: `0 0 10px ${color}88`,
          }}
        />
      </div>
    </div>
  )
}
