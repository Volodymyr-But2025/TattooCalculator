import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(resolve(root, "public/pwa-source.svg"), "utf8");

function render(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "#4f46e5",
  });
  return resvg.render().asPng();
}

const outputs = [
  ["public/icon-192.png", 192],
  ["public/icon-512.png", 512],
  ["public/icon-512-maskable.png", 512],
  ["public/apple-touch-icon.png", 180],
];

for (const [relative, size] of outputs) {
  writeFileSync(resolve(root, relative), render(size));
  console.log(`wrote ${relative} (${size}x${size})`);
}
