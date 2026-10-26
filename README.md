# Personal website

Code serving personal website & blog.

Astro builds the static homepage and blog served at `guillaumejones.com` by an assets-only Cloudflare Worker. Projects such as Hexfleet live in their own repositories and deploy their own Workers on routes under the same domain, e.g. `guillaumejones.com/hexfleet*`.

## Dev setup

```sh
nvm use
npm ci
npm run dev
```

## Deployment

Site is currently deployed to Cloudflare Workers as static assets (see `wrangler.jsonc`).
Sub-sites (ex. [Hexfleet](https://github.com/guillaume-jones/hexfleet)) are deployed from their own repositories.

For a manual deployment:

```sh
npm run deploy
```

For automatic deployment, connect this repository to Cloudflare Workers Builds with the repository root as the project root and `npm run deploy` as the deploy command. Wrangler runs the build itself, so no separate build command is needed. The Worker name is `personal-website`.
