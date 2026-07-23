import { Link } from "react-router-dom";
import { Badge } from "../components/Badge";
import { TerminalPreview } from "../components/TerminalPreview";
import { NumberedCard } from "../components/NumberedCard";
import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { FaqCard } from "../components/FaqCard";
import { Reveal } from "../components/Reveal";
import { ActIcon, CheckCircleIcon, DetectIcon, ScanIcon, ShowIcon } from "../components/icons";

const PROBLEMS = [
  {
    number: "01",
    title: "Cloud tools ship your data out",
    description:
      "Most monitoring SaaS routes your logs through a third-party pipeline before you ever see them. Your incident data becomes someone else's dataset.",
  },
  {
    number: "02",
    title: "Alerts arrive after the damage",
    description:
      "By the time a dashboard tab refreshes, the breach already happened. Detection has to run where the data lives, not after an upload round-trip.",
  },
  {
    number: "03",
    title: "Auto-remediation causes outages",
    description:
      "Kill switches that trigger with no human in the loop have taken down more services than the attacks they were meant to stop.",
  },
];

const FEATURES = [
  {
    title: "Scan",
    description: "Secret detection and dependency CVE lookups across any target.",
    icon: ScanIcon,
  },
  {
    title: "Detect",
    description: "Local Drain3 + ONNX + Isolation Forest anomaly scoring, no LLM.",
    icon: DetectIcon,
  },
  {
    title: "Show",
    description: "Live security score, findings, and attack feed over WebSocket.",
    icon: ShowIcon,
  },
  {
    title: "Act",
    description: "Human-approved response by default, opt-in reversible auto-ban.",
    icon: ActIcon,
  },
];

const TRUST_POINTS = [
  {
    title: "Raw logs never leave your machine",
    description:
      "Only structured findings and anomaly scores are ever sent anywhere you choose to forward them — never raw log lines.",
  },
  {
    title: "No LLM in the detection path",
    description:
      "Drain3 parsing, ONNX MiniLM embeddings, and Isolation Forest scoring all run locally, CPU-only.",
  },
  {
    title: "Bans require your confirmation",
    description:
      "IP banning is scoped to your own container and manual-confirm by default — Sentinal can suggest a ban, never force it.",
  },
];

const FAQS = [
  {
    question: "Does this replace a SIEM?",
    answer:
      "No. Sentinal is a lightweight, local-first companion for self-hosted setups and small servers — not a full enterprise SIEM replacement.",
  },
  {
    question: "What data leaves my machine?",
    answer:
      "Nothing, by default. Sentinal runs the whole loop — build, scan, detect, dashboard — on your box. Raw log lines never leave it.",
  },
  {
    question: "Can I run this without Docker?",
    answer:
      "Docker is how Sentinal builds and runs the container it's watching, so it's required for the current CLI.",
  },
  {
    question: "Is auto-response actually automatic?",
    answer:
      "Manual-confirm is the default for every action. Auto-ban is opt-in per target and only fires on sustained, high-confidence anomaly scores.",
  },
];

const PRIMARY_BUTTON =
  "btn-animated rounded-md bg-primary px-6 py-3 text-body-lg font-bold text-on-primary transition-all duration-200 ease-out hover:brightness-110 active:scale-[0.97]";
const SECONDARY_BUTTON =
  "btn-animated rounded-md border border-outline px-6 py-3 text-body-lg font-bold text-on-surface transition-all duration-200 ease-out hover:border-primary/40 hover:bg-surface-container-low active:scale-[0.97]";

