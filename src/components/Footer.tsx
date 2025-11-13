import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-gray-800 text-xl font-semibold mb-4">聯絡方式</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-gray-600 text-center">
          {/* Left Column */}
          <div className="space-y-2">
            <p>
              TW DGR: <a href="mailto:aws-tw-dgr@amazon.com" className="text-aws-orange hover:underline">aws-tw-dgr@amazon.com</a>
            </p>
            <p>
              PM Maggie: <a href="mailto:maggieyj@amazon.com" className="text-aws-orange hover:underline">maggieyj@amazon.com</a>
            </p>
          </div>
          
          {/* Right Column */}
          <div className="space-y-2">
            <p>
              Cindy: <a href="mailto:cindyjw@amazon.com" className="text-aws-orange hover:underline">cindyjw@amazon.com</a>
            </p>
            <p>
              Slack: 
              <a 
                href="https://amazon.enterprise.slack.com/team/U06451XD9HR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-aws-orange hover:underline"
              >
                @Maggie Chang
              </a>
              {' | '}
              <a 
                href="https://amazon.enterprise.slack.com/team/U0960E9NWBA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-aws-orange hover:underline"
              >
                @Cindy Lin
              </a>
            </p>
          </div>
        </div>
        
        <div className="text-center mt-6 text-gray-600 text-sm">
          <p>&copy; 2025 AWS 政府補助網站 - 內部工具</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer