import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <App /> {/*nos permitira que la app sea mas flexible */}
  </StrictMode>,
)
