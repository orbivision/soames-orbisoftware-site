import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';
import soamesTheme from 'soames-astro-theme';

// Local dev/build: load .env into process.env so the theme integration can read
// WORDPRESS_GRAPHQL_URL / WORDPRESS_BASE_URL. On Netlify there is no .env (it's
// untracked) — the value comes from the site's build environment variables, so
// only load the file when it actually exists (loadEnvFile throws otherwise).
if (existsSync('.env')) process.loadEnvFile?.('.env'); // Node 20.12+/22+

const wordpressUrl = process.env.WORDPRESS_GRAPHQL_URL;

// Fail loudly rather than falling back to a default endpoint. soames-site can
// afford a fallback because the fallback IS its own WordPress; here the only
// correct endpoint is orbivision.net, and silently building orbisoftware.com
// against the wrong WordPress is a worse outcome than a stopped build.
if (!wordpressUrl) {
  throw new Error(
    'WORDPRESS_GRAPHQL_URL is not set, so there is no WordPress to read content from.\n' +
      'Copy .env.example to .env and set it to the WPGraphQL endpoint:\n' +
      '  WORDPRESS_GRAPHQL_URL=https://orbivision.net/graphql\n' +
      'On Netlify set it as a build environment variable instead.',
  );
}

export default defineConfig({
  output: 'static',
  integrations: [soamesTheme({ wordpressUrl })],
});
