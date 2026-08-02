import React from 'react'
import { motion } from 'framer-motion'
import { Zap, RefreshCw } from 'lucide-react'
import { useClock } from '../hooks/useClock.js'
import { formatClock, formatDate } from '../utils/format.js'

export default function Header({ backendOnline, isRefreshing, lastUpdated }) {
  const now = useClock()

  const statusLabel =
    backendOnline === null ? 'Connecting…' : backendOnline ? 'Backend Online' : 'Backend Offline'
  const statusColor =
    backendOnline === null ? 'var(--offline)' : backendOnline ? 'var(--success)' : 'var(--critical)'

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 30,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: 14 }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(145deg, rgba(34,211,238,0.16), rgba(59,130,246,0.08))',
            border: '1px solid var(--glass-border-strong)',
            boxShadow: 'var(--shadow-glow-cyan)',
          }}
        >
          <Zap size={24} color="var(--cyan)" strokeWidth={2.2} />
        </div>
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="gradient-text">GridGuardian</span>{' '}
            <span style={{ color: 'var(--cyan)' }}>X</span>
          </h1>
          <p className="eyebrow" style={{ marginTop: 4 }}>
            AI Transformer Intelligence Network
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}
      >
        <div className="glass" style={{ padding: '10px 18px', borderRadius: 12, textAlign: 'right' }}>
          <div className="mono" style={{ fontSize: 19, fontWeight: 600, letterSpacing: '0.02em' }}>
            {formatClock(now)}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 1 }}>
            {formatDate(now)}
          </div>
        </div>

        <div
          className="glass"
          style={{
            padding: '10px 16px',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
          }}
          role="status"
          aria-live="polite"
        >
          <span className="dot dot--pulse" style={{ background: statusColor }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: statusColor }}>{statusLabel}</span>
          {isRefreshing && backendOnline && (
            <RefreshCw size={13} className="mono" color="var(--text-muted)" style={{ animation: 'spin 0.9s linear infinite' }} />
          )}
        </div>

        {lastUpdated && (
          <span className="mono text-muted" style={{ fontSize: 11.5 }}>
            SYNC {formatClock(lastUpdated)}
          </span>
        )}
      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </header>
  )
}
