import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { type Digest } from './types';
import { generateNewsDigest } from './services/geminiService';
import Header from './components/Header';
import DigestList from './components/DigestList';
import DigestPreview from './components/DigestPreview';
import DigestConfigModal from './components/DigestConfigModal';
import AutomationModal from './components/AutomationModal';
import AutomationSetup from './components/AutomationSetup';
import { Toast } from './components/ui/Toast';

const App: React.FC = () => {
  const [digests, setDigests] = useState<Digest[]>([]);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [editingDigest, setEditingDigest] = useState<Digest | null>(null);

  const [selectedDigestId, setSelectedDigestId] = useState<string | null>(null);
  const [digestHtml, setDigestHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [webhookSecret, setWebhookSecret] = useState('');
  const [isAutomationModalOpen, setIsAutomationModalOpen] = useState(false);
  const [automatingDigest, setAutomatingDigest] = useState<Digest | null>(null);
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  });

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedDigests = localStorage.getItem('newsDigests');
      if (savedDigests) {
        setDigests(JSON.parse(savedDigests));
      }
      const savedSecret = localStorage.getItem('newsDigestWebhookSecret');
      if (savedSecret) {
        setWebhookSecret(savedSecret);
      }
    } catch (e) {
      console.error("Failed to load data from localStorage", e);
    }
  }, []);

  // Save digests to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('newsDigests', JSON.stringify(digests));
    } catch (e) {
      console.error("Failed to save digests to localStorage", e);
    }
  }, [digests]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => hideToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handlePreviewDigest = useCallback(async () => {
    const digestToPreview = digests.find(d => d.id === selectedDigestId);
    if (!digestToPreview) {
      setError("Please select a digest to preview.");
      showToast("Please select a digest to preview.", "error");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDigestHtml(null);
    try {
      const html = await generateNewsDigest(digestToPreview);
      setDigestHtml(html);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDigestId, digests]);

  const handleSelectDigest = (id: string) => {
    setSelectedDigestId(id);
    setDigestHtml(null); // Clear previous preview
    setError(null);
  };

  const handleCreateNewDigest = () => {
    setEditingDigest(null);
    setIsConfigModalOpen(true);
  };

  const handleEditDigest = (digest: Digest) => {
    setEditingDigest(digest);
    setIsConfigModalOpen(true);
  };

  const handleDeleteDigest = (id: string) => {
    setDigests(currentDigests => currentDigests.filter(d => d.id !== id));
    if (selectedDigestId === id) {
        setSelectedDigestId(null);
        setDigestHtml(null);
    }
    showToast("Digest deleted successfully.", "success");
  };

  const handleSaveDigest = (digestToSave: Digest) => {
    const isUpdating = digests.some(d => d.id === digestToSave.id);
    if (isUpdating) {
      setDigests(currentDigests => currentDigests.map(d => d.id === digestToSave.id ? digestToSave : d));
      showToast("Digest updated successfully!", "success");
    } else {
      setDigests(currentDigests => [...currentDigests, digestToSave]);
      showToast("New digest created!", "success");
    }
    setSelectedDigestId(digestToSave.id);
    setDigestHtml(null);
    setError(null);
    setIsConfigModalOpen(false);
  };

  const handleSaveWebhookSecret = (secret: string) => {
    setWebhookSecret(secret);
    localStorage.setItem('newsDigestWebhookSecret', secret);
    showToast("Webhook secret saved!", "success");
  };

  const handleOpenAutomationModal = (digest: Digest) => {
    setAutomatingDigest(digest);
    setIsAutomationModalOpen(true);
  };

  const selectedDigest = useMemo(() => 
    digests.find(d => d.id === selectedDigestId)
  , [digests, selectedDigestId]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <DigestList 
              digests={digests}
              selectedDigestId={selectedDigestId}
              onCreate={handleCreateNewDigest}
              onEdit={handleEditDigest}
              onDelete={handleDeleteDigest}
              onSelect={handleSelectDigest}
              onAutomate={handleOpenAutomationModal}
            />
            <AutomationSetup 
              initialSecret={webhookSecret}
              onSave={handleSaveWebhookSecret}
            />
          </div>
          <div className="lg:col-span-2">
            <DigestPreview
              htmlContent={digestHtml}
              isLoading={isLoading}
              error={error}
              selectedDigest={selectedDigest}
              onGeneratePreview={handlePreviewDigest}
              onCopy={() => showToast("HTML copied to clipboard!", "success")}
            />
          </div>
        </div>
      </main>
      <Toast 
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onHide={hideToast}
      />
      {isConfigModalOpen && (
        <DigestConfigModal 
            isOpen={isConfigModalOpen}
            onClose={() => setIsConfigModalOpen(false)}
            onSave={handleSaveDigest}
            digest={editingDigest}
        />
      )}
      {isAutomationModalOpen && (
        <AutomationModal 
          isOpen={isAutomationModalOpen}
          onClose={() => setIsAutomationModalOpen(false)}
          digest={automatingDigest}
          webhookSecret={webhookSecret}
          onCopy={() => showToast("Webhook URL copied!", "success")}
        />
      )}
    </div>
  );
};

export default App;