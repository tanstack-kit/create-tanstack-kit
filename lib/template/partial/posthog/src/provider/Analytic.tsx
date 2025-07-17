import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

import { AnalyticData } from '@/component/AnalyticData'

export function Analytic({ children }) {
  useEffect(() => {
    posthog.init(import.meta.env.VITE_ANALYTIC, {
      api_host: import.meta.env.VITE_ANALYTIC_HOST,
      capture_pageview: false,
      capture_pageleave: true,
    })
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <AnalyticData />
      {children}
    </PostHogProvider>
  )
}
