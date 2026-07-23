import { getPageMetadata } from "@/services/meta-tag/api";

// The page itself is a client component, so the meta tags live on this layout.
export function generateMetadata() {
  return getPageMetadata("Project");
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
