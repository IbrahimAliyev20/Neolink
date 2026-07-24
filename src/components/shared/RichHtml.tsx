import { sanitizeHtml } from "@/lib/sanitize";

/**
 * Renders API-provided rich HTML bodies. Section headings arrive as
 * `<font size="4">` wrapped in a `<div>`; paragraphs are plain `<div>`s. The
 * arbitrary-variant classes promote the `<font>` tags to headings and space the
 * paragraphs out. The empty Figma metadata `<span>`s render nothing. The HTML
 * is sanitized first to strip any script/XSS payload from the CMS content.
 */
export function RichHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={`w-full text-[#5b606f] text-sm leading-6 tracking-[0.14px] lg:text-base lg:leading-7 lg:tracking-normal [&>div]:mb-4 lg:[&>div]:mb-5 [&_font]:mt-6 [&_font]:mb-2 [&_font]:block [&_font]:font-medium [&_font]:text-[#20201e] [&_font]:text-xl [&_font]:leading-7 [&_font]:tracking-[0.2px] lg:[&_font]:text-[28px] lg:[&_font]:leading-9 lg:[&_font]:tracking-normal [&_a]:text-[#3abdaa] [&_a]:underline [&_ul]:list-disc [&_ul]:ps-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5 ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
