import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Add from './Add.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Add />
  </StrictMode>,
)
