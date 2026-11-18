"use client";

import { useId, useState } from "react";
import {
  categories,
  getProjectHref,
  getStatusLabel,
  type Category,
  type Project,
  type Subcategory,
} from "@/data/projects";

type Selection = {
  categoryId: string;
  subcategoryId: string;
};

function findDefaultSelection(): Selection {
  const first = categories[0];
  const firstSub = first?.subcategories[0];
  return {
    categoryId: first?.id ?? "",
    subcategoryId: firstSub?.id ?? "",
  };
}

function getSubcategory(
  categoryId: string,
  subcategoryId: string,
): Subcategory | undefined {
  const category = categories.find((item) => item.id === categoryId);
  return category?.subcategories.find((item) => item.id === subcategoryId);
}

export function ProjectBrowser() {
  const [openCategoryIds, setOpenCategoryIds] = useState<string[]>(() => {
    const first = categories[0];
    return first ? [first.id] : [];
  });
  const [selection, setSelection] = useState<Selection>(findDefaultSelection);
  const baseId = useId();

  const selectedSubcategory = getSubcategory(
    selection.categoryId,
    selection.subcategoryId,
  );

  function toggleCategory(categoryId: string) {
    setOpenCategoryIds((current) =>
      current.includes(categoryId)
        ? current.filter((id) => id !== categoryId)
        : [...current, categoryId],
    );
  }

  function selectSubcategory(category: Category, subcategory: Subcategory) {
    setSelection({
      categoryId: category.id,
      subcategoryId: subcategory.id,
    });
    if (!openCategoryIds.includes(category.id)) {
      setOpenCategoryIds((current) => [...current, category.id]);
    }
  }

  return (
    <section
      id="projects"
      className="mt-20 scroll-mt-8 sm:mt-28"
      aria-labelledby="projects-heading"
    >
      <h2
        id="projects-heading"
        className="text-sm font-medium uppercase tracking-[0.14em] text-subtle"
      >
        Projects
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        Browse by category, then subcategory.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-1">
          {categories.map((category) => {
            const isOpen = openCategoryIds.includes(category.id);
            const panelId = `${baseId}-${category.id}-panel`;
            const buttonId = `${baseId}-${category.id}-button`;

            return (
              <div key={category.id} className="border-b border-border">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-[0.95rem] font-medium text-foreground transition-colors duration-200 hover:text-accent"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span>{category.name}</span>
                    <span
                      aria-hidden="true"
                      className={`text-subtle transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    >
                      ›
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={
                    isOpen
                      ? "animate-[fade-in_200ms_ease-out]"
                      : undefined
                  }
                >
                  <ul className="pb-3 pl-1" role="list">
                    {category.subcategories.map((subcategory) => {
                      const isActive =
                        selection.categoryId === category.id &&
                        selection.subcategoryId === subcategory.id;

                      return (
                        <li key={subcategory.id}>
                          <button
                            type="button"
                            className={`w-full rounded-sm px-2 py-2 text-left text-sm transition-colors duration-200 ${
                              isActive
                                ? "bg-accent-soft text-accent"
                                : "text-muted hover:bg-surface hover:text-foreground"
                            }`}
                            aria-current={isActive ? "true" : undefined}
                            onClick={() =>
                              selectSubcategory(category, subcategory)
                            }
                          >
                            {subcategory.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="min-w-0"
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedSubcategory ? (
            <ProjectPanel subcategory={selectedSubcategory} />
          ) : (
            <p className="text-sm text-muted">Select a subcategory.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectPanel({ subcategory }: { subcategory: Subcategory }) {
  return (
    <div>
      <h3 className="text-base font-medium text-foreground">
        {subcategory.name}
      </h3>
      <ul className="mt-4 divide-y divide-border border-y border-border" role="list">
        {subcategory.projects.map((project) => (
          <li key={project.id}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const href = getProjectHref(project);
  const isComingSoon = project.status === "coming-soon";
  const statusLabel =
    project.status && project.status !== "coming-soon"
      ? getStatusLabel(project.status)
      : undefined;
  const showGithubAside =
    Boolean(href && project.websiteUrl && project.githubUrl);

  const content = (
    <>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-medium text-foreground">{project.name}</span>
        {statusLabel ? (
          <span className="text-xs uppercase tracking-[0.08em] text-subtle">
            {statusLabel}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
    </>
  );

  if (!href) {
    return (
      <div className="py-4">
        {content}
        {isComingSoon && project.note ? (
          <p className="mt-2 text-xs italic text-subtle">{project.note}</p>
        ) : (
          <p className="mt-2 text-xs text-subtle">Link coming soon</p>
        )}
      </div>
    );
  }

  return (
    <div className="py-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start justify-between gap-4 rounded-sm transition-colors duration-200 hover:bg-surface/60 focus-visible:bg-surface/60"
      >
        <div className="min-w-0">{content}</div>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent group-focus-visible:translate-x-0.5 group-focus-visible:text-accent"
        >
          →
        </span>
      </a>
      {showGithubAside ? (
        <p className="mt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-subtle transition-colors duration-200 hover:text-accent"
          >
            GitHub
          </a>
        </p>
      ) : null}
    </div>
  );
}
