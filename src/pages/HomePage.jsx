import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const TEMP_SCROLL_IMAGES = [
  { id: 1, color: '#f3d2bd', label: 'Poster 1' },
  { id: 2, color: '#d5ebe1', label: 'Poster 2' },
  { id: 3, color: '#dce8f5', label: 'Poster 3' },
  { id: 4, color: '#f5e6dc', label: 'Poster 4' },
  { id: 5, color: '#e8dff5', label: 'Poster 5' },
  { id: 6, color: '#d5f0e1', label: 'Poster 6' },
  { id: 7, color: '#f5dce0', label: 'Poster 7' },
]

const TEMP_SELECTED_MOVIES = [
  { id: 'nm-ll-2024', title: 'Laapata Ladies', year: '2024' },
  { id: 'nm-stree2-2024', title: 'Stree 2', year: '2024' },
  { id: 'nm-tanhaji-2020', title: 'Tanhaji', year: '2020' },
  { id: 'nm-gk-2022', title: 'Gangubai Kathiawadi', year: '2022' },
  { id: 'nm-drishyam2-2022', title: 'Drishyam 2', year: '2022' },
  { id: 'nm-pathaan-2023', title: 'Pathaan', year: '2023' },
  { id: 'nm-12thfail-2023', title: '12th Fail', year: '2023' },
]

const TEMP_RISING_STARS = [
  { id: 1, slug: 'sanjay-dutt-jr', name: 'Sanjay Dutt Jr.', role: 'Actor' },
  { id: 2, slug: 'priya-malhotra', name: 'Priya Malhotra', role: 'Actress' },
  { id: 3, slug: 'arjun-kapoor-ii', name: 'Arjun Kapoor II', role: 'Actor' },
  { id: 4, slug: 'neha-verma', name: 'Neha Verma', role: 'Actress' },
  { id: 5, slug: 'kabir-anand', name: 'Kabir Anand', role: 'Director' },
  { id: 6, slug: 'riya-sharma', name: 'Riya Sharma', role: 'Actress' },
  { id: 7, slug: 'vikram-singh', name: 'Vikram Singh', role: 'Actor' },
]

export default function HomePage() {
  const [active, setActive] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TEMP_SCROLL_IMAGES.length)
    }, 3000)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (idx) => {
    clearInterval(timerRef.current)
    setActive(idx)
    startTimer()
  }
  return (
    <>
      <div className="home-layout">
      {/* Left column: NaatyaMandap Selected — starts flush below topbar */}
      <aside className="home-side-card home-side-card--left">
          <p className="side-card-eyebrow">Editorial</p>
          <h2 className="side-card-title">NaatyaMandap Selected</h2>
          <p className="side-card-sub">Annual curated picks across films and performances.</p>
          <ol className="movie-list" aria-label="Selected movies">
            {TEMP_SELECTED_MOVIES.map((movie, idx) => (
              <li key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="movie-list-item">
                  <span className="movie-list-num">{idx + 1}</span>
                  <span className="movie-list-title">{movie.title}</span>
                  <span className="movie-list-badge">{movie.year}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link to="/selected/2026" className="side-card-cta">View all 2026 Picks →</Link>
      </aside>

      {/* Middle panel: pills → scroll strip */}
      <div className="home-right-panel">
        {/* Pill-cards */}
        <div className="home-pills-row">
          <div className="pill-card">
            <div className="pill-top">Theatrical Releases</div>
            <div className="pill-bottom pill-bottom--single">
              <Link to="/releases/theatre" className="pill-link">Movies</Link>
            </div>
          </div>
          <div className="pill-card">
            <div className="pill-top">OTT Releases</div>
            <div className="pill-bottom pill-bottom--two">
              <Link to="/releases/ott-movies" className="pill-link">Movies</Link>
              <span className="pill-divider" />
              <Link to="/series/ott" className="pill-link">Web Series</Link>
            </div>
          </div>
        </div>

        {/* Auto-advancing carousel */}
        <div className="home-carousel">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {TEMP_SCROLL_IMAGES.map((img) => (
              <div
                key={img.id}
                className="carousel-slide"
                style={{ background: img.color }}
                aria-label={img.label}
              >
                <span className="carousel-label">{img.label}</span>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="carousel-dots">
            {TEMP_SCROLL_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                className={`carousel-dot${idx === active ? ' carousel-dot--active' : ''}`}
                onClick={() => goTo(idx)}
                aria-label={`Go to ${img.label}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right column: Rising Stars — starts flush below topbar */}
      <aside className="home-side-card home-side-card--right">
        <p className="side-card-eyebrow">Spotlight</p>
        <h2 className="side-card-title">Rising Stars</h2>
        <p className="side-card-sub">New faces making waves in Bollywood this year.</p>
        <ol className="movie-list" aria-label="Rising stars">
          {TEMP_RISING_STARS.map((star) => (
            <li key={star.id}>
              <Link to={`/profile/${star.slug}?name=${encodeURIComponent(star.name)}`} className="movie-list-item">
                <span className="movie-list-num">{star.id}</span>
                <span className="movie-list-title">{star.name}</span>
                <span className="movie-list-badge">{star.role}</span>
              </Link>
            </li>
          ))}
        </ol>
        <Link to="/rising-stars" className="side-card-cta">View all Rising Stars →</Link>
      </aside>
    </div>

    {/* ── Section divider: News ── */}
    <div className="section-divider">
      <span className="section-divider__bar" />
      <span className="section-divider__label">News</span>
      <span className="section-divider__bar" />
    </div>

    {/* ── News posters ── */}
    <div className="news-grid">
      {[
        { id: 1, color: '#f0dce4', label: 'News Poster 1' },
        { id: 2, color: '#ede9f8', label: 'News Poster 2' },
        { id: 3, color: '#f5f0e8', label: 'News Poster 3' },
        { id: 4, color: '#dce8f5', label: 'News Poster 4' },
        { id: 5, color: '#d5ebe1', label: 'News Poster 5' },
        { id: 6, color: '#f3d2bd', label: 'News Poster 6' },
      ].map((item) => (
        <div key={item.id} className="news-poster" style={{ background: item.color }}>
          <span className="news-poster-label">{item.label}</span>
        </div>
      ))}
    </div>
    </>
  )
}
