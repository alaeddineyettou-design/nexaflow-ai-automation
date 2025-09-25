import { useState } from 'react';
import { MessageSquare, X, Zap } from 'lucide-react';
import { NexaFlowChat } from './nexaflow-chat';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 hover:shadow-blue-500/50 z-50 group"
        aria-label="Open chat"
      >
        <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
        
        {/* Notification badge */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-blue-500/20 bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Zap className="w-8 h-8 text-blue-400" />
                  <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">NexaFlow Chat</h2>
                  <p className="text-sm text-slate-400">Direct line to Alaeddine</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
              <NexaFlowChat />
            </div>
          </div>
        </div>
      )}
    </>
  );
}