# Project Name 🚀

<!-- TEMPLATE: This README.template.md is a starter template. Copy parts into your real README.md and replace placeholders. -->

<details>
  <summary><strong>How to use this template (click to expand)</strong></summary>

1. Rename the title above to your project name and optionally add a logo right below it.
2. Add badges (build, tests, coverage, license) under the title.
3. Fill each section below with your actual project content (keep the section order if you like it).
4. Replace placeholder code blocks and bullet points with real commands and steps.
5. Update environment variable names and descriptions to match your application.
6. Keep the "Documentation" links if you want quick access to docs, or remove them in your final README.md.
7. Remove this guidance block after you finish customizing.

</details>

- Add your project logo.
- Write a short introduction to the project.
- If you are using badges, add them here.

<details>
  <summary><strong>Badge examples (optional)</strong></summary>

- Build: <code>![CI](https://img.shields.io/github/actions/workflow/status/ORG/REPO/build-nodejs-project.yml?label=CI)</code>
- License: <code>![License](https://img.shields.io/github/license/ORG/REPO)</code>
- Node: <code>![Node](https://img.shields.io/badge/node-%3E%3D22.13.0-brightgreen)</code>
- pnpm: <code>![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10.33.0-orange)</code>

</details>

## :beginner: About

Add a detailed introduction about the project here — what it does, who it is for, and what problem it solves.

## 📚 Documentation

- [API Documentation](docs/api/README.md)
- [Architecture Overview](docs/architecture/README.md)
- [Deployment Guide](docs/deployment/README.md)
- [Node.js Deployment](docs/deployment/node.md)
- [Contributing Guidelines](.github/CONTRIBUTING.md)

## Key Features

- **Feature 1**: Describe the main capability
- **Feature 2**: Describe another capability
- **Astro SSR**: Server output mode with `@astrojs/node` standalone adapter
- **React Islands**: Interactive components hydrated only where needed
- **Tailwind CSS + DaisyUI**: Utility-first styling with a custom theme
- **Quality Tools**: ESLint, oxfmt, Stylelint, lint-staged, Husky git hooks

## Prerequisites

- Node.js >= 22.13.0
- pnpm >= 10.33.0
- Docker & Docker Compose (optional)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ORG/REPO.git my-app

# Navigate to project directory
cd my-app

# Install dependencies and git hooks
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env and fill in required values

# Start the development server
pnpm dev
# → http://localhost:4321
```

## Project Structure

```
src/
├── components/
│   ├── TopNav.tsx          # sticky navigation bar (React island)
│   └── Footer.astro        # site footer
├── layouts/
│   └── BaseLayout.astro    # base HTML shell with head, nav, footer
├── pages/
│   ├── index.astro         # home page (statically pre-rendered)
│   ├── contact.astro       # contact page (SSR)
│   └── api/
│       └── contact.ts      # POST handler — sends email via Resend
└── styles/
    └── globals.css         # Tailwind base + custom global styles
```

## Adding Pages

Create a `.astro` file in `src/pages/`. Use `export const prerender = true` for static pages:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";

export const prerender = true;
---

<BaseLayout title="My Page" description="Page description">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold">My Page</h1>
  </section>
</BaseLayout>
```

## Adding React Islands

Create a `.tsx` file in `src/components/` and hydrate it in an Astro page:

```astro
---
import MyWidget from "@/components/MyWidget";
---

<MyWidget client:load />
```

## Scripts

| Command                   | Description                          |
| ------------------------- | ------------------------------------ |
| `pnpm dev`                | Start dev server at localhost:4321   |
| `pnpm build`              | Type-check + production build        |
| `pnpm preview`            | Preview the production build locally |
| `pnpm start`              | Run the built Node.js server         |
| `pnpm lint`               | Run ESLint                           |
| `pnpm lint:eslint:fix`    | Run ESLint with auto-fix             |
| `pnpm formatter:write`    | Format all files with oxfmt          |
| `pnpm formatter:check`    | Check formatting without writing     |
| `pnpm release`            | Cut a release with release-it        |

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Site
PUBLIC_SITE_URL=https://example.com

# Add your application-specific variables below
# RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# RESEND_FROM=noreply@example.com
# RESEND_TO=you@example.com
```

---

<details>
  <summary><strong>✅ Pre-publish checklist (remove in final README)</strong></summary>

- [ ] Title updated and logo added
- [ ] Badges added (CI, license, node, pnpm)
- [ ] About section completed
- [ ] Key features reflect your actual application
- [ ] Quick Start commands verified
- [ ] Project structure updated if you added/removed files
- [ ] Environment variables documented
- [ ] Links verified (docs, external resources)
- [ ] Guidance blocks removed before publishing

</details>

---

## 🧩 Boilerplate Architecture

- **Rendering**: Hybrid — static pre-rendering for content pages, SSR for dynamic routes and API endpoints
- **Component model**: Astro components for layout and static markup; React islands for interactive UI
- **Styling**: Tailwind CSS utility classes + DaisyUI component library with a custom light theme
- **State management**: Zustand available for client-side state in React islands
- **Email**: Resend API for transactional email from server-side API routes
- **GitHub Integration**: Issue templates, labels, Dependabot, and CI workflows
- **Quality Tools**: Code formatting, linting, and commit convention enforcement
- **Documentation**: Community guidelines and contribution process
