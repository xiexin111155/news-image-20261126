// news-image-20261126 entry point.
//
// The front-page image ships in this repository as entry.png.b64 (base64
// text, so the whole entry stays pushable as plain text files). At run time
// we decode it and write the PNG bytes to the output directory the harness
// names: $MAKEFUN_OUTPUT_DIR, or /output when that is unset.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const encoded = readFileSync(join(repoDir, "entry.png.b64"), "utf8").replace(/\s+/g, "");
const pngBytes = Buffer.from(encoded, "base64");
if (pngBytes.length === 0) {
  throw new Error("entry.png.b64 decoded to zero bytes; the stored image is missing");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.png");
writeFileSync(outPath, pngBytes);
console.log(`wrote ${pngBytes.length} bytes to ${outPath}`);
