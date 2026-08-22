# Movie Knowledge Base CI/CD with GitHub Actions

Reel Atlas is a static Movie Knowledge Base generated with [Eleventy](https://www.11ty.dev/) and deployed to GitHub Pages. It includes a discoverable home page, a film index, and individual entries with categories, descriptions, release years, and ratings.

## Objectives

- Build a maintainable static knowledge base with Eleventy.
- Validate generated HTML, navigation, assets, and movie information automatically.
- Run a three-stage GitHub Actions pipeline: test, build, and deploy.
- Publish the generated `_site/` directory to GitHub Pages.

## Technologies

Eleventy 3, Node.js 20, npm, GitHub Actions, GitHub Pages, and GitHub CLI.

## Project files and implementation

This project uses Markdown for movie content, Nunjucks for the shared page layout, and Eleventy to generate a static website.

| File or folder | Purpose |
| --- | --- |
| `src/index.md` | Homepage content and featured movie entry |
| `src/movies/*.md` | Movie index and individual movie knowledge-base entries |
| `src/_includes/layout.njk` | Shared HTML layout, navigation, metadata, and footer |
| `src/_data/site.json` | Site name and global site information |
| `src/css/site.css` | Website styling and responsive layout |
| `src/images/` | Image and visual assets copied to the generated site |
| `.eleventy.js` | Eleventy input/output folders, templates, path prefix, and asset copying |
| `script/test-site.js` | Checks generated pages, assets, navigation, and movie data |
| `.github/workflows/frontend-ci-cd.yml` | Runs linting, tests, Eleventy build, and GitHub Pages deployment |
| `evidence/` | Screenshots documenting the rendered home page and film index |

The main commands are `npm run lint` for JavaScript checks, `npm test` for the build and site validation, and `npm run build` to generate the `_site/` folder.

## Project structure

```text
src/                     Eleventy input, Markdown entries, templates, and CSS
script/test-site.js      Generated-site validation
.eleventy.js             Eleventy paths, passthrough assets, and pathPrefix
.github/workflows/       CI/CD workflow
_site/                   Generated output (ignored by Git)
```

## Local setup

```bash
npm ci
npm run lint
npm test
npm run build
npm run test:site
```

The site is generated in `_site/`. Open `_site/index.html` in a browser for a local preview.

## GitHub Actions

`frontend-ci-cd.yml` runs on pushes and pull requests targeting `main` when source, package, configuration, script, or workflow files change. It also supports `workflow_dispatch`. Concurrency uses the workflow name and Git reference, and cancels older runs when a newer run starts.

The `test` job runs on `ubuntu-latest`, checks out the repository, installs Node 20, restores the `node_modules` cache, runs linting, runs `npm test`, and invokes `npm run test:site`. Repository variables `SITE_NAME` and `PROJECT_REPOSITORY` are exposed at job level and consumed by the configuration display step. Defaults make the workflow usable before variables are created.

The `build` job requires `test` to pass. It restores the same cache, builds Eleventy with `PATH_PREFIX=/<repository-name>/`, and uploads `_site/` through `actions/upload-pages-artifact@v3`.

The `deploy` job requires `build`, targets the `github-pages` environment, and uses `actions/deploy-pages@v4`. After deployment, authenticated `gh` creates a summary issue using `GITHUB_TOKEN`, including the commit, branch, Pages URL, workflow run, and validation status.

## Permissions and Pages setup

The workflow requests only `contents: read`, `pages: write`, `id-token: write`, and `issues: write`. In repository settings, enable Pages with **Source: GitHub Actions**. The published URL will be:

GitHub repository: https://github.com/pavankalyanbabu/movie-knowledge-base

Published Knowledge Base website: https://pavankalyanbabu.github.io/movie-knowledge-base/

`PATH_PREFIX` is derived from `github.event.repository.name`, so CSS, links, and pages resolve correctly beneath the repository path. Add optional repository variables under **Settings > Secrets and variables > Actions > Variables**:

| Variable | Example |
| --- | --- |
| `SITE_NAME` | `Reel Atlas` |
| `PROJECT_REPOSITORY` | `owner/movie-knowledge-base` |

## Custom validation

`script/test-site.js` checks that the home page, movie index, all movie entries, and CSS are generated. It also verifies navigation links, required headings, years, categories, and expected movie information. The test exits non-zero when any assertion fails, so the test job stops the pipeline.