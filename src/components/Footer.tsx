import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-gray-800 text-xl font-semibold mb-4">聯絡方式</h3>
        </div>
        
        <div className="text-center text-gray-600 space-y-3 mb-6">
          <p>
            補助相關問題 - PM Maggie: <a href="mailto:maggieyj@amazon.com" className="text-aws-orange hover:underline">maggieyj@amazon.com</a> | <a 
              href="https://amazon.enterprise.slack.com/team/U06451XD9HR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-aws-orange hover:underline"
            >
              @Maggie Chang
            </a>
          </p>
          <p>
            網站技術相關 - Cindy: <a href="mailto:cindyjw@amazon.com" className="text-aws-orange hover:underline">cindyjw@amazon.com</a> | <a 
              href="https://amazon.enterprise.slack.com/team/U0960E9NWBA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-aws-orange hover:underline"
            >
              @Cindy Lin
            </a>
          </p>
        </div>
        
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; 2026 AWS 政府補助網站 - 內部工具</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer