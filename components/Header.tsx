import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
                 <div className="p-2 bg-indigo-500 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/><path d="M8 7h4"/><path d="M8 12h4"/><path d="M8 17h4"/></svg>
                 </div>
                 <h1 className="text-2xl font-extrabold tracking-tight">News Digest AI</h1>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;