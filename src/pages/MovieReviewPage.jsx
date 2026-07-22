import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getMovieReviewById } from '../services/apiClient'

function Star({ fill = 'transparent', stroke = 'var(--lavender-star-dark)', gradientId = null }) {
  return (
    <svg className="rating-star" viewBox="0 0 24 24" aria-hidden="true">
      {gradientId ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="58%" stopColor="var(--lavender-star-dark)" />
            <stop offset="58%" stopColor="transparent" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d="M12 2.5l2.9 5.88 6.49.94-4.69 4.57 1.11 6.46L12 17.3l-5.81 3.05 1.11-6.46L2.61 9.32l6.49-.94L12 2.5z"
        fill={gradientId ? `url(#${gradientId})` : fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarRating({ value }) {
  const safeValue = Number.isFinite(value) ? Math.max(0, Math.min(5, value)) : 0
  const ratingStamp = String(safeValue).replace('.', '_')

  return (
    <div className="movie-rating" aria-label={`Rating: ${safeValue} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const starNo = idx + 1
        const diff = safeValue - idx

        if (diff >= 1) {
          return <Star key={starNo} fill="var(--lavender-star-dark)" />
        }

        if (diff >= 0.5) {
          return <Star key={starNo} gradientId={`half-star-${starNo}-${ratingStamp}`} />
        }

        return <Star key={starNo} />
      })}
      <span className="rating-value">{safeValue.toFixed(1)}</span>
    </div>
  )
}

function formatDate(dateInput) {
  if (!dateInput || dateInput === 'TBA') {
    return 'TBA'
  }

  const parsed = new Date(dateInput)
  if (Number.isNaN(parsed.getTime())) {
    return dateInput
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function toProfileSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function renderProfileLinks(value) {
  if (!value) {
    return 'To be announced'
  }

  const parts = value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (!parts.length) {
    return value
  }

  return parts.map((name, idx) => (
    <span key={`${name}-${idx}`}>
      <Link to={`/profile/${toProfileSlug(name)}?name=${encodeURIComponent(name)}`} className="movie-name-link">
        {name}
      </Link>
      {idx < parts.length - 1 ? ', ' : ''}
    </span>
  ))
}

function renderGenrePills(value) {
  const parts = (value || 'Drama')
    .split(',')
    .flatMap((part) => part.trim().split(/\s+/))
    .map((part) => part.trim())
    .filter(Boolean)

  return (
    <span className="movie-genre-pills">
      {parts.map((genre) => (
        <span key={genre} className="movie-genre-pill">{genre}</span>
      ))}
    </span>
  )
}

function getCertificationHelp(certification) {
  switch (certification) {
    case 'U':
      return 'Family friendly'
    case 'U/A (7+)':
      return 'Parental guidance for children below the age of 7 years'
    case 'U/A (13+)':
      return 'Parental guidance for children below the age of 13 years'
    case 'U/A (16+)':
      return 'Parental guidance for children below the age of 16 years'
    case 'A (18+)':
      return 'For Adults'
    case 'S':
      return 'Special groups'
    default:
      return 'Certification details unavailable'
  }
}

export default function MovieReviewPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      const data = await getMovieReviewById(movieId)
      if (active) {
        setMovie(data)
        setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [movieId])

  const releaseDate = useMemo(() => formatDate(movie?.releaseDate), [movie?.releaseDate])
  const certification = movie?.certification || 'U/A (13+)'
  const certificationHelp = getCertificationHelp(certification)

  if (loading) {
    return (
      <section className="page-block movie-review-page">
        <p>Loading review...</p>
      </section>
    )
  }

  if (!movie) {
    return (
      <section className="page-block movie-review-page">
        <header className="page-head">
          <h2>Review not found</h2>
          <p>The requested movie review is not available yet.</p>
        </header>
        <Link to="/" className="side-card-cta">Return to home →</Link>
      </section>
    )
  }

  return (
    <section className="page-block movie-review-page">
      <header className="movie-review-top">
        <div className="movie-title-wrap">
          <h2>{movie.title}</h2>
          <span className="movie-release-type">{movie.releaseType || 'Theatrical'}</span>
        </div>
        <StarRating value={movie.starRating} />
      </header>

      <section className="movie-facts-block" aria-label="Movie details">
        <div className="movie-facts-grid">
          <p><strong>Director</strong><span>{renderProfileLinks(movie.director)}</span></p>
          <p><strong>Writers</strong><span>{renderProfileLinks(movie.writers)}</span></p>
          <p><strong>Music</strong><span>{renderProfileLinks(movie.music)}</span></p>
          <p><strong>Producers</strong><span>{renderProfileLinks(movie.producers)}</span></p>
          <p><strong>Editor</strong><span>{renderProfileLinks(movie.editor)}</span></p>
          <p><strong>Cast</strong><span>{renderProfileLinks(movie.cast)}</span></p>
          <p><strong>Genre</strong><span>{renderGenrePills(movie.genre)}</span></p>
          <p><strong>Rating</strong><span><span className="movie-certification-pill" data-tooltip={certificationHelp}>{certification}</span></span></p>
        </div>

        <aside className="movie-aside-panel" aria-label="Poster and release details">
          <div
            className="movie-detail-poster"
            style={movie.posterUrl
              ? { backgroundImage: `url(${movie.posterUrl})` }
              : { background: 'linear-gradient(165deg, #dce9d8 0%, #8fa185 100%)' }
            }
            role="img"
            aria-label={`${movie.title} poster`}
          />

          <div className="movie-side-boxes">
            <aside className="movie-release-box" aria-label="Release date">
              <span className="movie-release-label">Release Date</span>
              <strong>{releaseDate}</strong>
            </aside>

            <aside className="movie-release-box" aria-label="OTT platform">
              <span className="movie-release-label">OTT Platform</span>
              <strong>{movie.ottPlatform || 'N/A'}</strong>
            </aside>
          </div>
        </aside>
      </section>

      <section className="movie-summary-block" aria-label="Review summary">
        <div className="movie-summary-head">
          <h3>NM Summary <span className="movie-reviewer-name">{movie.reviewer || 'Sangeeta Sharma'}</span></h3>
        </div>
        <p>{movie.reviewSummary}</p>
      </section>

      <section className="movie-review-body" aria-label="Full review">
        <h3>NM Review</h3>
        <p>{movie.reviewText}</p>
      </section>
    </section>
  )
}
