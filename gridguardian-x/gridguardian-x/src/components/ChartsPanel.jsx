import React from 'react'
import { motion } from 'framer-motion'
import { PieChart, Thermometer, ActivitySquare } from 'lucide-react'
import HealthDistributionChart from './charts/HealthDistributionChart.jsx'
import TemperatureLoadChart from './charts/TemperatureLoadChart.jsx'
import RiskChart from './charts/RiskChart.jsx'
import { ChartSkeleton } from './Skeletons.jsx'

function ChartCard({ icon: Icon, title, subtitle, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
      className="glass"
      style={{ borderRadius: 18, padding: 20 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
        <Icon size={16} color="var(--cyan)" />
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 700 }}>{title}</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ height: 210 }}>{children}</div>
    </motion.div>
  )
}

export default function ChartsPanel({ transformers, isLoading, backendOnline }) {
  if (isLoading) {
    return (
      <div className="charts-grid">
        <ChartSkeleton height={300} />
        <ChartSkeleton height={300} />
        <ChartSkeleton height={300} />
      </div>
    )
  }

  if (backendOnline === false && transformers.length === 0) {
    return null
  }

  return (
    <div className="charts-grid">
      <ChartCard icon={PieChart} title="Fleet Health Distribution" subtitle="Live status breakdown" delay={0}>
        <HealthDistributionChart transformers={transformers} />
      </ChartCard>

      <ChartCard icon={Thermometer} title="Temperature vs. Load" subtitle="Top units by temperature" delay={0.06}>
        <TemperatureLoadChart transformers={transformers} />
      </ChartCard>

      <ChartCard icon={ActivitySquare} title="AI Risk Ranking" subtitle="Highest predicted failure risk" delay={0.12}>
        <RiskChart transformers={transformers} />
      </ChartCard>
    </div>
  )
}
