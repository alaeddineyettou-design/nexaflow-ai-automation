import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

interface ChatMessage {
  text: string;
  type: 'user' | 'bot';
  timestamp: number;
}

interface ChatWidgetProps {
  clientId?: string;
  clientName?: string;
  primaryColor?: string;
  secondaryColor?: string;
  welcomeMessage?: string;
  title?: string;
  placeholder?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  language?: 'ar' | 'en';
}

export interface ChatWidgetRef {
  openChat: () => void;
  closeChat: () => void;
}

const AdvancedChatWidget = forwardRef<ChatWidgetRef, ChatWidgetProps>(({
  clientId = 'default',
  primaryColor = '#3b82f6',
  secondaryColor = '#8b5cf6',
  welcomeMessage = 'Welcome! Ready to automate your business with AI? Let me help you get started with our automation solutions.',
  title = 'AI Assistant',
  placeholder = 'Type your message here...',
  position = 'bottom-right'
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    openChat: () => {
      setIsOpen(true);
    },
    closeChat: () => {
      setIsOpen(false);
      setShowChat(false);
    }
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessage = (message: string) => {
    return message
      .replace(/\n/g, '<br>')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-500 hover:text-blue-700 underline">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');
  };

  const startChatting = () => {
    setShowChat(true);
    if (messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        text: welcomeMessage,
        type: 'bot',
        timestamp: Date.now()
      };
      setMessages([welcomeMsg]);
    }
  };

  const sendToWebhook = async (message: string) => {
    setIsTyping(true);
    
    try {
      const webhookUrl = 'https://n8n.srv962505.hstgr.cloud/webhook/c1919878-0bd7-43a4-a800-6cfc947b177c/chat';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          clientId: clientId,
          sessionId: Date.now().toString(),
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          origin: window.location.origin,
          darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Webhook response error:', data);
        throw new Error(`HTTP ${response.status}: ${data.message || response.statusText}`);
      }
      
      if (data.error || data.message === "Error in workflow") {
        console.error('Workflow error:', data);
        setIsTyping(false);
        const errorMessage: ChatMessage = {
          text: '⚠️ Sorry, there was an error with the chat service. Please try again later or contact us directly.',
          type: 'bot',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, errorMessage]);
        return;
      }
      
      setIsTyping(false);
      
      const botMessage = data.output || data.message || data.result || 'Message processed successfully.';
      const newBotMessage: ChatMessage = {
        text: botMessage,
        type: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
      
    } catch (error) {
      console.error('Chat Error:', error);
      setIsTyping(false);
      
      let errorText = '⚠️ Sorry, there was a connection error. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
          errorText = '🌐 CORS Error: Cannot access chat service from localhost. May work when deployed to a proper domain.';
        } else if (error.message.includes('NetworkError') || error.message.includes('CORS')) {
          errorText = '🔒 CORS Policy: Request blocked by browser security. Try accessing from production domain.';
        } else if (error.message.includes('HTTP 404')) {
          errorText = '❓ Chat service not found. Please contact support.';
        } else if (error.message.includes('HTTP 500')) {
          errorText = '🔧 Server error. Chat service temporarily unavailable. (n8n workflow error)';
        } else if (error.message.includes('Workflow error')) {
          errorText = '⚙️ Workflow Error: Issue with n8n workflow configuration. Please check settings.';
        } else if (error.message.includes('HTTP')) {
          errorText = `🚫 Server error: ${error.message}`;
        }
      }
      
      const errorMessage: ChatMessage = {
        text: errorText,
        type: 'bot',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const sendMessage = () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage: ChatMessage = {
      text: inputValue,
      type: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    sendToWebhook(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openChat = () => {
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setShowChat(false);
  };

  return (
    <div className={`fixed ${position === 'bottom-right' ? 'right-6 bottom-6' : 
                            position === 'bottom-left' ? 'left-6 bottom-6' : 
                            position === 'top-right' ? 'right-6 top-6' : 
                            'left-6 top-6'} z-50`}>
      
      {/* Modern Chat Button */}
      {!isOpen && (
        <button
          onClick={openChat}
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
          className="w-16 h-16 rounded-full text-white border-none cursor-pointer flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </button>
      )}

      {/* Advanced Chat Widget */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[480px] h-[700px] bg-gradient-to-br from-slate-900 to-gray-800 border border-gray-600 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
             style={{ boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.4)' }}>
          
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 border-b border-gray-700 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                >
                  AI
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{title}</h3>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </button>
                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Content Area */}
          <div 
            ref={chatBodyRef}
            className="flex-1 bg-gradient-to-br from-slate-800 to-gray-900 p-6 overflow-y-auto"
          >
            {!showChat ? (
              <>
                {/* AI Automation FAQ Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">AI Automation Solutions</h4>
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors">
                      View All <span>→</span>
                    </button>
                  </div>
                  
                  {/* FAQ Categories */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-gradient-to-r from-slate-700/50 to-blue-800/30 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-sm text-blue-300 mb-1">Popular Automation Services</p>
                          <div className="space-y-2">
                            <div className="text-sm text-white font-medium">⚡ Workflow Automation</div>
                            <div className="text-sm text-white font-medium">🤖 Smart Chatbot Development</div>
                            <div className="text-sm text-white font-medium">📊 AI Data Processing</div>
                            <div className="text-sm text-white font-medium">🎯 Lead Generation</div>
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="space-y-3">
                            <div className="text-sm font-semibold text-white">How Does AI Automation Work?</div>
                            <div className="text-sm text-gray-300">Automate repetitive tasks and boost productivity with AI</div>
                            <div className="text-sm text-gray-300">Custom intelligent solutions tailored to your business needs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI Automation Services Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">AI Automation Services</h4>
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">Explore All</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border border-purple-500/50 rounded-lg p-4 hover:shadow-lg hover:border-purple-400/70 transition-all cursor-pointer backdrop-blur-sm">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-white mb-1">AI Workflows</h5>
                      <p className="text-xs text-gray-300">Automate complex processes</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-800/30 to-cyan-800/30 border border-blue-500/50 rounded-lg p-4 hover:shadow-lg hover:border-blue-400/70 transition-all cursor-pointer backdrop-blur-sm">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-white mb-1">Smart Chatbots</h5>
                      <p className="text-xs text-gray-300">24/7 customer engagement</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 border border-green-500/50 rounded-lg p-4 hover:shadow-lg hover:border-green-400/70 transition-all cursor-pointer backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-white mb-1">Data Analytics</h5>
                      <p className="text-xs text-gray-300">AI-powered insights</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-800/30 to-red-800/30 border border-orange-500/50 rounded-lg p-4 hover:shadow-lg hover:border-orange-400/70 transition-all cursor-pointer backdrop-blur-sm">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-3">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-white mb-1">Lead Generation</h5>
                      <p className="text-xs text-gray-300">Automated prospecting</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Chat Messages (when active)
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? `bg-gradient-to-r text-white shadow-lg`
                        : 'bg-slate-700/50 border border-gray-600 text-gray-100 backdrop-blur-sm'
                    }`}
                    style={message.type === 'user' ? { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` } : {}}>
                      <div dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }} />
                      <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700/50 border border-gray-600 p-3 rounded-lg backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm">Typing...</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Professional Footer */}
          <div className="bg-gradient-to-r from-slate-800 to-gray-900 border-t border-gray-700 p-6">
            {!showChat ? (
              <button 
                onClick={startChatting}
                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                className="w-full text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                Start Automation Chat
              </button>
            ) : (
              // Chat Input Area
              <div className="flex gap-3">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={placeholder}
                  className="flex-1 border border-gray-600 bg-slate-700/50 text-white rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:border-transparent placeholder-gray-400 backdrop-blur-sm focus:ring-blue-500"
                  rows={1}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputValue.trim()}
                  style={{ background: !inputValue.trim() ? '#4b5563' : `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  className="disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

AdvancedChatWidget.displayName = 'AdvancedChatWidget';

export default AdvancedChatWidget;