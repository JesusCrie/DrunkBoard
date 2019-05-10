module.exports = {
  // Tailwind Paths
  configJS: './tailwind.js',
  sourceCSS: './src/tailwind.scss',
  outputCSS: './src/styles.scss',
  // Sass
  sass: true,
  // PurgeCSS Settings
  purge: true,
  keyframes: false,
  fontFace: false,
  rejected: false,
  whitelist: [],
  whitelistPatterns: [],
  whitelistPatternsChildren: [],
  extensions: [
    '.ts',
    '.html',
    '.js',
    '.scss'
  ]
};
