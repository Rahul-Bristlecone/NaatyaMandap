import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import ListingPage from './pages/ListingPage'
import MovieReviewPage from './pages/MovieReviewPage'
import OttMoviesPage from './pages/OttMoviesPage'
import OttSeriesPage from './pages/OttSeriesPage'
import ProfilePage from './pages/ProfilePage'
import SelectedYearPage from './pages/SelectedYearPage'
import TheatrePage from './pages/TheatrePage'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        {/* Brand */}
        <Link to="/" className="brand-block" aria-label="NaatyaMandap home">
          <span className="brand-name">NaatyaMandap</span>
          <sub className="brand-sub">kahani hindi cinema ki</sub>
        </Link>

        <div className="topbar-right">
          {/* Search */}
          <div className="topbar-search">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>

          <span className="topbar-separator" aria-hidden="true" />

          {/* Social icons */}
          <div className="topbar-socials" aria-label="Social links">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* Twitter / X */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Reddit */}
            <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Reddit">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.5 14.5a2.6 2.6 0 0 1-5 0h5zm4.8-1.2a1.8 1.8 0 0 0-2.7-2.3 6.8 6.8 0 0 0-4.1-1.3c-1.4 0-2.8.5-3.9 1.3a1.8 1.8 0 1 0-1.9 3 .8.8 0 0 1 .2.5c0 2.1 2.5 3.8 5.6 3.8 3.1 0 5.6-1.7 5.6-3.8a.8.8 0 0 1 .2-.5c.6-.3 1-.9 1-1.7zm-8.4-.2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                <circle cx="18" cy="7.2" r="1.6"/>
                <path d="M12.5 9.1 13.5 5l3 1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:contact@naatya.in" className="social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/releases/theatre" element={<TheatrePage />} />
          <Route path="/releases/ott-movies" element={<OttMoviesPage />} />
          <Route path="/series/ott" element={<OttSeriesPage />} />
          <Route
            path="/talent/male"
            element={
              <ListingPage
                configKey="talentMale"
                title="Talent Directory - Male"
                intro="Editorial profiles of male actors and performers."
              />
            }
          />
          <Route
            path="/talent/female"
            element={
              <ListingPage
                configKey="talentFemale"
                title="Talent Directory - Female"
                intro="Editorial profiles of female actors and performers."
              />
            }
          />
          <Route
            path="/icons"
            element={
              <ListingPage
                configKey="icons"
                title="Icons"
                intro="Combined male and female legends across eras."
              />
            }
          />
          <Route
            path="/rising-stars"
            element={
              <ListingPage
                configKey="risingStars"
                title="Rising Stars"
                intro="New faces and high-momentum performers to watch."
              />
            }
          />
          <Route
            path="/reviews/movies"
            element={
              <ListingPage
                configKey="movieReviews"
                title="Movie Reviews"
                intro="Editorial movie reviews and scorecards."
              />
            }
          />
          <Route
            path="/reviews/music"
            element={
              <ListingPage
                configKey="musicReviews"
                title="Music Reviews"
                intro="Editorial reviews of songs, albums, and OST releases."
              />
            }
          />
          <Route path="/movie/:movieId" element={<MovieReviewPage />} />
          <Route path="/profile/:slug" element={<ProfilePage />} />
          <Route path="/selected/:year" element={<SelectedYearPage />} />
          <Route path="/selected" element={<SelectedYearPage />} />
          <Route
            path="/news"
            element={
              <ListingPage
                configKey="news"
                title="News"
                intro="Low-priority but available for fast updates and tracking."
              />
            }
          />
          <Route
            path="*"
            element={
              <section className="page-block">
                <h2>Page not found</h2>
                <p>Use the navigation menu to return to a section.</p>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-brand-name">NaatyaMandap</span>
            <sub className="footer-brand-sub">kahani hindi cinema ki</sub>
            <p className="footer-brand-tagline">
              Your definitive guide to Bollywood — releases, stars, reviews, and editorial picks.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://reddit.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Reddit">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.5 14.5a2.6 2.6 0 0 1-5 0h5zm4.8-1.2a1.8 1.8 0 0 0-2.7-2.3 6.8 6.8 0 0 0-4.1-1.3c-1.4 0-2.8.5-3.9 1.3a1.8 1.8 0 1 0-1.9 3 .8.8 0 0 1 .2.5c0 2.1 2.5 3.8 5.6 3.8 3.1 0 5.6-1.7 5.6-3.8a.8.8 0 0 1 .2-.5c.6-.3 1-.9 1-1.7zm-8.4-.2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/><circle cx="18" cy="7.2" r="1.6"/><path d="M12.5 9.1 13.5 5l3 1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </a>
              <a href="mailto:contact@naatya.in" className="social-link" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-col">
            <h4 className="footer-col-head">Explore</h4>
            <ul className="footer-links">
              <li><a href="/releases/theatre">Theatrical Releases</a></li>
              <li><a href="/releases/ott-movies">Digital Movies</a></li>
              <li><a href="/series/ott">Web Series</a></li>
              <li><a href="/reviews/movies">Movie Reviews</a></li>
              <li><a href="/reviews/music">Music Reviews</a></li>
              <li><a href="/news">News</a></li>
            </ul>
          </div>

          {/* Talent */}
          <div className="footer-col">
            <h4 className="footer-col-head">Talent</h4>
            <ul className="footer-links">
              <li><a href="/talent/male">Male Actors</a></li>
              <li><a href="/talent/female">Female Actors</a></li>
              <li><a href="/icons">Icons</a></li>
              <li><a href="/rising-stars">Rising Stars</a></li>
              <li><a href="/selected/2026">NaatyaMandap Selected</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4 className="footer-col-head">Company</h4>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/advertise">Advertise</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/press">Press Kit</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h4 className="footer-col-head">Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Use</a></li>
              <li><a href="/cookies">Cookie Policy</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} NaatyaMandap. All rights reserved.</p>
          <p className="footer-copy">Made with ♥ for Hindi cinema lovers.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
