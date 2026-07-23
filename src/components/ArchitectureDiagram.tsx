import { SyncIcon } from "./icons";

export function ArchitectureDiagram() {
  return (
    <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
      <div className="rounded-2xl border border-outline bg-surface-container-low p-8 text-left">
        <div className="font-mono text-mono-label text-primary">[ SENTINEL_AGENT ]</div>
        <p className="mt-3 font-display text-headline-md font-semibold text-on-surface">Your server</p>
        <p className="mt-2 text-body-sm text-on-surface-variant">tails logs, runs detection locally</p>
      </div>

      <div className="flex flex-row items-center justify-center gap-3 text-on-surface-variant md:flex-col md:gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent md:h-12 md:w-px md:bg-gradient-to-b" />
        <SyncIcon className="h-5 w-5 shrink-0" />
        <span className="whitespace-nowrap font-mono text-mono-label text-on-surface-variant">
          findings + scores only
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-primary to-transparent md:h-12 md:w-px md:bg-gradient-to-t" />
      </div>

      <div className="rounded-2xl border border-outline bg-surface-container-low p-8 text-left">
        <div className="font-mono text-mono-label text-primary">[ SENTINAL_CORE ]</div>
        <p className="mt-3 font-display text-headline-md font-semibold text-on-surface">Your infra</p>
        <p className="mt-2 text-body-sm text-on-surface-variant">
          core backend + dashboard — FastAPI, SQLite, live WebSocket feed
        </p>
      </div>
    </div>
  );
}
