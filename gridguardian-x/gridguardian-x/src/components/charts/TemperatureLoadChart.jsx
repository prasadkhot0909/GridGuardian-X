import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import './chartSetup.js'
import { CHART_COLORS, tooltipTheme } from './chartSetup.js'
const MAX_UNITS = 8

export default function TemperatureLoadChart({ transformers }) {
  const top = useMemo(
    () =>
      [...transformers]
        .sort((a, b) => Number(b.temperature ?? 0) - Number(a.temperature ?? 0))
        .slice(0, MAX_UNITS),
    [transformers]
  )

  const data = {
    labels: top.map((t) => t.transformer_id ?? `#${t.id}`),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: top.map((t) => Number(t.temperature ?? 0)),
        backgroundColor: 'rgba(59, 130, 246, 0.65)',
        hoverBackgroundColor: CHART_COLORS.blue,
        borderRadius: 6,
        maxBarThickness: 22,
        yAxisID: 'y',
      },
      {
        label: 'Load (%)',
        data: top.map((t) => {
          const n = Number(t.load ?? 0)
          return n <= 1 ? n * 100 : n
        }),
        backgroundColor: 'rgba(34, 211, 238, 0.55)',
        hoverBackgroundColor: CHART_COLORS.cyan,
        borderRadius: 6,
        maxBarThickness: 22,
        yAxisID: 'y1',
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { usePointStyle: true, pointStyle: 'rectRounded', padding: 14, font: { size: 11 } },
      },
      tooltip: tooltipTheme,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'JetBrains Mono', monospace", size: 10 }, maxRotation: 0, autoSkip: true },
      },
      y: {
        position: 'left',
        grid: { color: CHART_COLORS.grid },
        ticks: { font: { size: 10 }, callback: (v) => `${v}°` },
        title: { display: false },
      },
      y1: {
        position: 'right',
        min: 0,
        max: 100,
        grid: { display: false },
        ticks: { font: { size: 10 }, callback: (v) => `${v}%` },
      },
    },
  }

  return <Bar data={data} options={options} />
}
