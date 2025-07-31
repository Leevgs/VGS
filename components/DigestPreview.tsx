import React from 'react';
import { type Digest } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SendIcon } from './icons/SendIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface DigestPreviewProps {
  htmlContent: string | null;
  isLoading: boolean;
  error: string | null;
  selectedDigest: Digest | null | undefined;
  onGeneratePreview: () => void;
  onCopy: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="relative h-16 w-16">
            <div className="absolute h-full w-full rounded-full border-4 border-t-indigo-500 border-gray-200 animate-spin"></div>
            <div className="absolute inset-2 flex items-center justify-center text-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/></svg>
            </div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Crafting your digest...</p>
        <p className="text-sm text-gray-500">The AI is fetching and summarizing the latest news.</p>
    </div>
);

const DigestPlaceholder: React.FC<{ selected: boolean; onGenerate: () => void; }> = ({ selected, onGenerate }) => (
    <div className="text-center text-muted-foreground p-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 mx-auto text-gray-300 mb-4"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4"/><path d="M16 2v20"/><path d="M8 7h4"/><path d="M8 12h4"/><path d="M8 17h4"/></svg>
        <h3 className="text-xl font-semibold text-gray-700">Digest Preview</h3>
        {!selected ? (
            <p className="mt-2 text-gray-500">Select a digest from the list on the left to get started.</p>
        ) : (
            <>
                <p className="mt-2 text-gray-500">You've selected a digest. Click the button below to generate a preview.</p>
                <Button onClick={onGenerate} size="lg" className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <SendIcon className="h-5 w-5 mr-2" />
                    Generate Preview
                </Button>
            </>
        )}
    </div>
);


const DigestPreview: React.FC<DigestPreviewProps> = ({ 
    htmlContent, 
    isLoading, 
    error, 
    selectedDigest, 
    onGeneratePreview,
    onCopy,
}) => {

  const handleCopyHtml = () => {
    if (htmlContent) {
      navigator.clipboard.writeText(htmlContent);
      onCopy();
    }
  };

  return (
    <Card className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Preview</h2>
        {htmlContent && !isLoading && !error && (
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopyHtml}>
                    <ClipboardIcon className="h-4 w-4 mr-2" />
                    Copy HTML
                </Button>
            </div>
        )}
      </div>
      <div className="bg-gray-200/50 rounded-lg min-h-[60vh] flex-grow flex items-center justify-center border-2 border-dashed border-gray-300/80">
        {isLoading && <LoadingSpinner />}
        {error && <p className="text-red-600 bg-red-100 p-4 rounded-lg font-medium">{error}</p>}
        {!isLoading && !error && !htmlContent && <DigestPlaceholder selected={!!selectedDigest} onGenerate={onGeneratePreview} />}
        {htmlContent && (
           <iframe
            srcDoc={htmlContent}
            className="w-full h-[75vh] bg-white rounded-md border-0"
            title="Digest Preview"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-scripts"
          />
        )}
      </div>
    </Card>
  );
};

export default DigestPreview;