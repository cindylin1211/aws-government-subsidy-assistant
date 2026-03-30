import Header from './components/Header'
import ChatInterface from './components/ChatInterface'
import Footer from './components/Footer'

function App() {
  // 維護模式開關
  const isMaintenanceMode = true

  if (isMaintenanceMode) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              系統維護中
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              我們正在進行系統升級，以提供更好的服務體驗。<br />
              造成不便，敬請見諒。
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800 font-medium mb-2">
                💡 推薦替代方案
              </p>
              <p className="text-sm text-green-700">
                推薦使用 <span className="font-semibold">Quick Suite Agent</span>，加入<a href="https://d5vc2tehf6g33.cloudfront.net/2025GovFundeBook.pdf" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-medium">懶人包檔案</a>即可達成同樣效果
              </p>
            </div>
            
            <p className="text-sm text-gray-500">
              如有緊急需求，請聯繫：<a href="mailto:cindyjw@amazon.com" className="text-blue-600 hover:underline">cindyjw@amazon.com</a>
            </p>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

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
