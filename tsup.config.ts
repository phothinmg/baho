/* cspell:disable */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["daytime.ts"],
  outDir: "./daytime",
  splitting: true,
  sourcemap: true,
  dts: true,
  format: "esm",
  bundle: true,
  treeshake: true,
  minify: true,
});
