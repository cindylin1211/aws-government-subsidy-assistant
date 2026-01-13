import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h3 className="text-xl font-semibold mb-6">聯絡方式</h3>
          
          <div className="space-y-3 mb-8">
            <p className="text-lg">
              補助相關問題 - PM Maggie: <a href="mailto:maggieyj@amazon.com" className="hover:underline">maggieyj@amazon.com</a> | <a 
                href="https://amazon.enterprise.slack.com/team/U06451XD9HR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @Maggie Chang
              </a>
            </p>
            <p className="text-lg">
              網站技術相關 - Cindy: <a href="mailto:cindyjw@amazon.com" className="hover:underline">cindyjw@amazon.com</a> | <a 
                href="https://amazon.enterprise.slack.com/team/U0960E9NWBA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                @Cindy Lin
              </a>
            </p>
          </div>
          
          <div className="text-sm opacity-90">
            <p>&copy; 2026 AWS 政府補助網站 - 內部工具</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer