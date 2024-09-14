import esbuild from 'esbuild';

esbuild
  .build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    platform: 'node', // or 'browser' if it's for the web
    format: 'cjs', // Targets ES modules
    target: 'node20', // or specify a specific version like 'es2020', 'es2019'
    external: [], // Ensures all dependencies are bundled unless specified
    logLevel: 'info',
    minify: true,
    sourcemap: false,
    outfile: '../../docker/ollama/pull_llm.js',
    banner: {
      js: '// IMPORTANT: DO NOT MANUALLY EDIT THIS FILE!.\n// Changes should made on "tools/pull-llm".',
    },
  })
  .catch((e) => console.error(e));
