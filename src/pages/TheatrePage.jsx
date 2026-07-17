import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionGrid from '../components/SectionGrid'
import { getSectionData } from '../services/apiClient'

const MONTHS = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
]

const FILTERS = ['Upcoming next week', ...MONTHS]

export default function TheatrePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || 'Upcoming next week'

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const load = async () => {
      const data = await getSectionData('theatreReleases')
      if (active) {
        setItems(data)
        setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const handleFilter = (filter) => {
    setSearchParams(filter === 'Upcoming next week' ? {} : { filter })
  }

  return (
    <section className="page-block page-block--theatre">
      {/* Heading row: title + pill inline, subtitle below */}
      <div className="theatre-header-row">
        <div className="theatre-title-line">
          <h2>Theatrical Releases</h2>
          <button
            className={`filter-pill filter-pill--inline${activeFilter === 'Upcoming next week' ? ' filter-pill--active' : ''}`}
            onClick={() => handleFilter('Upcoming next week')}
          >
            Upcoming next week
          </button>
        </div>
      </div>

      {/* Month pills */}
      <div className="filter-pills-row">
        {MONTHS.map((m) => (
          <button
            key={m}
            className={`filter-pill${activeFilter === m ? ' filter-pill--active' : ''}`}
            onClick={() => handleFilter(m)}
          >
            {m}
          </button>
        ))}
      </div>

      {loading
        ? <p>Loading…</p>
        : <SectionGrid items={items} />}
    </section>
  )
}
