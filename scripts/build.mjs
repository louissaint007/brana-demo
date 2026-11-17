import { cp, mkdir, rm, copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const assets = resolve(dist, "assets");
const vendor = resolve(dist, "vendor");
const buildId = Date.now().toString(36);

await rm(dist, { recursive: true, force: true });
await mkdir(assets, { recursive: true });
await mkdir(vendor, { recursive: true });
await copyFile(resolve(root, "src/index.html"), resolve(dist, "index.html"));
await copyFile(resolve(root, "src/styles.css"), resolve(dist, "styles.css"));
await copyFile(resolve(root, "src/app.js"), resolve(dist, "app.js"));
await copyFile(resolve(root, "src/scene3d.js"), resolve(dist, "scene3d.js"));
for (const file of ["three.module.js", "three.core.js"]) {
  await copyFile(resolve(root, "node_modules/three/build", file), resolve(vendor, file));
}
await copyFile(resolve(root, "node_modules/three/LICENSE"), resolve(vendor, "LICENSE"));
for (const file of ["prestige-side.jpg", "prestige-label.jpg", "malta-front.jpg", "malta-back.jpg", "label-guinness.jpg", "label-guinness-back.jpg", "preview-guinness.jpg", "label-prestige.jpg", "label-prestige-front.jpg", "label-malta.jpg", "label-malta-back.jpg", "preview-prestige.jpg", "preview-malta.jpg", "label-prestige-front-round.webp", "label-guinness-front-round.webp", "label-malta-front-round.webp", "studio-backdrop.jpg", "reflection-studio.jpg", "reference-prestige-render.png", "reference-guinness-render.png", "reference-malta-render.png", "reference-prestige-back-render.webp", "reference-guinness-back-render.webp", "reference-malta-back-render.webp", "reference-prestige-shell-front.webp", "reference-guinness-shell-front.webp", "reference-malta-shell-front.webp", "label-prestige-back-generated.svg", "label-guinness-back-generated.svg", "label-malta-back-generated.svg"]) {
  await copyFile(resolve(root, "assets", file), resolve(assets, file));
}

for (const file of ["index.html", "styles.css", "app.js", "scene3d.js"]) {
  const path = resolve(dist, file);
  let contents = await readFile(path, "utf8");
  if (file === "index.html") {
    contents = contents
      .replace('href="styles.css"', `href="styles.css?v=${buildId}"`)
      .replace('src="app.js"', `src="app.js?v=${buildId}"`);
  }
  if (file === "app.js") {
    contents = contents.replace("'./scene3d.js'", `'./scene3d.js?v=${buildId}'`);
  }
  if (file === "scene3d.js") {
    contents = contents.replace("'./vendor/three.module.js'", `'./vendor/three.module.js?v=${buildId}'`);
  }
  contents = contents.replace(/(["'])assets\/([^"']+)\1/g, (_, quote, asset) => `${quote}assets/${asset}?v=${buildId}${quote}`);
  await writeFile(path, contents);
}

console.log(`Build statique terminé dans dist/ (${buildId}).`);
