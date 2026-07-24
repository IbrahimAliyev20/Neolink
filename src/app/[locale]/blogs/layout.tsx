import { getPageMetadata } from "@/services/meta-tag/api";

// The page itself is a client component, so the meta tags live on this layout.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getPageMetadata("Blog", locale);
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
