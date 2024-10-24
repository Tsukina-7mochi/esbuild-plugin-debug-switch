# esbuild-plugin-debug-switch

A plugin to switch debug mode to be enabled or disabled in the build.
This plugin works great when static branches are to be removed by esbuild
optimization (`minify = true`).

## Usage

We recommend adding this package to your project via `npx jsr add` or `deno add`.

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

### Passing other values

You can pass other values with `env` options. The `env` is key-value object
that can be serialized to JSON.


```typescript
import { env } from 'esbuild-plugin-debug-switch';

console.log(`version ${env.version}`);
```

```typescript
await esbuild.build({
  entryPoints: ['main.ts'],
  outfile: 'main.dev.js',
  bundle: true,
  minify: true,
  plugins: [
    debugSwitchPlugin({
      isDebug,
      env: { version: '1.0.0' },
    })
  ],
}),
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
| Node.js | ✓      |
| Deno    | ✓      |
