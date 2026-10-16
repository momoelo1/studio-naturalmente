import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/playfair-display/wght.css'
import '@fontsource-variable/playfair-display/wght-italic.css'
import '@fontsource-variable/dm-sans/wght.css'
import './index.css'
import App from './App.jsx'
import logo from './assets/logo-badge.jpg'

// The hero's entrance waits for its fonts and logo (at most 1.2s), so the title never
// animates in a fallback font and then jumps when Playfair arrives
const assetsReady = Promise.all([
  document.fonts.load('700 1em "Playfair Display Variable"'),
  document.fonts.load('italic 600 1em "Playfair Display Variable"'),
  document.fonts.load('1em "DM Sans Variable"'),
  Object.assign(new Image(), { src: logo }).decode(),
]).catch(() => {})
Promise.race([assetsReady, new Promise((resolve) => setTimeout(resolve, 1200))]).then(() =>
  document.documentElement.classList.add('is-ready'),
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
