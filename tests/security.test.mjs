import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repositoryRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (relativePath) =>
  readFileSync(join(repositoryRoot, relativePath), "utf8");

const removedProjectPaths = [
  "projects/404.html",
  "projects/assets",
  "projects/attached_assets",
  "projects/components.json",
  "projects/drizzle.config.ts",
  "projects/index.html",
  "projects/replit.md",
  "projects/server",
  "projects/shared",
  "projects/vite.config.static.ts",
];

const retainedUiComponents = new Set([
  "card.tsx",
  "toast.tsx",
  "toaster.tsx",
  "tooltip.tsx",
]);

test("the portfolio exposes only its static application surface", () => {
  for (const relativePath of removedProjectPaths) {
    const absolutePath = join(repositoryRoot, relativePath);
    if (!existsSync(absolutePath)) continue;
    assert.equal(
      statSync(absolutePath).isDirectory() && readdirSync(absolutePath).length === 0,
      true,
      `${relativePath} must not contain published or runnable files`,
    );
  }

  const uiDirectory = join(
    repositoryRoot,
    "projects/client/src/components/ui",
  );
  const uiFiles = new Set(readdirSync(uiDirectory));
  assert.deepEqual(uiFiles, retainedUiComponents);
  assert.equal(
    existsSync(join(repositoryRoot, "projects/client/src/lib/queryClient.ts")),
    false,
  );
  assert.equal(
    existsSync(join(repositoryRoot, "projects/client/src/hooks/use-mobile.tsx")),
    false,
  );
});

