import DOMPurify from 'isomorphic-dompurify'

/**
 * Sanitize CMS-provided rich HTML before injecting it via
 * `dangerouslySetInnerHTML`. Strips scripts, event handlers and other XSS
 * vectors while keeping the formatting tags the backend content relies on
 * (`<font>`, links, lists, etc.). Works both on the server (SSR) and client.
 */
export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
}
