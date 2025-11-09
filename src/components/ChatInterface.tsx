import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

// API 配置 - AWS Bedrock Agent API Gateway URL
const API_GATEWAY_URL = import.meta.env.VITE_API_URL || "https://hyeavzp56b.execute-api.us-west-2.amazonaws.com/prod/chat"

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '您好！我是 AWS 政府補助小助手。我可以幫您解答政府補助申請相關問題。請問有什麼可以為您服務的嗎？',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // 呼叫 Bedrock Agent API
    try {
      const response = await callBedrockAgent(inputValue)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('API 呼叫失敗:', error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: '抱歉，系統暫時無法回應。請稍後再試。',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const callBedrockAgent = async (userInput: string): Promise<string> => {
    console.log('🚀 開始呼叫 Bedrock Agent')
    console.log('📍 API URL:', API_GATEWAY_URL)
    console.log('📤 發送訊息:', userInput)
    
    try {
      const requestBody = { 
        message: userInput,
        sessionId: `session-${Date.now()}`
      }
      console.log('📦 請求內容:', JSON.stringify(requestBody, null, 2))
      
      const response = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      console.log('📡 回應狀態:', response.status, response.statusText)
      console.log('📋 回應標頭:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ HTTP 錯誤:', errorText)
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
      }

      const data = await response.json()
      console.log('📥 API 回應資料:', data)
      
      const agentResponse = data.response || data.reply || data.message
      if (agentResponse) {
        console.log('✅ Agent 回應成功:', agentResponse)
        return agentResponse
      } else {
        console.warn('⚠️ 回應中沒有找到訊息內容')
        return '抱歉，無法取得回應。'
      }
    } catch (error) {
      console.error('❌ Bedrock Agent 呼叫失敗:', error)
      console.error('❌ 錯誤類型:', error instanceof Error ? error.constructor.name : typeof error)
      console.error('❌ 錯誤訊息:', error instanceof Error ? error.message : String(error))
      
      // 檢查是否為網路錯誤
      if (error instanceof TypeError) {
        console.error('🚫 可能是 CORS 或網路連線問題')
      }
      
      // 回退到本地回應
      console.log('🔄 使用本地回應')
      return generateFallbackResponse(userInput)
    }
  }

  const generateFallbackResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes('申請') || input.includes('補助')) {
      return '關於政府補助申請，您需要準備以下文件：\n\n1. 公司登記證明\n2. 營業計畫書\n3. 財務報表\n4. AWS 使用計畫\n\n建議您先確認符合申請資格，再進行後續申請程序。需要更詳細的資訊嗎？'
    }

    if (input.includes('資格') || input.includes('條件')) {
      return '申請 AWS 政府補助的基本資格包括：\n\n• 在台灣設立之合法公司\n• 具備雲端轉型需求\n• 年營業額符合中小企業標準\n• 首次使用 AWS 服務\n\n您的公司是否符合這些條件呢？'
    }

    if (input.includes('費用') || input.includes('價格') || input.includes('多少錢')) {
      return 'AWS 政府補助方案可提供：\n\n💰 最高 50% 的服務費用補助\n💰 每家公司最高補助金額 NT$500,000\n💰 補助期間最長 12 個月\n\n實際補助金額會根據您的使用計畫和公司規模而定。'
    }

    return '感謝您的提問！我會盡力為您提供準確的資訊。如果您有特定的補助相關問題，請詳細描述，我會給您更精確的回答。'
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="card h-[600px] flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user'
                ? 'bg-aws-orange text-white'
                : 'bg-aws-blue text-white'
              }`}>
              {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`max-w-[70%] ${message.type === 'user' ? 'text-right' : 'text-left'
              }`}>
              <div className={`inline-block p-3 rounded-lg ${message.type === 'user'
                  ? 'bg-aws-orange text-white'
                  : 'bg-gray-100 text-gray-900'
                }`}>
                <p className="whitespace-pre-line">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString('zh-TW', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-aws-blue text-white flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="請輸入您的問題..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-aws-orange focus:border-transparent"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-12 h-12"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatInterface