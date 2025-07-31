import React, { useState, useEffect } from 'react';
import { type Digest, type Topic, type Schedule, type StoryCount } from '../types';
import { SCHEDULES, STORY_COUNTS } from '../constants';
import { Modal } from './ui/Modal';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import TopicManager from './TopicManager';

interface DigestConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (digest: Digest) => void;
  digest: Digest | null; // null for new, object for editing
}

const DigestConfigModal: React.FC<DigestConfigModalProps> = ({ isOpen, onClose, onSave, digest }) => {
  const [name, setName] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [storyCount, setStoryCount] = useState<StoryCount>(5);
  const [schedule, setSchedule] = useState<Schedule>('daily');
  
  const [isNameInvalid, setIsNameInvalid] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (digest) {
        // Editing existing digest
        setName(digest.name);
        setTopics(digest.topics);
        setStoryCount(digest.storyCount);
        setSchedule(digest.schedule);
      } else {
        // Creating new digest
        setName('Untitled Digest');
        setTopics([]);
        setStoryCount(5);
        setSchedule('daily');
      }
      setIsNameInvalid(false);
    }
  }, [digest, isOpen]);
  
  const handleSave = () => {
    const nameIsValid = name.trim() !== '';
    setIsNameInvalid(!nameIsValid);

    if (!nameIsValid) {
        return;
    }

    const newDigest: Digest = {
      id: digest?.id || `digest_${Date.now()}`,
      name: name.trim(),
      topics,
      storyCount,
      schedule,
    };
    onSave(newDigest);
  };
  
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-card-foreground mb-1">{digest ? 'Edit Digest' : 'Create New Digest'}</h2>
        <p className="text-muted-foreground mb-6 text-sm">Configure your personalized news digest below.</p>
        
        <div className="space-y-5">
          <div>
            <label htmlFor="digest-name" className="block text-sm font-medium text-muted-foreground mb-1">
            Digest Name
            </label>
            <Input
            id="digest-name"
            type="text"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim()) setIsNameInvalid(false);
            }}
            placeholder="e.g., 'My Tech Briefing'"
            className={isNameInvalid ? 'border-red-500 ring-red-500' : ''}
            />
            {isNameInvalid && <p className="text-xs text-red-600 mt-1">Digest name cannot be empty.</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="storyCount" className="block text-sm font-medium text-muted-foreground mb-1">
                Stories per Topic
              </label>
              <Select
                id="storyCount"
                value={storyCount}
                onChange={(e) => setStoryCount(parseInt(e.target.value, 10) as StoryCount)}
              >
                {STORY_COUNTS.map(c => <option key={c} value={c}>{c}</option>)}
              </Select>
            </div>
            <div>
              <label htmlFor="schedule" className="block text-sm font-medium text-muted-foreground mb-1">
                Schedule
              </label>
              <Select
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value as Schedule)}
              >
                {SCHEDULES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </div>
          </div>
          
          <div className="pt-2">
            <TopicManager topics={topics} setTopics={setTopics} />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">Save Digest</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DigestConfigModal;