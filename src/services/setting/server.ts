import { cache } from 'react'
import { getSetting, type SettingData } from './api'

/**
 * Server-side read of `/setting` for `generateMetadata`.
 * `cache` dedupes it within a single render pass, and a failing/slow settings
 * call must never break the page — callers fall back to the static assets.
 */
export const getSettingSafe = cache(async (locale: string): Promise<SettingData | null> => {
  try {
    return await getSetting(locale)
  } catch {
    return null
  }
})
