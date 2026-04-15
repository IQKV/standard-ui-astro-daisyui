# Astro Boilerplate

Minimal starter template built with Astro, React, Tailwind CSS, and DaisyUI.

## Stack

- [Astro](https://astro.build/) — static site generator with React islands
- [React](https://react.dev/) — interactive components
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) — styling
- [TypeScript](https://www.typescriptlang.org/) — type safety

## Getting Started

**Requirements:** Node.js >= 22.13.0, pnpm >= 10.33.0

```bash
pnpm install
pnpm dev       # development server
pnpm build     # type-check + production build
pnpm preview   # preview production build
```

## Project Structure

```
src/
├── components/
│   ├── TopNav.tsx        # navigation bar
│   └── Footer.astro      # footer
├── layouts/
│   └── BaseLayout.astro  # base HTML shell
├── pages/
│   └── index.astro       # home page
└── styles/
    └── globals.css       # global styles
```

## Adding Pages

Create a `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
---

<BaseLayout title="My Page">
  <div class="container mx-auto px-4 py-16">
    <h1>My Page</h1>
  </div>
</BaseLayout>
```

## Scripts

| Command                | Description              |
| ---------------------- | ------------------------ |
| `pnpm dev`             | Start dev server         |
| `pnpm build`           | Build for production     |
| `pnpm preview`         | Preview production build |
| `pnpm lint`            | Run ESLint               |
| `pnpm formatter:write` | Format code              |

## License

Apache-2.0
