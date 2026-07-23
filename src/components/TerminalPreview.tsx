export function TerminalPreview({ lines }: { lines: string[] }) {
  return (
    <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-outline bg-surface-container-low text-left shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-outline bg-surface-container px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-error/40" />
        <span className="h-3 w-3 rounded-full bg-secondary/40" />
        <span className="h-3 w-3 rounded-full bg-primary/40" />
        <span className="ml-2 font-mono text-mono-label uppercase text-on-surface-variant">
          quickstart
        </span>
      </div>
      <div className="px-6 py-4 font-mono text-mono-data">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-on-surface-variant">$</span>
            <span className="text-on-surface">{line}</span>
            {i === lines.length - 1 && (
              <span className="cursor-blink inline-block h-4 w-[7px] translate-y-[1px] bg-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
