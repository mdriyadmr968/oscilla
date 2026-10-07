# Contributing to Oscilla

Thank you for your interest in contributing to Oscilla Haute Horlogerie.

---

## Code Standards & Guidelines

1. **Next.js App Router Conventions:**
   - Use Server Components where possible for static data rendering and SEO.
   - Use `"use client"` only where user interactivity or hooks (`useState`, `useSyncExternalStore`, Zustand) are required.
   - Wrap dynamic client components accessing search parameters in `<Suspense>` boundaries.

2. **TypeScript:**
   - Maintain strict typing; avoid `any`.
   - All horological specifications must adhere to interfaces defined in `src/lib/types.ts`.

3. **Styling & Theme:**
   - Adhere to the luxury dark theme defined in `src/app/globals.css`.
   - Maintain gold accent conventions: `#d4af37` (`text-amber-400`, `gold-gradient-text`).
   - Use Tailwind utility classes with `cn()` from `src/lib/utils.ts`.

4. **Linting & Verification:**
   Before committing, verify that both linting and production builds pass with zero errors:
   ```bash
   npm run lint
   npm run build
   ```

5. **Git Commit Conventions:**
   Use Conventional Commits format:
   - `feat(...)`: New feature or capability
   - `fix(...)`: Bug fix or calculation resolution
   - `docs(...)`: Documentation additions or updates
   - `refactor(...)`: Code refactoring without behavioral change
