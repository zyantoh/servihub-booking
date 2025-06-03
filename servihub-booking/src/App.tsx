import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <main className="flex flex-col min-h-screen">
      <header className="p-4 bg-primary text-white font-semibold">
        ServiHub Booking Engine
      </header>

      <section className="flex flex-1">
        <aside className="w-64 border-r p-4">Sidebar / Template Selector</aside>
        <div className="flex-1 p-4 space-y-4">
          <div>🗓️ Calendar View Placeholder</div>
          <div>📋 Booking Dialog Placeholder</div>
        </div>
      </section>
    </main>
  )
}

export default App
