import React from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

const FILTERS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' },
]

export default function SearchFilterBar({ query, onQueryChange, statusFilter, onStatusFilterChange, resultCount }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}
    >
      <div style={{ display: 'flex', gap: 12, flex: 1, minWidth: 260, flexWrap: 'wrap' }}>
        <div className="field" style={{ flex: 1, minWidth: 220 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search by transformer ID or location…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            aria-label="Search transformers"
          />
        </div>

        <div className="field" style={{ width: 190 }}>
          <SlidersHorizontal size={15} color="var(--text-muted)" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            aria-label="Filter by health status"
          >
            {FILTERS.map((f) => (
              <option key={f.value} value={f.value} style={{ background: '#0a1020' }}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <span className="mono text-muted" style={{ fontSize: 12, whiteSpace: 'nowrap' }}>
        {resultCount} unit{resultCount === 1 ? '' : 's'} shown
      </span>
    </div>
  )
}
