import React from 'react'
import { ShieldCheck, TriangleAlert, OctagonAlert, HelpCircle } from 'lucide-react'
import { normalizeStatus, STATUS_META } from '../utils/format.js'

const ICONS = {
  healthy: ShieldCheck,
  warning: TriangleAlert,
  critical: OctagonAlert,
  unknown: HelpCircle,
}

export default function StatusBadge({ status }) {
  const key = normalizeStatus(status)
  const Icon = ICONS[key]
  const meta = STATUS_META[key]

  return (
    <span className={`badge badge--${key}`}>
      <Icon size={12} strokeWidth={2.4} />
      {meta.label}
    </span>
  )
}
