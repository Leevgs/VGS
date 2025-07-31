import React, { useMemo } from 'react';
import { type Digest } from '../types';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface AutomationModalProps {
  isOpen: boolean;
  onClose: () => void;
  digest: Digest | null;
  webhookSecret: string;
  onCopy: () => void;
}

const AutomationModal: React.FC<AutomationModalProps> = ({ isOpen, onClose, digest, webhookSecret, onCopy }) => {

  const webhookUrl = useMemo(() => {
    if (!digest || !webhookSecret) return '';
    try {
      const data = btoa(JSON.stringify(digest));
      const url = new URL(window.location.origin);
      url.pathname = '/api/generate-digest';
      url.searchParams.set('secret', webhookSecret);
      url.searchParams.set('data', data);
      return url.toString();
    } catch (e) {
      console.error("Error generating webhook URL", e);
      return 'Error generating URL. Make sure you have saved a webhook secret.';
    }
  }, [digest, webhookSecret]);

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    onCopy();
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-1">Automate This Digest</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Use this webhook URL with a service like Make.com or Zapier to generate and receive this digest automatically.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="webhook-url" className="block text-sm font-medium text-muted-foreground mb-1">
              Your Webhook URL
            </label>
            <div className="flex items-center gap-2">
              <Input
                id="webhook-url"
                type="text"
                value={webhookUrl}
                readOnly
                className="bg-gray-100"
              />
              <Button onClick={handleCopy} size="icon" variant="outline" aria-label="Copy URL">
                <ClipboardIcon className="h-4 w-4" />
              </Button>
            </div>
            {!webhookSecret && (
                <p className="text-xs text-red-600 mt-1">Please set a Webhook Secret in the 'Automation Setup' section first.</p>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground p-4 bg-gray-100/70 rounded-lg border">
            <h3 className="font-semibold text-gray-700 mb-2">How to use with Make.com:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Create a new Scenario and add a <strong>Scheduler</strong> trigger.</li>
              <li>Add an <strong>HTTP &gt; Make a request</strong> module.</li>
              <li>Paste the URL above into the <code className="text-xs bg-gray-200 p-1 rounded">URL</code> field.</li>
              <li>Add an <strong>Email</strong> module (e.g., Gmail).</li>
              <li>In the email's content/body, use the <code className="text-xs bg-gray-200 p-1 rounded">Data</code> from the HTTP module.</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};

export default AutomationModal;