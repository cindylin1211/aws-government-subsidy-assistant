import React from 'react'
import Header from './components/Header'
import ChatInterface from './components/ChatInterface'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App