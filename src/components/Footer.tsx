import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-12">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600">
        <div className="space-y-2">
          <p>聯絡信箱：aws-tw-dgr@amazon.com</p>
          <p>&copy; 2025 AWS 政府補助小助手 - 內部工具</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer