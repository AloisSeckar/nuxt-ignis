---
name: bump-deps
description: Use when user invokes it by `/bump-deps` command to bump dependencies in a project.
---

1. Run `node .agents/skills/bump-deps/bump-deps.js` from the project root and read its printed report.
2. From the report:
   - **Applied - manual check** - tell the user exactly which packages were added to `minimumReleaseAgeExclude` and must be checked manually.
   - **Majors available (not applied)** - tell the user for each one and suggest creating an issue to bump it manually. Do **NOT** update automatically.
   - **Fetch failures (skipped)** - tell the user which packages could not be checked and should be re-checked by re-running the script.
3. Remind the user to run `pnpm install` (do **NOT** run it yourself) to install new deps, and `pnpm modules-publish` (do **NOT** run it yourself) to properly refresh deps in internal modules.
