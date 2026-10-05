import { builtinModules } from 'node:module';

// NOTE(krishan711): GitHub runs runnable/index.js straight from the repo, so everything except node builtins is bundled into that one file
export default (params) => ({
  ...params,
  rolldownConfigModifier: (config) => ({
    ...config,
    platform: 'node',
    resolve: undefined,
    external: [/^node:/, ...builtinModules],
    plugins: [],
    output: {
      file: './runnable/index.js',
      format: 'esm',
      minify: true,
      sourcemap: false,
    },
  }),
});
