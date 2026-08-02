import axios from 'axios'

export const API_BASE_URL = 'http://127.0.0.1:8000'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
})

/**
 * Fetches the live transformer fleet from the GridGuardian backend.
 * Returns the raw array of transformer records.
 */
export async function fetchTransformers(signal) {
  const response = await apiClient.get('/transformers', { signal })
  return Array.isArray(response.data) ? response.data : response.data?.transformers ?? []
}
