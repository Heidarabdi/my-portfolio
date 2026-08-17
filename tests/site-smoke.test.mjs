import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";

const dist = join(process.cwd(), "dist");

test("all expected static routes are generated", async () => {
  const routes = [
    "index.html",
    "404.html",
    "about/index.html",
    "blog/index.html",
    "blog/ai-integration/index.html",
    "blog/it-support/index.html",
    "blog/web-accessibility/index.html",
    "contact/index.html",
    "projects/index.html",
    "rss.xml",
  ];

  await Promise.all(
    routes.map(async (route) => {
      await access(join(dist, route));
    }),
  );
});

test("the generated RSS feed contains the blog entries", async () => {
  const rss = await readFile(join(dist, "rss.xml"), "utf8");

  assert.match(rss, /ai-integration/);
  assert.match(rss, /it-support/);
  assert.match(rss, /web-accessibility/);
});
