import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-aws-blue text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-orange-500 flex items-center justify-center">
            {/* AWS Logo */}
            <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
              <div className="text-center leading-tight">
                <div>AWS</div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">AWS 政府補助小助手</h1>
            <p className="text-gray-300 text-sm">專業的政府補助諮詢服務</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header