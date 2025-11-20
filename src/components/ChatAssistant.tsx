import React, { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, X, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Assistant. I\'m currently testing the connection to our AI service. How can I help you with automation and AI solutions today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'error'>('unknown')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Test webhook connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('https://tradeloop.cloud/webhook/45b31e2a-4dc1-4106-8ec7-4fa0e9edb740/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'connection_test', test: true })
        })
        
        if (response.status === 200 || response.status === 201) {
          setConnectionStatus('connected')
        } else {
          console.log('Webhook test response:', response.status, await response.text())
          setConnectionStatus('error')
        }
      } catch (error) {
        console.error('Connection test failed:', error)
        setConnectionStatus('error')
      }
    }
    
    testConnection()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      console.log('Sending message to webhook:', userMessage.content)
      
      const payload = {
        message: userMessage.content,
        timestamp: userMessage.timestamp.toISOString(),
        sessionId: localStorage.getItem('chatSessionId') || Date.now().toString(),
        userId: 'web-user-' + Date.now()
      }

      console.log('Payload:', payload)

      const response = await fetch('https://tradeloop.cloud/webhook/45b31e2a-4dc1-4106-8ec7-4fa0e9edb740/chat', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Response error:', errorText)
        
        // Handle specific n8n workflow errors
        if (response.status === 500 && errorText.includes('Error in workflow')) {
          throw new Error('The AI workflow is currently experiencing issues. Please contact support.')
        }
        
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      let data
      let textResponse = ''
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        textResponse = await response.text()
        console.log('Text response:', textResponse)
        data = { response: textResponse }
      }

      console.log('Webhook response data:', data)
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response || data.message || data.reply || textResponse || 'Message received successfully!',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      
      // Store session ID for continuity
      if (data.sessionId) {
        localStorage.setItem('chatSessionId', data.sessionId)
      }
    } catch (error) {
      console.error('Chat error details:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the console for details or try again.`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border border-border rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-xs opacity-90">
                  {connectionStatus === 'connected' && '🟢 Connected'}
                  {connectionStatus === 'error' && '🔴 Connection Issue'}
                  {connectionStatus === 'unknown' && '🟡 Testing Connection...'}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  } items-end space-x-2`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-blue-600 ml-2'
                        : 'bg-purple-600 mr-2'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-foreground border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-end space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-2 border">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex space-x-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 min-h-[40px] max-h-[100px] p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background"
                rows={1}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Powered by AI • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  )
}