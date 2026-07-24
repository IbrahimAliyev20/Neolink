import React from 'react'

/**
 * The shared 1440 content column. Figma lays every page out on 1920 with 240px
 * side margins, i.e. 1440 of content — so once the viewport is wide enough to
 * show all 1440, the padding goes away and only the `max-w` centres it.
 * Narrower than that it falls back to 80px (16px on mobile).
 */
function Container({ children,className }: { children: React.ReactNode,className?: string }) {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 md:px-[80px] 2xl:px-0 ${className ?? ""}`}>
        {children}
    </div>
  )
}

export default Container
