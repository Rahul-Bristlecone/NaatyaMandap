import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getProfileBySlug } from '../services/apiClient'

function humanizeSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ')
}

function toSlug(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function valueOrNA(value) {
  return value && String(value).trim() ? value : 'NA'
}

function renderPersonLinks(value) {
  const safeValue = valueOrNA(value)
  if (safeValue === 'NA') {
    return 'NA'
  }

  return safeValue
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((person, idx, arr) => (
      <span key={`${person}-${idx}`}>
        <Link to={`/profile/${toSlug(person)}?name=${encodeURIComponent(person)}`} className="movie-name-link">
          {person}
        </Link>
        {idx < arr.length - 1 ? ', ' : ''}
      </span>
    ))
}

function renderCareerItems(items) {
  if (!items?.length) {
    return (
      <li className="profile-career-item">
        <span>NA</span>
      </li>
    )
  }

  const normalized = items.map((item) => {
    const title = typeof item === 'string' ? item : item.title
    const year = typeof item === 'string' ? null : Number(item.year)
    const rolesRaw = typeof item === 'string' ? ['NA'] : (Array.isArray(item.roles) ? item.roles : [item.role || 'NA'])
    const roles = rolesRaw
      .flatMap((role) => String(role).split(','))
      .map((role) => role.trim())
      .filter(Boolean)

    return {
      title,
      year: Number.isFinite(year) ? year : null,
      roles,
    }
  })

  const sorted = normalized.sort((a, b) => {
    const yearA = a.year ?? 0
    const yearB = b.year ?? 0
    return yearB - yearA
  })

  return sorted.map(({ title, year, roles }) => {
    const yearLabel = year || 'NA'

    return (
      <li key={`${title}-${yearLabel}-${roles.join('|')}`} className="profile-career-item">
        <span className="profile-career-title-wrap">
          <Link to={`/movie/${toSlug(title)}`} className="movie-name-link">
            {title || 'NA'}
          </Link>
          <span className="profile-career-year">({yearLabel})</span>
        </span>
        <span className="profile-career-roles">
          {roles.map((role) => (
            <span key={`${title}-${role}`} className="profile-career-role">{role}</span>
          ))}
        </span>
      </li>
    )
  })
}

export default function ProfilePage() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const displayName = useMemo(() => {
    const fromQuery = searchParams.get('name')
    if (fromQuery) {
      return fromQuery
    }

    return slug ? humanizeSlug(slug) : 'Profile'
  }, [searchParams, slug])

  useEffect(() => {
    let active = true

    const load = async () => {
      const data = await getProfileBySlug(slug, displayName)
      if (active) {
        setProfile(data)
        setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [displayName, slug])

  const dobLabel = useMemo(() => {
    if (!profile?.dateOfBirth) {
      return 'NA'
    }

    const parsed = new Date(profile.dateOfBirth)
    if (Number.isNaN(parsed.getTime())) {
      return profile.dateOfBirth
    }

    const formatted = parsed.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })

    return profile?.age ? `${formatted} (${profile.age})` : formatted
  }, [profile])

  if (loading) {
    return (
      <section className="page-block profile-page">
        <p>Loading profile...</p>
      </section>
    )
  }

  if (!profile) {
    return (
      <section className="page-block profile-page">
        <header className="page-head">
          <h2>Profile not found</h2>
          <p>The requested profile is not available yet.</p>
        </header>
        <Link to="/" className="side-card-cta">Return to home →</Link>
      </section>
    )
  }

  return (
    <section className="page-block profile-page">
      <header className="profile-hero-block">
        <div className="profile-hero-title">
          <h2>{profile.name || displayName}</h2>
          <span className="profile-role-pill">{profile.role || 'Artist'}</span>
        </div>
      </header>

      <section className="profile-specs-block">
        <div className="profile-specs-copy">
          <h3>Personal Specifications</h3>
          <div className="profile-specs-grid">
            <p><strong>Name</strong><span>{valueOrNA(profile.name || displayName)}</span></p>
            <p><strong>Nickname</strong><span>{valueOrNA(profile.nickname)}</span></p>
            <p><strong>Date of Birth</strong><span>{dobLabel}</span></p>
            <p><strong>Birthplace</strong><span>{valueOrNA(profile.birthplace)}</span></p>
            <p><strong>Education</strong><span className="profile-education-lines"><span>{valueOrNA(profile.education?.school)}</span><span>{valueOrNA(profile.education?.college)}</span><span>{valueOrNA(profile.education?.higherEducation)}</span></span></p>
            <p><strong>Religion</strong><span>{valueOrNA(profile.religion)}</span></p>
            <p><strong>Nationality</strong><span>{valueOrNA(profile.nationality)}</span></p>
            <p><strong>Marital Status</strong><span>{valueOrNA(profile.maritalStatus)}</span></p>
            <p><strong>Parents</strong><span>{renderPersonLinks(profile.parents)}</span></p>
            <p><strong>Siblings</strong><span>{renderPersonLinks(profile.siblings)}</span></p>
          </div>
        </div>

        <aside className="profile-poster-panel" aria-label="Star poster">
          <div className="profile-poster-art" role="img" aria-label={`${profile.name || displayName} poster`} />
        </aside>
      </section>

      <section className="profile-career-block">
        <h3>Career</h3>
        <div className="profile-career-grid">
          <div className="profile-career-column">
            <h4>Movies</h4>
            <ul>
              {renderCareerItems(profile.movieCareer)}
            </ul>
          </div>
          <div className="profile-career-column">
            <h4>OTT</h4>
            <ul>
              {renderCareerItems(profile.ottCareer)}
            </ul>
          </div>
        </div>
      </section>

      <section className="profile-awards-block">
        <h3>Awards, Achievements and Recognitions</h3>
        <ul>
          {(profile.awards || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </section>
  )
}
