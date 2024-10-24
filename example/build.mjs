import * as esbuild from "esbuild";
import { debugSwitchPlugin } from "esbuild-plugin-debug-switch/plugin";

await Promise.all([
  esbuild.build({
    entryPoints: ["./src/main.ts"],
    outfile: "./dist/main.prod.js",
    bundle: true,
    minify: true,
    plugins: [
      debugSwitchPlugin({
        isDebug: false,
        env: { version: "1.0.0" },
      }),
    ],
  }),
  esbuild.build({
    entryPoints: ["./src/main.ts"],
    outfile: "./dist/main.dev.js",
    bundle: true,
    minify: true,
    plugins: [
      debugSwitchPlugin({
        isDebug: false,
        env: { version: "1.0.0" },
      }),
    ],
  }),
]);
