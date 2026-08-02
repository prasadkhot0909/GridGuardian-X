import React from 'react'

export default function CardSkeleton({ lines = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton"
          style={{ height: i === 0 ? 20 : 14, width: i === 0 ? '55%' : `${85 - i * 10}%` }}
        />
      ))}
    </div>
  )
}

export function TransformerCardSkeleton() {
  return (
    <div className="glass" style={{ borderRadius: 18, padding: 20, height: 240 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
        <div className="skeleton" style={{ height: 18, width: '40%' }} />
        <div className="skeleton" style={{ height: 22, width: 70, borderRadius: 999 }} />
      </div>
      <div className="skeleton" style={{ height: 13, width: '60%', marginBottom: 22 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div className="skeleton" style={{ height: 46, borderRadius: 10 }} />
        <div className="skeleton" style={{ height: 46, borderRadius: 10 }} />
      </div>
      <div className="skeleton" style={{ height: 10, width: '30%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 8, width: '100%', borderRadius: 999 }} />
    </div>
  )
}

export function ChartSkeleton({ height = 260 }) {
  return (
    <div className="glass" style={{ borderRadius: 18, padding: 20, height }}>
      <div className="skeleton" style={{ height: 14, width: '35%', marginBottom: 20 }} />
      <div className="skeleton" style={{ height: height - 90, width: '100%', borderRadius: 12 }} />
    </div>
  )
}
