import React from 'react'
import { motion } from 'framer-motion'

export default function StatCard({ label, value, bgClass, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`glass ${bgClass}`}
      style={{
        borderRadius: 18,
        padding: '20px 22px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
      }}
    >
      <div className="glass-hairline" />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 10 }}>
            {label}
          </p>
          <p style={{ fontSize: 34, fontWeight: 700, fontFamily: 'var(--font-display)', lineHeight: 1 }}>
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  )
}