import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SectionGrid from '../components/SectionGrid'
import { DEFAULT_LISTING_FILTER, LISTING_MONTHS } from '../constants/listing'
import { getSectionData } from '../services/apiClient'
import { hexToRgba } from '../utils/color'

export default function ListingPage({ configKey, title, intro, matchTheatreLayout = false, themeColor }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = searchParams.get('filter') || DEFAULT_LISTING_FILTER

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      const data = await getSectionData(configKey)
      if (active) {
        setItems(data)
        setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [configKey])

  const handleFilter = (filter) => {
    setSearchParams(filter === DEFAULT_LISTING_FILTER ? {} : { filter })
  }

  const themedSectionStyle = themeColor
    ? {
        background: hexToRgba(themeColor, 0.5),
        borderColor: hexToRgba(themeColor, 0.8),
        '--listing-card-bg': hexToRgba(themeColor, 0.74),
        '--listing-card-border': hexToRgba(themeColor, 0.95),
      }
    : undefined

  return (
    <section
      className={`page-block${matchTheatreLayout ? ' page-block--theatre' : ''}${themeColor ? ' page-block--themed' : ''}`}
      style={themedSectionStyle}
    >
      {matchTheatreLayout ? (
        <>
          <div className="theatre-header-row">
            <div className="theatre-title-line">
              <h2>{title}</h2>
              <button
                className={`filter-pill filter-pill--inline${activeFilter === DEFAULT_LISTING_FILTER ? ' filter-pill--active' : ''}`}
                onClick={() => handleFilter(DEFAULT_LISTING_FILTER)}
              >
                {DEFAULT_LISTING_FILTER}
              </button>
            </div>
          </div>

          <div className="filter-pills-row">
            {LISTING_MONTHS.map((m) => (
              <button
                key={m}
                className={`filter-pill${activeFilter === m ? ' filter-pill--active' : ''}`}
                onClick={() => handleFilter(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </>
      ) : (
        <header className="page-head">
          <h2>{title}</h2>
          <p>{intro}</p>
        </header>
      )}
      {loading ? <p>Loading...</p> : <SectionGrid items={items} />}
    </section>
  )
}
