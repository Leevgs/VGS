import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  show: boolean;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, show, onHide }) => {
  const baseClasses = "fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 transition-all duration-300";
  const showClasses = "transform translate-x-0 opacity-100";
  const hideClasses = "transform translate-x-full opacity-0";

  const typeClasses = {
    success: "bg-green-100 dark:bg-green-800 text-green-500 dark:text-green-200",
    error: "bg-red-100 dark:bg-red-800 text-red-500 dark:text-red-200",
  };

  const Icon = () => {
    if (type === 'success') {
      return (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
      );
    }
    return (
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
        </svg>
    );
  };

  return (
    <div className={`${baseClasses} ${show ? showClasses : hideClasses}`} role="alert">
        <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${typeClasses[type]} rounded-lg`}>
            <Icon />
            <span className="sr-only">{type} icon</span>
        </div>
        <div className="ml-3 text-sm font-normal">{message}</div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={onHide} aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
  );
};