export function Home() {
  return (
    <div className="space-y-24 pb-24">
      <section className="mx-auto max-w-4xl px-6 pt-20 text-center">
        <Reveal className="mb-6 flex justify-center">
          <Badge>Local-first security monitoring</Badge>
        </Reveal>
        <Reveal
          delayMs={100}
          as="h1"
          className="font-display text-display font-bold leading-[1.08] tracking-tighter text-balance text-on-surface"
        >
          Security monitoring for the machines you actually run.
        </Reveal>
        <Reveal
          delayMs={200}
          as="p"
          className="mx-auto mt-5 max-w-2xl text-body-lg leading-relaxed text-on-surface-variant"
        >
          Sentinal watches your local machine or self-hosted server, scans it for security
          issues, detects live attacks with a fully local anomaly pipeline, and gives you a
          dashboard to see and respond to it all — without shipping your raw logs anywhere.
        </Reveal>
        <Reveal delayMs={300} className="mt-9 flex justify-center gap-4">
          <Link to="/docs" className={PRIMARY_BUTTON}>
            Get started
          </Link>
          <Link to="/docs" className={SECONDARY_BUTTON}>
            Read the docs
          </Link>
        </Reveal>
        <Reveal delayMs={400} className="mt-14">
          <TerminalPreview lines={["sentinal watch ./my-app"]} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          className="text-center font-display text-headline-lg font-bold tracking-tighter text-balance text-on-surface"
        >
          Security tools that watch you back.
        </Reveal>
        <Reveal
          delayMs={80}
          as="p"
          className="mx-auto mt-3 max-w-xl text-center text-body-sm leading-relaxed text-on-surface-variant"
        >
          Most monitoring platforms ask you to trust a stranger with your incident data. Sentinal
          doesn't ask.
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <Reveal key={problem.number} delayMs={i * 90}>
              <NumberedCard {...problem} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-outline bg-surface-container-lowest py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delayMs={i * 90}>
                  <div className="group rounded-2xl border border-outline p-1 transition-all duration-200 ease-out hover:border-primary hover:shadow-lg hover:shadow-primary/5">
                    <div className="flex h-full flex-col rounded-xl bg-surface p-8 shadow-md shadow-black/20">
                      <Icon className="mb-6 h-9 w-9 text-primary" />
                      <h3 className="font-display text-headline-md font-semibold text-on-surface">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-body-sm leading-relaxed text-on-surface-variant">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <Reveal className="order-2 rounded-3xl border border-outline bg-surface-container p-10 shadow-md shadow-black/20 md:order-1">
            <div className="space-y-6">
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  <CheckCircleIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h4 className="font-bold text-on-surface">{point.title}</h4>
                    <p className="mt-1 text-body-sm leading-relaxed text-on-surface-variant">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delayMs={80} className="order-1 md:order-2">
            <h2 className="font-display text-headline-lg font-bold tracking-tighter text-balance text-on-surface">
              Why local-first
            </h2>
            <p className="mt-5 text-body-lg leading-relaxed text-on-surface-variant">
              Not a promise — a boundary built into the architecture.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 text-center">
        <Reveal as="h2" className="font-display text-headline-lg font-bold tracking-tighter text-on-surface">
          Runs entirely on your machine
        </Reveal>
        <Reveal delayMs={80} as="p" className="mx-auto mt-3 max-w-2xl text-body-sm text-on-surface-variant">
          One CLI does the whole loop — builds and runs your app's container, scans it, watches
          its logs with a fully local detection pipeline, and serves the dashboard on the same
          box. Nothing leaves your infrastructure except the structured findings you choose to
          forward.
        </Reveal>
        <div className="mt-12">
          <ArchitectureDiagram />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <Reveal
          as="h2"
          className="text-center font-display text-headline-lg font-bold tracking-tighter text-on-surface"
        >
          FAQ
        </Reveal>
        <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} delayMs={i * 90}>
              <FaqCard question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl px-6 py-20 text-center">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/5" />
          <h2 className="font-display text-4xl font-bold tracking-tighter text-balance text-on-surface">
            Run your own security monitoring.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg leading-relaxed text-on-surface-variant">
            Self-hosted, open-source, no data leaves your infrastructure.
          </p>
          <div className="mt-9 flex justify-center gap-4">
            <Link to="/docs" className={PRIMARY_BUTTON}>
              Get started
            </Link>
            <Link to="/docs" className={SECONDARY_BUTTON}>
              Read the docs
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
