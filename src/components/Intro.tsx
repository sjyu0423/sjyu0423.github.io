import { site } from "@/data/site";

export function Intro() {
  return (
    <section className="mt-16 sm:mt-24" aria-labelledby="intro-heading">
      <h1
        id="intro-heading"
        className="font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl"
      >
        Hi, I&apos;m {site.shortName}.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
        I enjoy building AI, programming, and experimenting with new ideas. I
        like learning how things work and turning interesting ideas into real
        projects.
      </p>
      <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <li>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link text-accent transition-colors duration-200 hover:text-foreground"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="arrow-link text-muted transition-colors duration-200 hover:text-foreground"
          >
            Projects
          </a>
        </li>
        {site.resumeUrl ? (
          <li>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link text-muted transition-colors duration-200 hover:text-foreground"
            >
              Resume
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
