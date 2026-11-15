import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Users, AlertTriangle } from 'lucide-react';
import { normalizeStatus } from '../utils/format.js';

export default function MapModal({ isOpen, onClose, transformer }) {
  if (!transformer) return null;

  const status = normalizeStatus(transformer.health_status);
  
  const STATUS_THEME = {
    healthy: { border: 'rgba(52, 211, 153, 0.8)', bg: 'rgba(52, 211, 153, 0.1)', glow: '0 0 30px rgba(52, 211, 153, 0.4)' },
    warning: { border: 'rgba(251, 191, 36, 0.8)', bg: 'rgba(251, 191, 36, 0.1)', glow: '0 0 40px rgba(251, 191, 36, 0.5)' },
    critical: { border: 'rgba(251, 113, 133, 0.9)', bg: 'rgba(251, 113, 133, 0.15)', glow: '0 0 50px rgba(251, 113, 133, 0.6)' },
  };

  const theme = STATUS_THEME[status] || STATUS_THEME.healthy;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* Dark Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass"
            style={{
              position: 'relative',
              width: '90%',
              maxWidth: '700px',
              padding: '30px',
              borderRadius: '24px',
              zIndex: 10000,
              border: `1px solid ${theme.border}`,
              backgroundColor: '#ffffff',
              boxShadow: theme.glow
            }}
          >
            <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: '#f1f5f9', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer' }}>
              <X color="#64748b" size={20} />
            </button>

            <h2 className="mono" style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 5 }}>Grid Zone Map</h2>
            <p style={{ color: '#64748b', marginBottom: 20 }}>{transformer.transformer_id} Coverage Area</p>

            {/* Stylized Grid Simulator */}
            <div 
              style={{
                height: '250px',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.1)',
                background: `radial-gradient(circle at center, ${theme.bg} 0%, rgba(241,245,249,1) 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: 24
              }}
            >
              {/* Animated Map Pulse */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: theme.border,
                  filter: 'blur(40px)'
                }}
              />
              <div style={{ zIndex: 10, textAlign: 'center' }}>
                <Map size={48} color={theme.border} style={{ margin: '0 auto', marginBottom: 10 }} />
                <span className="mono" style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>
                  {transformer.service_zone || "Sector Data Unavailable"}
                </span>
              </div>
            </div>

            {/* Impact Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: '#64748b' }}>
                  <Users size={16} /> <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Impact Radius</span>
                </div>
                <p className="mono" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a' }}>{transformer.customers_impacted?.toLocaleString() || 0} Customers</p>
              </div>

              {status !== 'healthy' && (
                <div style={{ padding: '16px', background: theme.bg, borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, color: theme.border }}>
                    <AlertTriangle size={16} /> <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action Required</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#0f172a', margin: 0 }}>Dispatch maintenance to <b>{transformer.service_zone}</b> immediately.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}