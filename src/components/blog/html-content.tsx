import { RichHtml } from "@/components/shared/RichHtml";

/**
 * Blog body. Kept as its own component for the blog page's readability, but the
 * rendering/styling of CMS HTML lives in one place — `RichHtml`.
 */
export function BlogHtmlContent({ html }: { html: string }) {
  return <RichHtml html={html} />;
}
