import { getPageMetadata } from "@/services/meta-tag/api";

// The page itself is a client component, so the meta tags live on this layout.
export function generateMetadata() {
  return getPageMetadata("Blog");
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
