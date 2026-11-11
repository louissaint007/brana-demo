import { cp, mkdir, rm, copyFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const assets = resolve(dist, "assets");

await rm(dist, { recursive: true, force: true });
await mkdir(assets, { recursive: true });
await copyFile(resolve(root, "src/index.html"), resolve(dist, "index.html"));
await copyFile(resolve(root, "src/styles.css"), resolve(dist, "styles.css"));
await copyFile(resolve(root, "src/app.js"), resolve(dist, "app.js"));
for (const file of ["prestige-side.jpg", "prestige-label.jpg", "malta-front.jpg", "malta-back.jpg", "guinness-reference.HEIC"]) {
  await copyFile(resolve(root, "assets", file), resolve(assets, file));
}
console.log("Build statique terminé dans dist/.");
