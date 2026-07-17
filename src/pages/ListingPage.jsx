import { useEffect, useState } from 'react'
import SectionGrid from '../components/SectionGrid'
import { getSectionData } from '../services/apiClient'

export default function ListingPage({ configKey, title, intro }) {
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

  return (
    <section className="page-block">
      <header className="page-head">
        <h2>{title}</h2>
        <p>{intro}</p>
      </header>
      {loading ? <p>Loading...</p> : <SectionGrid items={items} />}
    </section>
  )
}
