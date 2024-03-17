/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/api/index.ts"],
  outDir: "./dist/api",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
});
