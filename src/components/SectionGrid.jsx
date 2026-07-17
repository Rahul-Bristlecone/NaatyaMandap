import { Link } from 'react-router-dom'

function toTitle(item) {
  return item.title || item.name || item.album || 'Untitled'
}

function toMetaLines(item) {
  const pairs = [
    ['Release', item.releaseDate],
    ['Platform', item.platform],
    ['Genres', item.genres],
    ['Director', item.director],
    ['Producer', item.producer],
    ['Music', item.music],
    ['Editor', item.editor],
    ['Known For', item.knownFor],
    ['Debut', item.debutYear],
    ['Era', item.era],
    ['Upcoming', item.upcoming],
    ['Age', item.age],
    ['Artist', item.artist],
    ['Published', item.publishedAt],
    ['Critic', item.critic],
    ['Seasons', item.seasons],
  ]

  return pairs.filter(([, value]) => value !== undefined && value !== null && value !== '')
}

const POSTER_GRADIENTS = [
  'linear-gradient(160deg, #c8b8e8 0%, #f0d0dc 100%)',
  'linear-gradient(160deg, #a8c0a0 0%, #e8dca0 100%)',
  'linear-gradient(160deg, #b8c4d8 0%, #f5ead8 100%)',
  'linear-gradient(160deg, #d8b8c8 0%, #e8e4c0 100%)',
  'linear-gradient(160deg, #b0c8b8 0%, #d8c8e8 100%)',
]

export default function SectionGrid({ items }) {
  if (!items.length) {
    return <p className="empty-state">No entries available right now.</p>
  }

  return (
    <div className="section-grid">
      {items.map((item) => (
        <article className="content-card" key={item.id}>
          {/* Title + chips */}
          <div className="card-head">
            <h3>
              <Link to={`/movie/${item.id}`} className="card-title-link">{toTitle(item)}</Link>
              {item.runtime && <span className="card-runtime">{item.runtime}</span>}
            </h3>
            <div className="score-chips">
              {(item.score || item.rating) ? (
                <span className="score-chip score-chip--imdb" data-tooltip="IMDB">
                  <span className="score-chip__label">IMDB</span>
                  <span className="score-chip__val">{(item.score || item.rating).toFixed(1)}</span>
                </span>
              ) : null}
              {item.nmScore ? (
                <span className="score-chip score-chip--nm" data-tooltip="NaatyaMandap">
                  <span className="score-chip__label">NM</span>
                  <span className="score-chip__val">{item.nmScore.toFixed(1)}</span>
                </span>
              ) : null}
              {item.rtScore ? (
                <span className="score-chip score-chip--rt" data-tooltip="Rotten Tomatoes">
                  <span className="score-chip__label">RT</span>
                  <span className="score-chip__val">{item.rtScore}%</span>
                </span>
              ) : null}
            </div>
          </div>

          {/* Meta + poster side by side */}
          <div className="card-meta-row">
            <div className="meta-lines">
              {toMetaLines(item).map(([label, value]) => (
                <p key={`${item.id}-${label}`}>
                  <strong>{label}:</strong> {value}
                </p>
              ))}
            </div>
            <Link
              to={`/movie/${item.id}`}
              className="card-poster-small"
              style={item.posterUrl
                ? { backgroundImage: `url(${item.posterUrl})` }
                : { background: POSTER_GRADIENTS[parseInt(item.id?.replace(/\D/g,'') || 0) % POSTER_GRADIENTS.length] }
              }
              aria-label={`View review for ${toTitle(item)}`}
            />
          </div>
          {item.summary || item.verdict || item.note ? (
            <p className="card-body">{item.summary || item.verdict || item.note}</p>
          ) : null}
          {item.highlight ? <p className="badge-line">{item.highlight}</p> : null}
        </article>
      ))}
    </div>
  )
}
