import * as esbuild from 'esbuild';

type DebugSwitchPluginOptions = {
  isDebug: boolean;
  filter?: RegExp;
};

export const debugSwitchPlugin = (
  options: DebugSwitchPluginOptions,
): esbuild.Plugin => {
  const pluginName = 'esbuild-plugin-debug-switch';
  const isDebug = options.isDebug;
  const filter = options.filter ?? /^esbuild-plugin-debug-switch$/;

  return {
    name: pluginName,
    setup(build) {
      build.onResolve({ filter }, (args) => {
        return {
          path: args.path,
          namespace: pluginName,
        };
      });

      build.onLoad({ filter, namespace: pluginName }, () => {
        return {
          contents: `export const isDebug = ${isDebug};`,
          loader: 'ts' as const,
        };
      });
    },
  };
};
