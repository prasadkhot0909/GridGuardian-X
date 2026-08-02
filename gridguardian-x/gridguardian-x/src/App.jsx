import React from 'react'
import { motion } from 'framer-motion'
import BackgroundFX from './components/BackgroundFX.jsx'
import Header from './components/Header.jsx'
import StatsGrid from './components/StatsGrid.jsx'
import ChartsPanel from './components/ChartsPanel.jsx'
import TransformerGrid from './components/TransformerGrid.jsx'
import { useTransformers } from './hooks/useTransformers.js'

export default function App() {
  const { transformers, isLoading, isRefreshing, backendOnline, lastUpdated } = useTransformers()

  return (
    <>
      <BackgroundFX />
      <div className="app-shell">
        <Header backendOnline={backendOnline} isRefreshing={isRefreshing} lastUpdated={lastUpdated} />

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{ marginBottom: 28 }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)', maxWidth: 640, lineHeight: 1.6 }}>
            Autonomous, real-time surveillance of every transformer on the grid — powered by predictive
            failure modeling and continuous telemetry sync.
          </h2>
        </motion.section>

        <StatsGrid transformers={transformers} isLoading={isLoading} />
        <ChartsPanel transformers={transformers} isLoading={isLoading} backendOnline={backendOnline} />
        <TransformerGrid transformers={transformers} isLoading={isLoading} backendOnline={backendOnline} />

        <footer style={{ marginTop: 60, textAlign: 'center' }}>
          <p className="mono text-muted" style={{ fontSize: 11 }}>
            GRIDGUARDIAN X · AI GRID INTELLIGENCE · REFRESH INTERVAL 5S
          </p>
        </footer>
      </div>
    </>
  )
}
