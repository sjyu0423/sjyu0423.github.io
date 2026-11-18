export type ProjectStatus =
  | "completed"
  | "ongoing"
  | "experimental"
  | "coming-soon";

export type Project = {
  id: string;
  name: string;
  description: string;
  /** GitHub repository URL. Omit until configured / keep private repos out. */
  githubUrl?: string;
  /** Dedicated project website. Prefer this over githubUrl when linking. */
  websiteUrl?: string;
  status?: ProjectStatus;
  /** Optional muted note (e.g. Steam coming-soon copy). */
  note?: string;
};

export type Subcategory = {
  id: string;
  name: string;
  projects: Project[];
};

export type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
};

/**
 * Project catalog — edit this file to add, rename, reorder, or move projects.
 * Prefer websiteUrl over githubUrl when both exist. Omit URLs until real ones exist.
 * Never add private repository URLs.
 */
export const categories: Category[] = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    subcategories: [
      {
        id: "language-models",
        name: "Language Models (LLM)",
        projects: [
          {
            id: "minigpt",
            name: "MiniGPT",
            description:
              "A small language model built and trained from scratch.",
            githubUrl: "https://github.com/sjyu0423/Mini_Chat",
            websiteUrl: "https://sjyu0423.github.io/Mini_Chat/",
            status: "experimental",
          },
        ],
      },
      {
        id: "prediction-representation",
        name: "Prediction & Representation Learning",
        projects: [
          {
            id: "minijepa",
            name: "MiniJEPA",
            description:
              "A project exploring learned representations and motion prediction.",
            githubUrl: "https://github.com/sjyu0423/Mini_JEPA",
            websiteUrl: "https://sjyu0423.github.io/Mini_JEPA/",
            status: "experimental",
          },
        ],
      },
      {
        id: "game-ai",
        name: "Game AI & Reinforcement Learning",
        projects: [
          {
            id: "pokermind",
            name: "PokerMind",
            description:
              "An adaptive poker AI using game theory and opponent modeling.",
            githubUrl: "https://github.com/sjyu0423/AI_Poker",
            websiteUrl: "https://sjyu0423.github.io/AI_Poker/",
            status: "ongoing",
          },
        ],
      },
    ],
  },
  {
    id: "software-apps",
    name: "Software & Applications",
    subcategories: [
      {
        id: "ai-applications",
        name: "AI Applications",
        projects: [
          {
            id: "contextai",
            name: "ContextAI",
            description: "A privacy-focused local AI assistant.",
            status: "ongoing",
          },
          {
            id: "qwennews",
            name: "QwenNews",
            description:
              "An automated tech news analysis and reporting system.",
            githubUrl: "https://github.com/sjyu0423/hackernewsreport",
            websiteUrl: "https://sjyu0423.github.io/hackernewsreport/",
            status: "ongoing",
          },
          {
            id: "marketmind",
            name: "MarketMind",
            description: "AI-assisted financial event analysis.",
            githubUrl: "https://github.com/sjyu0423/Stocker",
            status: "experimental",
          },
        ],
      },
      {
        id: "mobile-cv",
        name: "Mobile & Computer Vision",
        projects: [
          {
            id: "ar-macro",
            name: "AR Macro",
            description:
              "An experimental AR-based food portion estimation app.",
            githubUrl: "https://github.com/sjyu0423/MacroLens",
            websiteUrl: "https://macrolens-ruby.vercel.app/",
            status: "experimental",
          },
        ],
      },
    ],
  },
  {
    id: "games-experiments",
    name: "Games & Experiments",
    subcategories: [
      {
        id: "management-games",
        name: "Management Games",
        projects: [
          {
            id: "guildmaster",
            name: "Guildmaster.exe",
            description: "An adventurer guild management game.",
            status: "coming-soon",
            note: "Coming soon to Steam :)",
          },
        ],
      },
    ],
  },
];

/** Prefer the dedicated site when present; otherwise fall back to GitHub. */
export function getProjectHref(project: Project): string | undefined {
  if (project.status === "coming-soon") {
    return undefined;
  }
  return project.websiteUrl ?? project.githubUrl;
}

export function getStatusLabel(status: ProjectStatus): string {
  switch (status) {
    case "completed":
      return "Completed";
    case "ongoing":
      return "Ongoing";
    case "experimental":
      return "Experimental";
    case "coming-soon":
      return "Coming soon";
  }
}