test("the portfolio has no stale prior-owner identity", () => {
  const forbidden = /jpgrigor|jgrigorian|jake grigorian/i;
  const extensions = new Set([".html", ".js", ".json", ".md", ".ts", ".tsx"]);
  const excludedNames = new Set(["node_modules", "dist"]);
  const matches = [];

  const visit = (path) => {
    for (const entry of readdirSync(path)) {
      if (excludedNames.has(entry) || entry === "package-lock.json") continue;
      const child = join(path, entry);
      if (statSync(child).isDirectory()) {
        visit(child);
      } else if (extensions.has(extname(entry))) {
        if (forbidden.test(readFileSync(child, "utf8"))) matches.push(child);
      }
    }
  };

  visit(join(repositoryRoot, "projects"));
  assert.deepEqual(matches, []);
  const contactPage = read("projects/client/src/pages/ContactPage.tsx");
  assert.match(contactPage, /mailto:bryan@bryan-porter\.com/);
  assert.doesNotMatch(contactPage, /window\.open\(/);
});

test("the static build is scoped to /projects and uses hash routing", () => {
  const viteConfig = read("projects/vite.config.ts");
  assert.match(viteConfig, /base:\s*["']\/projects\//);
  assert.match(viteConfig, /sourcemap:\s*false/);
  assert.doesNotMatch(viteConfig, /replit|server:/i);

  const main = read("projects/client/src/main.tsx");
  assert.match(main, /useHashLocation/);
  assert.match(main, /<Router\s+hook=\{useHashLocation\}>/);

  const blogPostPage = read("projects/client/src/pages/BlogPostPage.tsx");
  assert.doesNotMatch(blogPostPage, /window\.location\.href|window\.history\.back/);
  assert.match(
    blogPostPage,
    /setLocation\(`\/post\/\$\{relatedPost\.slug\}`\)/,
  );
});

test("the portfolio page has a restrictive browser policy and no dev banner", () => {
  const html = read("projects/client/index.html");
  assert.match(html, /http-equiv=["']Content-Security-Policy["']/i);
  assert.match(html, /default-src 'none'/);
  assert.match(html, /script-src 'self'/);
  assert.match(html, /connect-src 'none'/);
  assert.match(html, /form-action 'none'/);
  assert.match(html, /name=["']referrer["'][^>]+content=["']no-referrer["']/i);
  assert.doesNotMatch(html, /replit|googletagmanager|fonts\.googleapis/i);
});

test("the JavaScript dependency surface is minimal, exact, and supported", () => {
  const packageJson = JSON.parse(read("projects/package.json"));
  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), [
    "@radix-ui/react-toast",
    "@radix-ui/react-tooltip",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "react",
    "react-dom",
    "tailwind-merge",
    "wouter",
  ]);
  assert.deepEqual(Object.keys(packageJson.devDependencies).sort(), [
    "@tailwindcss/typography",
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "autoprefixer",
    "postcss",
    "tailwindcss",
    "tailwindcss-animate",
    "typescript",
    "vite",
  ]);
  for (const version of [
    ...Object.values(packageJson.dependencies),
    ...Object.values(packageJson.devDependencies),
  ]) {
    assert.match(version, /^\d+\.\d+\.\d+$/, `${version} must be exact`);
  }
  assert.match(packageJson.engines.node, />=22\.12/);
  assert.equal(packageJson.scripts.start, undefined);
  assert.equal(packageJson.scripts.dev.includes("--host"), false);
  assert.equal(packageJson.scripts.audit, "npm audit --audit-level=moderate");
});

test("the main site minimizes analytics data and blocks inline scripts", () => {
  const layout = read("_layouts/default.html");
  assert.match(layout, /http-equiv=["']Content-Security-Policy["']/i);
  assert.match(layout, /script-src 'self' https:\/\/www\.googletagmanager\.com/);
  assert.doesNotMatch(layout, /script-src[^;]+unsafe-inline/);
  assert.match(layout, /name=["']referrer["']/i);

  const include = read("_includes/google_analytics.html");
  assert.doesNotMatch(include, /<script>\s*/);
  assert.match(include, /assets\/js\/analytics\.js/);

  const analytics = read("assets/js/analytics.js");
  assert.match(analytics, /window\.location\.origin\s*\+\s*window\.location\.pathname/);
  assert.match(analytics, /page_referrer:\s*["']{2}/);
  assert.match(analytics, /analytics_storage:\s*["']denied["']/);
  assert.match(analytics, /allow_google_signals:\s*false/);
  assert.match(analytics, /allow_ad_personalization_signals:\s*false/);
});

test("the deployment and security workflows use immutable, least-privilege actions", () => {
  const workflowPaths = [
    ".github/workflows/deploy.yml",
    ".github/workflows/security.yml",
  ];
  for (const workflowPath of workflowPaths) {
    const workflow = read(workflowPath);
    const uses = [...workflow.matchAll(/uses:\s*([^\s#]+)/g)].map(
      (match) => match[1],
    );
    assert.ok(uses.length > 0, `${workflowPath} must use at least one action`);
    for (const action of uses) {
      assert.match(action, /@[0-9a-f]{40}$/i, `${action} must be immutable`);
    }
    assert.match(
      workflow,
      /bundle exec ruby tests\/verify_jekyll_output\.rb/,
      `${workflowPath} must verify generated discovery files`,
    );
  }

  const deploy = read(".github/workflows/deploy.yml");
  const preJobs = deploy.split(/^jobs:/m)[0];
  assert.doesNotMatch(preJobs, /pages:\s*write|id-token:\s*write/);
  assert.match(deploy, /deploy:[\s\S]+pages:\s*write[\s\S]+id-token:\s*write/);
  assert.match(deploy, /npm ci --prefix projects/);
  assert.match(deploy, /npm audit --prefix projects --audit-level=moderate/);
  assert.match(deploy, /bundle-audit check --update/);
});

test("lockfiles, secret ignores, update policy, and disclosure policy exist", () => {
  assert.equal(existsSync(join(repositoryRoot, "Gemfile.lock")), true);
  assert.match(read("Gemfile"), /gem ["']jekyll-sitemap["'], ["']1\.4\.0["']/);
  assert.match(read("_config.yml"), /^\s+- jekyll-sitemap\s*$/m);
  const gitignore = read(".gitignore");
  assert.doesNotMatch(gitignore, /^Gemfile\.lock$/m);
  assert.match(gitignore, /^\.env\*$/m);
  assert.match(gitignore, /^!\.env\.example$/m);
  assert.equal(existsSync(join(repositoryRoot, ".github/dependabot.yml")), true);
  assert.equal(existsSync(join(repositoryRoot, "SECURITY.md")), true);
  assert.match(read("_config.yml"), /exclude:\s*\n(?:\s+-.*\n)*\s+- projects\s*$/m);
});
