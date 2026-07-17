import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAvailableYears, getSelectedByYear } from '../services/apiClient'

function ScoreList({ title, entries }) {
  return (
    <div className="year-column">
      <h3>{title}</h3>
      {!entries.length ? (
        <p className="empty-state">No entries for this year yet.</p>
      ) : (
        <ul className="score-list">
          {entries.map((entry) => (
            <li key={entry.id}>
              <span>{entry.title}</span>
              <strong>{entry.score.toFixed(1)}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SelectedYearPage() {
  const years = getAvailableYears()
  const params = useParams()
  const selectedYear = Number(params.year || years[0])
  const [payload, setPayload] = useState({ movies: [], music: [] })

  useEffect(() => {
    let active = true

    const load = async () => {
      const data = await getSelectedByYear(selectedYear)
      if (active) {
        setPayload(data)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [selectedYear])

  return (
    <section className="page-block">
      <header className="page-head">
        <h2>NaatyaMandap Selected {selectedYear}</h2>
        <p>Top-rated movies and music picks by year.</p>
      </header>

      <div className="year-switcher">
        {years.map((year) => (
          <Link
            key={year}
            className={year === selectedYear ? 'year-pill active' : 'year-pill'}
            to={`/selected/${year}`}
          >
            {year}
          </Link>
        ))}
      </div>

      <div className="year-grid">
        <ScoreList title="Top Movies" entries={payload.movies} />
        <ScoreList title="Top Music" entries={payload.music} />
      </div>
    </section>
  )
}
