import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-outline bg-surface-container-low px-4 py-1.5">
      <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
      <span className="font-mono text-mono-label uppercase tracking-widest text-on-surface-variant">
        {children}
      </span>
    </span>
  );
}
