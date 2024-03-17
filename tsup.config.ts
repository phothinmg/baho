/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/sun/index.ts"],
  outDir: "./dist/suntimes",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
});
