import ListingPage from './ListingPage'
import { RELEASE_PAGE_CONFIG } from '../constants/releasePages'

export default function ReleaseListingPage({ pageKey }) {
  const config = RELEASE_PAGE_CONFIG[pageKey]

  if (!config) {
    return (
      <section className="page-block">
        <h2>Release page not found</h2>
        <p>Please check the configured release page key.</p>
      </section>
    )
  }

  return (
    <ListingPage
      configKey={config.configKey}
      title={config.title}
      intro={config.intro}
      matchTheatreLayout
      themeColor={config.themeColor}
    />
  )
}
