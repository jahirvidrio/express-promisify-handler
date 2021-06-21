require('esbuild').build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: true,
  outfile: './dist/index.js',
  platform: 'node',
  target: 'node10.4',
}).catch(console.error);
