import React, { useState, useEffect, useRef } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface OriginalChatWidgetProps {
  onToggle?: (isOpen: boolean) => void;
}

const OriginalChatWidget: React.FC<OriginalChatWidgetProps> = ({ onToggle }) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: '👋 Welcome to NexaFlow AI! I\'m your intelligent automation assistant. I can help you streamline workflows, connect apps, and boost productivity. What business process would you like to automate today?',
      isUser: false,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const WEBHOOK_URL = 'https://tradeloop.cloud/webhook/website';

  // تسجيل تفاصيل الاتصال للتشخيص
  const logConnectionDetails = () => {
    console.log('🔗 Webhook Connection Details:');
    console.log('URL:', WEBHOOK_URL);
    console.log('Session ID:', sessionId);
    console.log('Network Status:', navigator.onLine ? 'Online' : 'Offline');
    console.log('Timestamp:', new Date().toISOString());
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    // تأخير طفيف لضمان عرض الرسالة قبل التنقل
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  // مراقبة حالة الشبكة
  useEffect(() => {
    const handleOnline = () => {
      console.log('✅ تم استعادة الاتصال');
    };

    const handleOffline = () => {
      console.log('❌ فقدان الاتصال');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleWidget = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    onToggle?.(newState);
  };

  const openWidget = () => {
    setIsMinimized(false);
    onToggle?.(true);
  };

  useEffect(() => {
    // Add global function to open chat widget
    (window as any).openChatWidget = openWidget;
    (window as any).toggleChatWidget = toggleWidget;

    // Cleanup on unmount
    return () => {
      delete (window as any).openChatWidget;
      delete (window as any).toggleChatWidget;
    };
  }, []);

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleSendMessage = () => {
    sendMessage();
  };

  const sendMessage = async (retryCount = 0) => {
    const message = inputMessage.trim();
    if (!message || isLoading) return;

    // Add user message
    const userMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      console.log('🚀 إرسال رسالة إلى webhook:', WEBHOOK_URL);
      console.log('📤 بيانات الإرسال:', {
        session_id: sessionId,
        message: message,
        timestamp: new Date().toISOString(),
        user_input: message,
        retry_count: retryCount
      });

      // إضافة تسجيل تفاصيل الاتصال
      logConnectionDetails();

      // Create AbortController for timeout - إطالة وقت الانتظار
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 ثانية timeout أطول جداً

      const requestBody = {
        session_id: sessionId,
        message: message,
        timestamp: new Date().toISOString(),
        user_input: message,
        text: message, // Additional field that some n8n workflows expect
        input: message, // Another common field name
        query: message, // Yet another possibility
        content: message // And another one
      };

      console.log('📋 Request body:', requestBody);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'ChatWidget/1.0',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Webhook response error:', errorText);
        console.error('Response status:', response.status);

        // Handle specific HTTP errors gracefully
        if (response.status >= 500) {
          throw new Error('Server temporarily unavailable');
        } else if (response.status === 404) {
          throw new Error('Service endpoint not found');
        } else if (response.status === 403 || response.status === 401) {
          throw new Error('Authentication issue');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // الحصول على الاستجابة وعرض التفاصيل
      const responseText = await response.text();
      console.log('✅ Raw webhook response:', responseText);
      console.log('📊 Response length:', responseText.length);

      let assistantResponse = '';

      // Check if response is streaming format (multiple JSON objects)
      if (responseText.includes('"type":"begin"') || responseText.includes('"type":"item"')) {
        console.log('🔄 Detected streaming response format');

        // Split by newlines and parse each JSON object
        const lines = responseText.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const obj = JSON.parse(line);

            // Extract content from the "item" type object
            if (obj.type === 'item' && obj.content) {
              assistantResponse += obj.content;
              console.log('📝 Extracted content:', obj.content);
            }
          } catch (e) {
            // Skip invalid JSON lines
            console.warn('⚠️ Failed to parse line:', line);
          }
        }
      } else {
        // Try to parse as regular JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log('Parsed webhook response:', data);
        } catch (parseError) {
          console.error('Failed to parse response as JSON:', parseError);
          // If it's not JSON, treat the response text as the message
          data = { message: responseText };
        }

        // Handle different possible response formats from n8n webhook
        // Check for various possible response structures
        if (data && typeof data === 'object') {
          if (data.response) {
            assistantResponse = data.response;
          } else if (data.message) {
            assistantResponse = data.message;
          } else if (data.reply) {
            assistantResponse = data.reply;
          } else if (data.text) {
            assistantResponse = data.text;
          } else if (data.content) {
            assistantResponse = data.content;
          } else if (data.output) {
            assistantResponse = data.output;
          } else if (data.result) {
            assistantResponse = data.result;
          } else if (data.data) {
            // Sometimes the response is nested in a data field
            if (typeof data.data === 'string') {
              assistantResponse = data.data;
            } else if (data.data.message) {
              assistantResponse = data.data.message;
            } else if (data.data.response) {
              assistantResponse = data.data.response;
            } else {
              assistantResponse = JSON.stringify(data.data);
            }
          } else {
            // If none of the expected fields exist, stringify the whole response
            assistantResponse = JSON.stringify(data);
          }
        } else if (typeof data === 'string') {
          assistantResponse = data;
        } else {
          assistantResponse = "Message received successfully, but no response content found.";
        }
      }

      // Fallback if response is empty - provide helpful content instead
      if (!assistantResponse || assistantResponse.trim() === '') {
        assistantResponse = "Thanks for reaching out! I'm here to help you streamline your business processes with intelligent automation. What specific workflow would you like to optimize today?";
      }

      console.log('Final assistant response:', assistantResponse);

      const assistantMessage: Message = {
        text: assistantResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message to webhook:', error);

      // إعادة المحاولة مرة واحدة فقط للأخطاء الشبكية
      if (retryCount < 1 && error instanceof Error &&
        (error.name === 'AbortError' || error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        console.log(`🔄 إعادة المحاولة ${retryCount + 1}...`);
        // Remove the last user message to avoid duplication
        setMessages(prev => prev.slice(0, -1));
        setTimeout(() => {
          setInputMessage(message);
          setIsLoading(false);
          sendMessage(retryCount + 1);
        }, 2000); // انتظار ثانيتين قبل إعادة المحاولة
        return;
      }

      // عرض رسالة خطأ واضحة عند فشل الاتصال
      let assistantResponse = "⚠️ عذراً، لا أستطيع الوصول إلى النظام الآن. ";

      if (error instanceof Error) {
        console.error('❌ خطأ في الاتصال:', error.message);
        if (error.name === 'AbortError') {
          assistantResponse += "انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.";
        } else if (error.message.includes('Failed to fetch')) {
          assistantResponse += "مشكلة في الشبكة. تأكد من اتصالك بالإنترنت.";
        } else {
          assistantResponse += `خطأ تقني: ${error.message}`;
        }
      } else {
        assistantResponse += "خطأ غير معروف حدث أثناء الاتصال.";
      }

      const helpfulMessage: Message = {
        text: assistantResponse,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, helpfulMessage]);

    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const chatWidgetStyles = `
    .chat-widget {
      position: fixed;
      z-index: 1000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    }

    .chat-widget.minimized {
      bottom: 20px;
      right: 20px;
    }

    .chat-widget.expanded {
      bottom: 20px;
      right: 20px;
      width: 380px;
      height: 600px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }

    .chat-toggle-btn {
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 16px 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(59, 130, 246, 0.1);
      transition: all 0.3s ease;
      animation: automationGlow 3s infinite;
      position: relative;
      overflow: hidden;
    }

    .chat-toggle-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      animation: shimmer 2s infinite;
    }

    @keyframes automationGlow {
      0%, 100% { 
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(59, 130, 246, 0.1);
      }
      50% { 
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25), 0 0 30px rgba(59, 130, 246, 0.3);
      }
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .chat-toggle-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
    }

    .chat-header {
      background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
      color: white;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .chat-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.1) 50%, transparent 70%),
        radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
      pointer-events: none;
    }

    .chat-header * {
      position: relative;
      z-index: 1;
    }

    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .chat-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #3b82f6 0%, #667eea 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      position: relative;
    }

    .chat-avatar::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 50%;
      padding: 2px;
      background: linear-gradient(45deg, #3b82f6, #667eea, #8b5cf6);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: exclude;
      animation: avatarGlow 3s ease-in-out infinite alternate;
    }

    @keyframes avatarGlow {
      from { opacity: 0.5; }
      to { opacity: 1; }
    }

    .chat-header-text h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      background: linear-gradient(90deg, #ffffff 0%, #e2e8f0 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .chat-header-text p {
      font-size: 0.8rem;
      margin: 0;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      color: #94a3b8;
    }

    .chat-header-text p::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      animation: onlinePulse 2s infinite;
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
    }

    @keyframes onlinePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }

    .chat-action-btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .chat-action-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      position: relative;
      scroll-behavior: smooth;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 #f1f5f9;
    }

    .chat-messages::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.03) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.02) 0%, transparent 50%);
      pointer-events: none;
    }

    .chat-messages::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(102, 126, 234, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(102, 126, 234, 0.02) 1px, transparent 1px);
      background-size: 20px 20px;
      pointer-events: none;
      opacity: 0.5;
    }

    .message {
      display: flex;
      align-items: flex-start;
    }

    .message.user {
      justify-content: flex-end;
    }

    .message.assistant {
      justify-content: flex-start;
    }

    .message-content {
      max-width: 85%;
      background: white;
      padding: 12px 16px;
      border-radius: 18px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      position: relative;
      max-height: 400px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .message.user .message-content {
      background: linear-gradient(135deg, #3b82f6 0%, #667eea 100%);
      color: white;
      border-bottom-right-radius: 6px;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
      position: relative;
      z-index: 2;
    }

    .message.user .message-text {
      color: white !important;
      font-weight: 500;
    }

    .message.assistant .message-content {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 6px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
      position: relative;
      z-index: 2;
    }

    .message.assistant .message-text {
      color: #1f2937 !important;
      font-weight: 500;
    }

    .message.assistant .message-content::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(102, 126, 234, 0.05));
      border-radius: 20px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .message.assistant .message-content:hover::before {
      opacity: 1;
    }

    .message-text {
      font-size: 0.9rem;
      line-height: 1.6;
      word-wrap: break-word;
      word-break: break-word;
      overflow-wrap: break-word;
      white-space: pre-wrap;
      margin-bottom: 4px;
      color: #1f2937;
      font-weight: 500;
      max-height: 300px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;
    }

    .message-time {
      font-size: 0.75rem;
      opacity: 0.7;
      text-align: right;
      color: #6b7280;
      margin-top: 4px;
    }

    .message.assistant .message-time {
      text-align: left;
      color: #64748b;
    }

    .message.user .message-time {
      color: rgba(255, 255, 255, 0.8);
    }

    .typing-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .typing-indicator {
      display: flex;
      gap: 3px;
    }

    .typing-indicator span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #667eea;
      animation: typing 0.8s infinite ease-in-out;
    }

    .typing-indicator span:nth-child(1) { animation-delay: -0.24s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.12s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0s; }

    .typing-text {
      font-size: 0.8rem;
      color: #64748b;
      font-style: italic;
    }

    @keyframes typing {
      0%, 80%, 100% {
        opacity: 0.3;
        transform: scale(0.7) translateY(0px);
      }
      40% {
        opacity: 1;
        transform: scale(1) translateY(-2px);
      }
    }

    .chat-input-container {
      padding: 20px;
      background: white;
      border-top: 1px solid #e2e8f0;
    }

    .chat-input-wrapper {
      display: flex;
      gap: 12px;
      align-items: flex-end;
    }

    .chat-input {
      flex: 1;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 0.9rem;
      resize: none;
      outline: none;
      font-family: inherit;
      line-height: 1.5;
      min-height: 44px;
      max-height: 120px;
      transition: border-color 0.2s, box-shadow 0.2s;
      background: white;
      color: #1f2937;
      direction: ltr;
    }

    .chat-input::placeholder {
      color: #9ca3af;
      direction: ltr;
    }

    .chat-input:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .chat-input:disabled {
      background: #f1f5f9;
      color: #94a3b8;
      cursor: not-allowed;
    }

    .chat-send-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 12px;
      padding: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      min-width: 44px;
      height: 44px;
    }

    .chat-send-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .chat-send-btn:disabled {
      background: #d1d5db;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    @media (max-width: 480px) {
      .chat-widget.expanded {
        width: calc(100vw - 20px);
        height: calc(100vh - 40px);
        bottom: 20px;
        right: 10px;
        left: 10px;
      }
    }

    .chat-messages::-webkit-scrollbar {
      width: 6px;
    }

    .chat-messages::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }

    .chat-messages::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
      transition: background 0.2s ease;
    }

    .chat-messages::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    /* تحسين شريط التمرير للرسائل الطويلة */
    .message-text::-webkit-scrollbar {
      width: 4px;
    }

    .message-text::-webkit-scrollbar-track {
      background: #f8fafc;
      border-radius: 2px;
    }

    .message-text::-webkit-scrollbar-thumb {
      background: #e2e8f0;
      border-radius: 2px;
    }

    .message-text::-webkit-scrollbar-thumb:hover {
      background: #cbd5e1;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: chatWidgetStyles }} />
      <div className={`chat-widget ${isMinimized ? 'minimized' : 'expanded'}`}>
        {isMinimized ? (
          <button className="chat-toggle-btn" onClick={toggleWidget}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="chat-notification">AI Automation Assistant</span>
          </button>
        ) : (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="12" cy="9" r="2" fill="currentColor" />
                    <path d="M12 13C10.5 13 9 14 9 15.5V16H15V15.5C15 14 13.5 13 12 13Z" fill="currentColor" />
                    <path d="M8 8L10 10M16 8L14 10M8 16L10 14M16 16L14 14" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </div>
                <div className="chat-header-text">
                  <h4>AI Assistant</h4>
                  <p>Powered by NexaFlow</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button className="chat-action-btn" onClick={toggleWidget}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.isUser ? 'user' : 'assistant'}`}>
                  <div className="message-content">
                    <div className="message-text" style={{
                      direction: 'ltr',
                      color: message.isUser ? '#ffffff' : '#1f2937',
                      fontWeight: '500',
                      textAlign: 'left'
                    }}>
                      {message.text}
                    </div>
                    <div className="message-time">{formatTime(message.timestamp)}</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message assistant">
                  <div className="message-content">
                    <div className="typing-container">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <div className="typing-text">AI is thinking...</div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    requestAnimationFrame(() => autoResize());
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={isLoading ? "Sending..." : "Type your message here..."}
                  className="chat-input"
                  rows={1}
                  style={{ direction: 'ltr', textAlign: 'left' }}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  className="chat-send-btn"
                  disabled={isLoading || !inputMessage.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OriginalChatWidget;