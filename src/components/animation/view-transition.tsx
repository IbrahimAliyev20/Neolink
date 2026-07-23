"use client";

import * as React from "react";
import type { ReactNode } from "react";

/**
 * Adapter around React's experimental `<ViewTransition>`.
 *
 * Next swaps `react` for its vendored experimental build when
 * `experimental.viewTransition` is on, and that build has moved the export from
 * `unstable_ViewTransition` to `ViewTransition` — so pick up whichever is
 * there, and simply render the children when neither is (flag off, or a React
 * version without it). Browsers without the View Transitions API just get the
 * navigation with no animation.
 */
type ViewTransitionProps = {
  children: ReactNode;
  /** Shared name, for animating one element into another across pages. */
  name?: string;
};

const reactExports = React as unknown as Record<string, unknown>;

const ReactViewTransition = (reactExports.ViewTransition ??
  reactExports.unstable_ViewTransition) as
  | React.ComponentType<ViewTransitionProps>
  | undefined;

/** True when React can actually drive a view transition. */
export const viewTransitionsEnabled = Boolean(ReactViewTransition);

export function ViewTransition({ children, name }: ViewTransitionProps) {
  if (!ReactViewTransition) return <>{children}</>;
  return <ReactViewTransition name={name}>{children}</ReactViewTransition>;
}
