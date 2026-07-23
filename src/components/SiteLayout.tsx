import { NavLink, Outlet } from "react-router-dom";
import { BackgroundAnimation } from "./BackgroundAnimation";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/docs", label: "Docs" },
];

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-on-surface">
      <BackgroundAnimation />
      <header className="sticky top-0 z-50 border-b border-outline bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <NavLink
            to="/"
            className="font-display text-headline-md font-bold tracking-tighter text-primary"
          >
            SENTINAL
          </NavLink>
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link pb-1 text-body-lg font-medium transition-colors duration-200 ease-out ${
                    isActive
                      ? "nav-link-active font-bold text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <a
            href="https://github.com/SahilSidhu7/Sentinal"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-outline px-3 py-1.5 text-body-sm text-on-surface transition-colors duration-200 ease-out hover:bg-surface-container-low"
          >
            GitHub
          </a>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-outline bg-surface-container-lowest py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
          <nav className="flex items-center gap-8 font-mono text-mono-label uppercase tracking-widest text-on-surface-variant">
            <NavLink to="/docs" className="transition-colors duration-200 ease-out hover:text-primary">
              Docs
            </NavLink>
            <a
              href="https://github.com/SahilSidhu7/Sentinal"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 ease-out hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://github.com/SahilSidhu7/Sentinal/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-200 ease-out hover:text-primary"
            >
              License
            </a>
          </nav>
          <p className="text-body-sm text-on-surface-variant">
            Sentinal — local-first security monitoring, no LLM in the detection path.
          </p>
        </div>
      </footer>
    </div>
  );
}
