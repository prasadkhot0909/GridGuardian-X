import React, { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import './chartSetup.js'
import { CHART_COLORS, tooltipTheme } from './chartSetup.js'
import { normalizeStatus } from '../../utils/format.js'

export default function HealthDistributionChart({ transformers }) {
  const counts = useMemo(() => {
    const c = { healthy: 0, warning: 0, critical: 0, unknown: 0 }
    transformers.forEach((t) => {
      c[normalizeStatus(t.health_status)] += 1
    })
    return c
  }, [transformers])

  const total = transformers.length

  const data = {
    labels: ['Healthy', 'Warning', 'Critical'],
    datasets: [
      {
        data: [counts.healthy, counts.warning, counts.critical],
        backgroundColor: [CHART_COLORS.success, CHART_COLORS.warning, CHART_COLORS.critical],
        borderColor: '#0a1020',
        borderWidth: 3,
        hoverOffset: 6,
        borderRadius: 4,
        spacing: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: { size: 11.5 },
        },
      },
      tooltip: {
        ...tooltipTheme,
        callbacks: {
          label: (ctx) => ` ${ctx.label}: ${ctx.raw} unit${ctx.raw === 1 ? '' : 's'}`,
        },
      },
    },
  }

  return (
    <div style={{ position: 'relative', height: 190 }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '42%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div className="mono" style={{ fontSize: 24, fontWeight: 700 }}>
          {total}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>UNITS</div>
      </div>
    </div>
  )
}
