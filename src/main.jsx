import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import MotionProvider from './motion/MotionProvider.jsx'
import './styles/global.css'
import './styles/festive.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionProvider>
        <App />
      </MotionProvider>
    </BrowserRouter>
  </StrictMode>,
)
