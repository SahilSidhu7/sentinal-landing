import { useState } from "react";
import { Reveal } from "../components/Reveal";
import { CheckIcon, CopyIcon } from "../components/icons";

const INSTALL_STEPS = [
  {
    title: "1. Install",
    code: "curl -fsSL https://sahilsidhu7.github.io/sentinal-landing/install.sh | bash",
    note: "Clones Sentinal, sets up a venv, and installs the sentinal CLI.",
  },
  {
    title: "2. Watch your app",
    code: "cd Sentinal\nsource .venv/bin/activate\nsentinal watch ./my-app",
    note: "Builds and runs your app's container, scans it, and starts the local detection pipeline.",
  },
  {
    title: "3. Open the dashboard",
    code: "open http://localhost:8000",
    note: "Served by the same CLI process — no separate service to stand up.",
  },
];

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "Sentinal watches a target (folder, repo, or container), scans it for security issues, detects live attacks, visualizes risk on a live dashboard, and takes safe, human-approved response actions.",
      "Core loop: Watch → Scan → Detect (Drain3 + ONNX + Isolation Forest) → Show (Dashboard) → Act (auto-response).",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    body: [
      "One CLI, one box: sentinal watch builds and runs your app's container, scans it, tails its logs through a fully local detection pipeline, and serves the dashboard — all in a single process.",
      "Nothing leaves your machine except the structured findings and scores you choose to forward. There's no separate backend service or remote agent to deploy today.",
    ],
  },
  {
    id: "detection",
    title: "Detection pipeline",
    body: [
      "High-volume log lines are parsed into templates with Drain3, embedded with all-MiniLM-L6-v2 via ONNX Runtime (CPU-only, no PyTorch), and scored with a per-target Isolation Forest trained on that target's own rolling normal traffic.",
      "There is no LLM anywhere in the detection or explanation path. Finding explanations resolve against a static rule-template table.",
    ],
  },
  {
    id: "response",
    title: "Auto-response & IP banning",
    body: [
      "Critical findings always produce an audit-log entry and a dashboard alert. IP banning is manual-confirm by default.",
      "Opt-in auto-ban requires sustained high-confidence anomaly scores and is scoped to the container Sentinal is watching. Bans are TTL-based and reversible.",
    ],
  },
  {
    id: "audit",
    title: "Audit log",
    body: [
      "Every finding lifecycle event and every action (ban, unban, dismiss, fix-applied) is written to an append-only audit log with a chained hash (prev_hash → entry_hash) so tampering is at least detectable.",
    ],
  },
];

const NAV_SECTIONS = [{ id: "installation", title: "Installation" }, ...SECTIONS];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-outline-variant bg-surface-container-lowest p-3">
      <code className="overflow-x-auto whitespace-pre font-mono text-mono-data text-primary">{code}</code>
      <button
        type="button"
        aria-label="Copy to clipboard"
        onClick={() => {
          navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
        }}
        className="shrink-0 text-on-surface-variant transition-colors hover:text-primary"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-primary" /> : <CopyIcon className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function Docs() {
  return (
    <div className="mx-auto flex max-w-6xl gap-10 px-6 py-16">
      <aside className="hidden w-48 flex-shrink-0 lg:block">
        <nav className="sticky top-24 space-y-1 font-mono text-mono-label">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block rounded-md px-3 py-1.5 uppercase tracking-widest text-on-surface-variant transition-colors duration-200 ease-out hover:bg-surface-container-low hover:text-primary"
            >
              {section.title}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-16">
        <Reveal as="h1" className="font-display text-headline-lg font-bold tracking-tighter text-on-surface">
          Documentation
        </Reveal>

        <Reveal as="section" id="installation" className="scroll-mt-24">
          <h2 className="mb-3 font-display text-headline-md font-semibold text-on-surface">Installation</h2>
          <p className="mb-8 text-body-sm text-on-surface-variant">
            Requires Docker — Sentinal uses it to build and run the container it watches. Scapy
            packet sniffing and OSV.dev CVE lookups degrade gracefully if you're offline or
            unprivileged — everything else works out of the box.
          </p>
          <div className="space-y-8">
            {INSTALL_STEPS.map((step) => (
              <div key={step.title}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary font-bold text-on-primary">
                    {step.title.charAt(0)}
                  </div>
                  <h3 className="font-bold text-on-surface">{step.title.replace(/^\d+\.\s*/, "")}</h3>
                </div>
                <CodeBlock code={step.code} />
                {step.note && <p className="mt-2 text-body-sm text-on-surface-variant">{step.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>

        {SECTIONS.map((section) => (
          <Reveal key={section.id} as="section" id={section.id} className="scroll-mt-24">
            <h2 className="mb-3 font-display text-headline-md font-semibold text-on-surface">
              {section.title}
            </h2>
            <div className="space-y-3 text-body-sm leading-relaxed text-on-surface-variant">
              {section.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
