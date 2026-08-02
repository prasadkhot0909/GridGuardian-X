import React from 'react'
import { motion } from 'framer-motion'
import { SatelliteDish, SearchX } from 'lucide-react'

export function BackendOfflineState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass"
      style={{
        borderRadius: 20,
        padding: '64px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 18,
          display: 'grid',
          placeItems: 'center',
          background: 'var(--critical-soft)',
          border: '1px solid rgba(251,113,133,0.3)',
        }}
      >
        <SatelliteDish size={28} color="var(--critical)" />
      </div>
      <h3 style={{ fontSize: 19, fontWeight: 700 }}>Connection to substation network lost</h3>
      <p className="text-secondary" style={{ maxWidth: 420, fontSize: 14, lineHeight: 1.6 }}>
        GridGuardian X can't reach the backend at{' '}
        <code className="mono" style={{ color: 'var(--cyan-soft)' }}>
          127.0.0.1:8000
        </code>
        . Start the API server — the dashboard will reconnect automatically every 5 seconds.
      </p>
    </motion.div>
  )
}

export function NoResultsState({ onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass"
      style={{
        borderRadius: 20,
        padding: '56px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <SearchX size={32} color="var(--text-muted)" />
      <h3 style={{ fontSize: 17, fontWeight: 700 }}>No transformers match your filters</h3>
      <p className="text-secondary" style={{ fontSize: 13.5 }}>
        Try a different search term or reset the status filter.
      </p>
      <button
        onClick={onClear}
        className="icon-btn"
        style={{ width: 'auto', padding: '8px 16px', borderRadius: 10, fontSize: 13, marginTop: 4 }}
      >
        Clear filters
      </button>
    </motion.div>
  )
}
