import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface AutomationSetupProps {
  initialSecret: string;
  onSave: (secret: string) => void;
}

const AutomationSetup: React.FC<AutomationSetupProps> = ({ initialSecret, onSave }) => {
  const [secret, setSecret] = useState(initialSecret);

  // Sync state if initialSecret changes from localStorage loading
  React.useEffect(() => {
    setSecret(initialSecret);
  }, [initialSecret]);

  const handleSave = () => {
    onSave(secret);
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Automation Setup</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Set a secret key to secure your webhooks for services like Make.com.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter your secret key"
            className="w-full sm:w-auto"
          />
          <Button onClick={handleSave} className="flex-shrink-0">
            Save
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AutomationSetup;