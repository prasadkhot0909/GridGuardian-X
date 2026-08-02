import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchTransformers } from '../api/client.js'
import { useToast } from '../context/ToastContext.jsx'

const POLL_INTERVAL_MS = 5000

/**
 * Polls GET /transformers every 5s.
 * Exposes: transformers, isLoading (first load only), isRefreshing,
 * backendOnline, lastUpdated, error, and a manual refresh() trigger.
 */
export function useTransformers() {
  const [transformers, setTransformers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [backendOnline, setBackendOnline] = useState(null) // null = unknown yet
  const [lastUpdated, setLastUpdated] = useState(null)
  const [error, setError] = useState(null)

  const { pushToast } = useToast()
  const wasOnlineRef = useRef(null)
  const hasLoadedOnceRef = useRef(false)

  const load = useCallback(async (signal) => {
    if (hasLoadedOnceRef.current) setIsRefreshing(true)
    try {
      const data = await fetchTransformers(signal)
      setTransformers(data)
      setBackendOnline(true)
      setLastUpdated(new Date())
      setError(null)

      if (wasOnlineRef.current === false) {
        pushToast('Backend connection restored. Live data streaming.', { type: 'success' })
      }
      wasOnlineRef.current = true
    } catch (err) {
      if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError') return
      setBackendOnline(false)
      setError(err?.message || 'Unable to reach GridGuardian backend')

      if (wasOnlineRef.current !== false) {
        pushToast('Backend unavailable. Retrying every 5 seconds…', { type: 'error', duration: 5000 })
      }
      wasOnlineRef.current = false
    } finally {
      hasLoadedOnceRef.current = true
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [pushToast])

  useEffect(() => {
    const controller = new AbortController()
    load(controller.signal)

    const intervalId = setInterval(() => load(controller.signal), POLL_INTERVAL_MS)

    return () => {
      controller.abort()
      clearInterval(intervalId)
    }
  }, [load])

  const refresh = useCallback(() => {
    const controller = new AbortController()
    load(controller.signal)
  }, [load])

  return { transformers, isLoading, isRefreshing, backendOnline, lastUpdated, error, refresh }
}
