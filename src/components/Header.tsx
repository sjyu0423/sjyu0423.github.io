import { site } from "@/data/site";

export function Header() {
  return (
    <header className="pt-8 sm:pt-12">
      <nav
        className="flex items-center justify-between gap-4 text-sm"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-medium tracking-tight text-foreground transition-colors duration-200 hover:text-accent"
        >
          {site.name}
        </a>
        <ul className="flex items-center gap-5 text-muted">
          <li>
            <a
              href="#projects"
              className="transition-colors duration-200 hover:text-foreground"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link transition-colors duration-200 hover:text-foreground"
            >
              GitHub
            </a>
          </li>
          {site.resumeUrl ? (
            <li>
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link transition-colors duration-200 hover:text-foreground"
              >
                Resume
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
