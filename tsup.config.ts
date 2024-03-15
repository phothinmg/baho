/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/sun.ts"],
  outDir: "./sun",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
});
