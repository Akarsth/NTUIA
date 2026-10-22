// GitHub Pages serves 404.html for unknown paths. Copying index.html there
// lets React Router handle deep links like /events on refresh.
import { copyFileSync } from 'node:fs'
copyFileSync('dist/index.html', 'dist/404.html')
console.log('Copied dist/index.html -> dist/404.html')
