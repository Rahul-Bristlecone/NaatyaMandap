import ReleaseListingPage from './ReleaseListingPage'
import { RELEASE_PAGE_KEYS } from '../constants/releasePages'

export default function OttMoviesPage() {
  return <ReleaseListingPage pageKey={RELEASE_PAGE_KEYS.OTT_MOVIES} />
}
