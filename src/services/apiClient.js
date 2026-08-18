import { mockData, sectionConfig } from '../data/mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
const useMocks = import.meta.env.VITE_USE_MOCKS !== 'false'
const DEFAULT_MOVIE_RELEASE_TYPE = 'Digital / Theatrical'

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

function flattenSectionItems() {
  return Object.entries(mockData)
    .filter(([, value]) => Array.isArray(value))
    .flatMap(([, value]) => value)
}

function humanizeSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
}

function toReviewPayload(item) {
  const numericScore = item?.starRating ?? item?.nmScore ?? item?.score ?? item?.rating ?? null
  const starRating = numericScore === null ? 3 : Number((numericScore > 5 ? numericScore / 2 : numericScore).toFixed(1))
  const releaseType = item?.releaseType || DEFAULT_MOVIE_RELEASE_TYPE

  return {
    id: item?.id,
    title: item?.title || item?.name || item?.album || 'Untitled Movie',
    starRating,
    genre: item?.genre || item?.genres || 'Drama',
    releaseType,
    ottPlatform: item?.ottPlatform || item?.platform || (releaseType === 'Digital' ? 'Netflix' : 'N/A'),
    reviewer: item?.reviewer || item?.critic || 'Sangeeta Sharma',
    director: item?.director || 'To be announced',
    writers: item?.writers || 'To be announced',
    music: item?.music || 'To be announced',
    producers: item?.producers || item?.producer || 'To be announced',
    editor: item?.editor || 'To be announced',
    cast: item?.cast || 'Cast details to be updated',
    certification: item?.certification || 'U/A (13+)',
    distributedBy: item?.distributedBy || item?.distributor || item?.distribution || 'TBA',
    budget: item?.budget || item?.productionBudget || 'TBA',
    collection: item?.collection || item?.boxOffice || item?.boxOfficeCollection || 'TBA',
    runningTime: item?.runningTime || item?.runtime || item?.duration || 'TBA',
    releaseDate: item?.releaseDate || 'TBA',
    reviewSummary:
      item?.reviewSummary ||
      item?.summary ||
      item?.verdict ||
      'An engaging film with a clear identity and enough craft to stay memorable.',
    reviewText:
      item?.reviewText ||
      `${item?.title || item?.name || 'This film'} balances familiar ideas with fresh execution. The pacing is mostly steady, performances hold attention, and the emotional beats land at key moments. This mock review text is currently placeholder content and will be replaced by backend editorial data.`,
  }
}

export async function getMovieReviewById(movieId) {
  if (!movieId) {
    return null
  }

  if (useMocks) {
    const directReview = mockData.movieReviewsById?.[movieId]
    if (directReview) {
      return {
        ...directReview,
        releaseType: DEFAULT_MOVIE_RELEASE_TYPE,
      }
    }

    const allItems = flattenSectionItems()
    const matched = allItems.find((entry) => entry?.id === movieId)
    return matched ? toReviewPayload(matched) : null
  }

  try {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}/review`)
    if (!response.ok) {
      throw new Error(`Movie review request failed with status ${response.status}`)
    }

    const payload = await response.json()
    if (payload?.data) {
      return payload.data
    }
  } catch (error) {
    console.warn('Using mock fallback for movie review:', error)
  }

  const directReview = mockData.movieReviewsById?.[movieId]
  if (directReview) {
    return {
      ...directReview,
      releaseType: DEFAULT_MOVIE_RELEASE_TYPE,
    }
  }

  const allItems = flattenSectionItems()
  const matched = allItems.find((entry) => entry?.id === movieId)
  if (matched) {
    return toReviewPayload(matched)
  }

  return toReviewPayload({
    id: movieId,
    title: humanizeSlug(movieId),
  })
}

function calculateAge(dateOfBirth) {
  if (!dateOfBirth) {
    return null
  }

  const dob = new Date(dateOfBirth)
  if (Number.isNaN(dob.getTime())) {
    return null
  }

  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age -= 1
  }

  return age
}

function toProfilePayload(slug, name) {
  return {
    slug,
    name: name || 'Profile Name',
    role: 'Artist',
    nickname: 'NA',
    dateOfBirth: '',
    age: null,
    birthplace: 'NA',
    education: {
      school: 'NA',
      college: 'NA',
      higherEducation: 'NA',
    },
    religion: 'NA',
    nationality: 'NA',
    maritalStatus: 'NA',
    parents: 'NA',
    siblings: 'NA',
    ottCareer: [{ title: 'NA', role: 'NA', year: null }],
    movieCareer: [{ title: 'NA', role: 'NA', year: null }],
    awards: ['Awards, achievements and recognitions will be added from backend'],
  }
}

export async function getProfileBySlug(slug, name) {
  if (!slug) {
    return null
  }

  if (useMocks) {
    const profile = mockData.profilesBySlug?.[slug]
    if (profile) {
      return {
        ...profile,
        age: profile.age ?? calculateAge(profile.dateOfBirth),
      }
    }

    return toProfilePayload(slug, name)
  }

  try {
    const response = await fetch(`${API_BASE_URL}/profiles/${slug}`)
    if (!response.ok) {
      throw new Error(`Profile request failed with status ${response.status}`)
    }

    const payload = await response.json()
    if (payload?.data) {
      return {
        ...payload.data,
        age: payload.data.age ?? calculateAge(payload.data.dateOfBirth),
      }
    }
  } catch (error) {
    console.warn('Using mock fallback for profile:', error)
  }

  const profile = mockData.profilesBySlug?.[slug]
  if (profile) {
    return {
      ...profile,
      age: profile.age ?? calculateAge(profile.dateOfBirth),
    }
  }

  return toProfilePayload(slug, name)
}

export function getAvailableYears() {
  return Object.keys(mockData.selectedByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a)
}
