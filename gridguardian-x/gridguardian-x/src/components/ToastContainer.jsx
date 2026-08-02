import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
}

const ACCENTS = {
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--critical)',
  info: 'var(--cyan)',
}

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: 'min(360px, calc(100vw - 32px))',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info
          const accent = ACCENTS[toast.type] || ACCENTS.info
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.18 } }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              className="glass"
              style={{
                padding: '13px 14px',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                borderLeft: `2px solid ${accent}`,
                boxShadow: `0 10px 30px -12px rgba(0,0,0,0.6), 0 0 24px -8px ${accent}55`,
              }}
            >
              <Icon size={18} color={accent} style={{ marginTop: 1, flexShrink: 0 }} />
              <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
                {toast.message}
              </p>
              <button
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  padding: 2,
                  display: 'flex',
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
