import { StrictMode } from 'react'
import { UserContext } from './context/UserContext.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserProvider } from './context/UserContext'

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <App />
  </UserProvider>
)
