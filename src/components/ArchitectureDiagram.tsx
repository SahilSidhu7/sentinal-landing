const STEPS = [
  { label: "Watch", detail: "docker build/run — your app's container" },
  { label: "Scan", detail: "secrets, CVEs, docker misconfig, weak creds" },
  { label: "Detect", detail: "Drain3 + ONNX MiniLM + Isolation Forest, fully local" },
  { label: "Show", detail: "dashboard UI + JSON API, one port" },
  { label: "Act", detail: "manual-confirm IP ban, scoped to your container" },
];

export function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-outline bg-surface-container-low p-8 text-left">
      <div className="font-mono text-mono-label text-primary">[ SENTINAL ]</div>
      <p className="mt-3 font-display text-headline-md font-semibold text-on-surface">
        One CLI, running on your machine
      </p>
      <p className="mt-2 text-body-sm text-on-surface-variant">
        No raw logs leave your box — this loop runs entirely locally.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex items-center gap-3">
            <div className="rounded-xl border border-outline bg-surface p-4">
              <div className="font-mono text-mono-label text-primary">{step.label}</div>
              <div className="mt-1 max-w-[10rem] text-body-sm text-on-surface-variant">{step.detail}</div>
            </div>
            {i < STEPS.length - 1 && <span className="text-on-surface-variant">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
