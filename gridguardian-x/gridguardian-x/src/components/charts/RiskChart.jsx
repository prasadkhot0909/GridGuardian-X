import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import './chartSetup.js'
import { CHART_COLORS, tooltipTheme } from './chartSetup.js'
import { toRiskPercent, riskTier } from '../../utils/format.js'

const MAX_UNITS = 8

const TIER_COLOR = {
  healthy: CHART_COLORS.success,
  warning: CHART_COLORS.warning,
  critical: CHART_COLORS.critical,
}

export default function RiskChart({ transformers }) {
  const ranked = useMemo(
    () =>
      [...transformers]
        .map((t) => ({ ...t, __risk: toRiskPercent(t.failure_probability) }))
        .sort((a, b) => b.__risk - a.__risk)
        .slice(0, MAX_UNITS),
    [transformers]
  )

  const data = {
    labels: ranked.map((t) => t.transformer_id ?? `#${t.id}`),
    datasets: [
      {
        label: 'Failure Risk (%)',
        data: ranked.map((t) => t.__risk),
        backgroundColor: ranked.map((t) => `${TIER_COLOR[riskTier(t.__risk)]}cc`),
        hoverBackgroundColor: ranked.map((t) => TIER_COLOR[riskTier(t.__risk)]),
        borderRadius: 6,
        maxBarThickness: 16,
      },
    ],
  }

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        ...tooltipTheme,
        callbacks: { label: (ctx) => ` Risk: ${ctx.raw.toFixed(1)}%` },
      },
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: { color: CHART_COLORS.grid },
        ticks: { font: { size: 10 }, callback: (v) => `${v}%` },
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: "'JetBrains Mono', monospace", size: 10.5 } },
      },
    },
  }

  return <Bar data={data} options={options} />
}
