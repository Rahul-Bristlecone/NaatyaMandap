import { mockData, sectionConfig } from '../data/mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false'

async function fetchFromApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }
  if (Array.isArray(payload.data)) {
    return payload.data
  }

  return []
}

async function fetchWithFallback(endpoint, fallbackKey) {
  if (useMocks) {
    return mockData[fallbackKey] ?? []
  }

  try {
    return await fetchFromApi(endpoint)
  } catch (error) {
    console.warn(`Using mock fallback for ${endpoint}:`, error)
    return mockData[fallbackKey] ?? []
  }
}

export async function getSectionData(configKey) {
  const config = sectionConfig[configKey]
  if (!config) {
    throw new Error(`Unknown section key: ${configKey}`)
  }

  return fetchWithFallback(config.endpoint, config.key)
}

export async function getSelectedByYear(year) {
  const selected = Number(year)

  if (useMocks) {
    return mockData.selectedByYear[selected] ?? { movies: [], music: [] }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/selected/${selected}`)
    if (!response.ok) {
      throw new Error(`Selected year request failed with status ${response.status}`)
    }

    const payload = await response.json()
    return payload.data ?? { movies: [], music: [] }
  } catch (error) {
    console.warn('Using mock fallback for selected year:', error)
    return mockData.selectedByYear[selected] ?? { movies: [], music: [] }
  }
}

export function getAvailableYears() {
  return Object.keys(mockData.selectedByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a)
}
