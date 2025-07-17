import { useEffect, Suspense } from 'react'
import { useLocation } from '@tanstack/react-router'
import { usePostHog } from 'posthog-js/react'

function CaptureViewData() {
  const location = useLocation()
  const posthog = usePostHog()

  useEffect(() => {
    if (location && posthog) {
      let url = `${window.origin}${location.pathname}`
      if (location.searchStr) {
        url = `${window.origin}${location.pathname}?${location.searchStr}`
      }

      posthog.capture('$pageview', { $current_url: url })
    }
  }, [location, posthog])

  return null
}

export function AnalyticData() {
  return (
    <Suspense>
      <CaptureViewData />
    </Suspense>
  )
}
