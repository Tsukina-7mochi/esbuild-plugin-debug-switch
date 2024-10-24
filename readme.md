# esbuild-plugin-debug-switch

A plugin to switch between production build and development build.
This plugin works great when static brunch is removed by esbuild optimization (`minify = true`).

## Usage

Import `esbuild-plugin-debug-switch` in your source file:

```typescript
# main.ts
import { isDebug } from 'esbuild-plugin-debug-switch';

if(isDebug) {
  console.log('This is development mode!');
} else {
  console.log('This is production mode!');
}
```

And run build with the plugin as the following:

```typescript
# build.ts
import * as esbuild from 'esbuild';
import { debugSwitchPlugin } from 'esbuild-plugin-debug-switch/plugin';

const isDebug = true;

await esbuild.build({
  entryPoints: ['main.ts'],
  outfile: 'main.dev.js',
  bundle: true,
  minify: true,
  plugins: [debugSwitchPlugin({ isDebug })],
}),
```

The output will be like:

```javascript
(()=>{console.log("This is development mode!");})();
```

or

```
(()=>{console.log("This is production mode!");})();
```

### Import plugin with alternative name

When importing the plugin with the other name than `esbuild-plugin-debug-switch`,
you have to specify the `filter` to make plugin find the import.

```typescript
# main.ts
import { isDebug } from 'debug-switch';
```

```typescript
# build.ts
import * as esbuild from 'esbuild';
import { debugSwitchPlugin } from 'esbuild-plugin-debug-switch/plugin';

const isDebug = true;

await esbuild.build({
  entryPoints: ['main.ts'],
  outfile: 'main.dev.js',
  bundle: true,
  minify: true,
  plugins: [
    debugSwitchPlugin({
      isDebug,
      filter: /^debug-switch$/,
    }
  )],
}),
```

## Runtime Support

| Runtime | Support |
| ------- | ------- |
| Deno    | ✓      |
