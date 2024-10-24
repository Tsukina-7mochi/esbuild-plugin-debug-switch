import * as esbuild from 'esbuild';

/** Options of esbuild-plugin-debug-switch. */
export type DebugSwitchPluginOptions = {
  /** Debug mode switch value that is passed to scripts as constants. */
  isDebug: boolean;

  /** Variables passed to the scripts. Values must be JSON-ifiable. */
  env?: Record<string, unknown>;

  /**
   * Filter for the name of plugin. Used for telling plugin alternative
   *
   * name used in import statements. The default value is
   * `/^((jsr:\/?)?@tsukina-7mochi\/)?esbuild-plugin-debug-switch$/`
   */
  filter?: RegExp;
};

/** A plugin for esbuild to switch between production and development build.*/
export const debugSwitchPlugin = (
  options: DebugSwitchPluginOptions,
): esbuild.Plugin => {
  const pluginName = 'esbuild-plugin-debug-switch';
  const isDebug = options.isDebug;
  const env = options.env ?? {};
  const filter = options.filter ??
    /^((jsr:\/?)?@tsukina-7mochi\/)?esbuild-plugin-debug-switch$/;

  return {
    name: pluginName,
    setup(build) {
      build.onResolve({ filter }, (args) => {
        return {
          path: args.path,
          namespace: pluginName,
        };
      });

      const contents = `export const isDebug = ${isDebug};` +
        `export const env = ${JSON.stringify(env)};`;

      build.onLoad({ filter, namespace: pluginName }, () => {
        return {
          contents,
          loader: 'ts' as const,
        };
      });
    },
  };
};
