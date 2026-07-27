import { sanitizeHtml } from "@/lib/sanitize";

/**
 * Styling for the rich HTML the CMS editor produces. Every detail page renders
 * its body through this so a description written in the admin panel keeps the
 * structure it was written with — paragraphs, headings, bullet/numbered lists,
 * bold/italic, links, quotes, images and tables.
 *
 * The legacy `<div>` + `<font size="4">` shape older records use is still
 * handled: `<font>` is promoted to a heading and top-level `<div>`s are spaced
 * like paragraphs.
 *
 * Every class is written out in full — Tailwind only picks up literal strings,
 * so these must never be assembled at runtime.
 */
const richHtmlClasses = [
  // Base copy
  "w-full text-[#5b606f] text-sm leading-6 tracking-[0.14px] lg:text-base lg:leading-7 lg:tracking-normal",
  // Blocks
  "[&_p]:mb-4 lg:[&_p]:mb-5",
  "[&>div]:mb-4 lg:[&>div]:mb-5",
  "[&>*:last-child]:mb-0",
  // Headings
  "[&_h1]:mt-6 [&_h1]:mb-2 [&_h1]:block [&_h1]:font-semibold [&_h1]:text-[#20201e] [&_h1]:text-xl [&_h1]:leading-7 lg:[&_h1]:mt-8 lg:[&_h1]:mb-3 lg:[&_h1]:text-[32px] lg:[&_h1]:leading-10",
  "[&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:block [&_h2]:font-semibold [&_h2]:text-[#20201e] [&_h2]:text-lg [&_h2]:leading-7 lg:[&_h2]:mt-8 lg:[&_h2]:mb-3 lg:[&_h2]:text-[28px] lg:[&_h2]:leading-9",
  "[&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:block [&_h3]:font-semibold [&_h3]:text-[#20201e] [&_h3]:text-base [&_h3]:leading-6 lg:[&_h3]:mt-8 lg:[&_h3]:mb-3 lg:[&_h3]:text-[22px] lg:[&_h3]:leading-8",
  "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:block [&_h4]:font-semibold [&_h4]:text-[#20201e] [&_h4]:text-sm [&_h4]:leading-5 lg:[&_h4]:mt-8 lg:[&_h4]:mb-3 lg:[&_h4]:text-lg lg:[&_h4]:leading-7",
  "[&_h5]:mt-6 [&_h5]:mb-2 [&_h5]:block [&_h5]:font-semibold [&_h5]:text-[#20201e] [&_h5]:text-sm [&_h5]:leading-5 lg:[&_h5]:mt-8 lg:[&_h5]:mb-3 lg:[&_h5]:text-base lg:[&_h5]:leading-6",
  "[&_h6]:mt-6 [&_h6]:mb-2 [&_h6]:block [&_h6]:font-semibold [&_h6]:text-[#20201e] [&_h6]:text-sm [&_h6]:leading-5 lg:[&_h6]:mt-8 lg:[&_h6]:mb-3 lg:[&_h6]:text-base lg:[&_h6]:leading-6",
  // Legacy `<font size>` headings
  "[&_font]:mt-6 [&_font]:mb-2 [&_font]:block [&_font]:font-medium [&_font]:text-[#20201e] [&_font]:text-xl [&_font]:leading-7 [&_font]:tracking-[0.2px] lg:[&_font]:text-[28px] lg:[&_font]:leading-9 lg:[&_font]:tracking-normal",
  // Lists
  "[&_ul]:list-disc [&_ul]:ps-6 [&_ul]:mb-4 lg:[&_ul]:mb-5",
  "[&_ol]:list-decimal [&_ol]:ps-6 [&_ol]:mb-4 lg:[&_ol]:mb-5",
  "[&_li]:mb-2.5 [&_li:last-child]:mb-0 [&_li>ul]:mt-2.5 [&_li>ol]:mt-2.5 [&_li>p]:mb-0",
  // Inline
  "[&_strong]:font-semibold [&_strong]:text-[#20201e] [&_b]:font-semibold [&_b]:text-[#20201e]",
  "[&_em]:italic [&_i]:italic [&_u]:underline",
  "[&_a]:text-[#3abdaa] [&_a]:underline [&_a]:underline-offset-2",
  // Quotes, rules, media
  "[&_blockquote]:my-4 [&_blockquote]:border-s-2 [&_blockquote]:border-[#3abdaa] [&_blockquote]:ps-4 [&_blockquote]:italic",
  "[&_hr]:my-6 [&_hr]:border-[#e7e7ea]",
  "[&_img]:my-4 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl",
  // Tables
  "[&_table]:my-4 [&_table]:w-full [&_table]:border-collapse",
  "[&_th]:border [&_th]:border-[#e7e7ea] [&_th]:p-2 [&_th]:text-start [&_th]:font-semibold [&_th]:text-[#20201e]",
  "[&_td]:border [&_td]:border-[#e7e7ea] [&_td]:p-2",
].join(" ");

export function RichHtml({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={`${richHtmlClasses} ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
