import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] mx-4 overflow-hidden">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
            {title && (
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className="ml-auto p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>
          
          {/* Content */}
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;