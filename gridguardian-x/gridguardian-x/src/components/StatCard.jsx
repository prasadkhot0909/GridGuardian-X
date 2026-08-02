import React from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ icon: Icon, label, value, accent, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="glass"
      style={{
        borderRadius: 18,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}33, 0 20px 40px -20px ${accent}44`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div className="glass-hairline" />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 110,
          height: 110,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}26, transparent 70%)`,
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <p className="eyebrow" style={{ color: 'var(--text-muted)', marginBottom: 10 }}>
            {label}
          </p>
          <p style={{ fontSize: 34, fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
            {value}
          </p>
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 13,
            display: 'grid',
            placeItems: 'center',
            background: `${accent}18`,
            border: `1px solid ${accent}3d`,
          }}
        >
          <Icon size={20} color={accent} strokeWidth={2.1} />
        </div>
      </div>
    </motion.div>
  )
}
