# Copilot Instructions

## Version Bumping

When committing changes, always bump the `version` field in `package.json` using [semver](https://semver.org/):

- **Patch** (e.g. 1.0.0 → 1.0.1): bug fixes, style tweaks, minor adjustments.
- **Minor** (e.g. 1.0.1 → 1.1.0): new features, new config options, non-breaking enhancements.
- **Major** (e.g. 1.1.0 → 2.0.0): breaking changes, config format changes, dropped compatibility.

Include the version bump in the same commit as the code changes.
