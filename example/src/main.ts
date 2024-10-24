import { env, isDebug } from "esbuild-plugin-debug-switch";

if (isDebug) {
  console.log("This is development mode!");
} else {
  console.log("This is production mode!");
}
console.log(`The version is ${env.version}`);
