import React, { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import SearchFilterBar from './SearchFilterBar.jsx'
import TransformerCard from './TransformerCard.jsx'
import { TransformerCardSkeleton } from './Skeletons.jsx'
import { BackendOfflineState, NoResultsState } from './EmptyState.jsx'
import { normalizeStatus } from '../utils/format.js'

export default function TransformerGrid({ transformers, isLoading, backendOnline }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transformers.filter((t) => {
      const matchesQuery =
        !q ||
        String(t.transformer_id ?? '').toLowerCase().includes(q) ||
        String(t.location ?? '').toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || normalizeStatus(t.health_status) === statusFilter
      return matchesQuery && matchesStatus
    })
  }, [transformers, query, statusFilter])

  const clearFilters = () => {
    setQuery('')
    setStatusFilter('all')
  }

  if (isLoading) {
    return (
      <section>
        <SectionHeading />
        <div className="transformer-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <TransformerCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  if (backendOnline === false && transformers.length === 0) {
    return (
      <section>
        <SectionHeading />
        <BackendOfflineState />
      </section>
    )
  }

  return (
    <section>
      <SectionHeading />
      <SearchFilterBar
        query={query}
        onQueryChange={setQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        resultCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <NoResultsState onClear={clearFilters} />
      ) : (
        <div className="transformer-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((t, i) => (
              <TransformerCard key={t.id ?? t.transformer_id ?? i} transformer={t} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}

function SectionHeading() {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700 }}>Transformer Fleet</h2>
      <p className="text-muted" style={{ fontSize: 13, marginTop: 2 }}>
        Live health telemetry across all monitored units
      </p>
    </div>
  )
}
