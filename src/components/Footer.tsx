import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pt-8 pb-12 text-sm text-muted sm:mt-32">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {site.copyrightYear} {site.name}
        </p>
        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="arrow-link w-fit transition-colors duration-200 hover:text-foreground"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
