> ## 🤔 What is this template all about?
>
> - This template can be used as a base layer for a server-rendered Astro application with React islands.
> - Make the project easy to maintain with **8 issue templates**.
> - Quick-start documentation
> - Manage issues with **20 issue labels**.
> - Make _community healthier_ with all the guides like code of conduct, contributing, support, security...
> - Learn more with the [official GitHub guide on creating repositories from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template).
> - To start using it, click **[Use this template](https://github.com/IQKV/standard-ui-blank-astro-daisyui-ssr/generate)** to create your new repository.

---

# Astro + DaisyUI Application Template

A GitHub template for quickly bootstrapping Astro applications with React islands, Tailwind CSS, and DaisyUI.

## Overview

This template provides a standardized foundation for developing web applications using Astro in server output mode with the Node.js standalone adapter. It ships with React islands for interactive components, Tailwind CSS + DaisyUI for styling, a contact form backed by Resend, and a full quality toolchain. For detailed documentation, please refer to the [docs](./docs) directory.

## Template Customization

To use this template for your own project:

1. Click the **[Use this template](https://github.com/IQKV/standard-ui-blank-astro-daisyui-ssr/generate)** button at the top of the repository
2. Name your repository and provide a description
3. Choose the repository visibility (public or private)
4. Click **Create repository from template**

After creating your repository:

1. Update the project `name`, `version`, and `description` in `package.json`
2. Replace `MyApp` references in `src/components/TopNav.tsx`, `src/components/Footer.astro`, and `src/layouts/BaseLayout.astro`
3. Set `site` in `astro.config.mjs` to your production URL
4. Copy `.env.example` to `.env` and fill in your Resend credentials
5. Update this `README.md` with your project-specific information
6. Review and adjust GitHub workflows in `.github/workflows` as needed

## Quick Links

- [API Documentation](./docs/api/README.md)
- [Architecture Overview](./docs/architecture/README.md)
- [Deployment Guide](./docs/deployment/README.md)
- [Node.js Deployment](./docs/deployment/node.md)
- [Contributing Guidelines](.github/CONTRIBUTING.md)

## Key Features

- **Astro SSR**: Server output mode with `@astrojs/node` standalone adapter; static pages opt in via `export const prerender = true`
- **React Islands**: Interactive components hydrated with `client:load` — only ship JS where needed
- **Tailwind CSS + DaisyUI**: Utility-first styling with a custom light theme and pre-built component library
- **Contact Form**: Server-side form handler at `/api/contact` powered by [Resend](https://resend.com)
- **shadcn/ui ready**: `components.json` configured for drop-in shadcn component installation
- **Quality Tools**: ESLint (Astro + React + TypeScript), oxfmt formatter, Stylelint, lint-staged, Husky git hooks
- **GitHub Integration**: Issue templates, labels, Dependabot, and CI workflows
- **Documentation**: Community guidelines and contribution process

## Prerequisites

- Node.js >= 22.13.0
- pnpm >= 10.33.0
- Docker & Docker Compose (optional, for containerized deployment)

## Quick Start

```bash
# Clone the repository
git clone https://github.com/IQKV/standard-ui-blank-astro-daisyui-ssr.git my-app

# Navigate to project directory
cd my-app

# Install dependencies and git hooks
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env and fill in RESEND_API_KEY, RESEND_FROM, RESEND_TO

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

## Scripts

| Command                | Description                          |
| ---------------------- | ------------------------------------ |
| `pnpm dev`             | Start dev server at localhost:4321   |
| `pnpm build`           | Type-check + production build        |
| `pnpm preview`         | Preview the production build locally |
| `pnpm start`           | Run the built Node.js server         |
| `pnpm lint`            | Run ESLint                           |
| `pnpm lint:eslint:fix` | Run ESLint with auto-fix             |
| `pnpm formatter:write` | Format all files with oxfmt          |
| `pnpm formatter:check` | Check formatting without writing     |
| `pnpm release`         | Cut a release with release-it        |

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# Site
PUBLIC_SITE_URL=https://example.com

# Resend (https://resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM=noreply@example.com
RESEND_TO=you@example.com
```

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## Contributing

Please read our [Contributing Guidelines](.github/CONTRIBUTING.md) and [Code of Conduct](.github/CODE_OF_CONDUCT.md).
