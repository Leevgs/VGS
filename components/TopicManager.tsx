import React, { useState } from 'react';
import { type Topic } from '../types';
import { DEFAULT_TOPICS } from '../constants';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { PlusIcon } from './icons/PlusIcon';
import { XIcon } from './icons/XIcon';

interface TopicManagerProps {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
}

const TopicManager: React.FC<TopicManagerProps> = ({ topics, setTopics }) => {
  const [newTopic, setNewTopic] = useState('');

  const handleAddTopic = () => {
    const trimmedTopic = newTopic.trim();
    if (trimmedTopic && !topics.includes(trimmedTopic)) {
      setTopics([...topics, trimmedTopic]);
      setNewTopic('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleAddTopic();
    }
  }

  const handleRemoveTopic = (topicToRemove: Topic) => {
    setTopics(topics.filter(topic => topic !== topicToRemove));
  };
  
  const handleAddTopicFromSuggestion = (topicToAdd: Topic) => {
    if (!topics.includes(topicToAdd)) {
      setTopics([...topics, topicToAdd]);
    }
  };

  const activeTopics = topics;
  const suggestedTopics = DEFAULT_TOPICS.filter(t => !activeTopics.includes(t));

  return (
    <Card>
      <h2 className="text-lg font-semibold text-card-foreground mb-4">Manage Topics</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a custom topic"
          className="flex-grow"
        />
        <Button onClick={handleAddTopic} size="icon">
          <PlusIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Topics</h3>
          <div className="flex flex-wrap gap-2 min-h-[40px] bg-gray-100/60 p-3 rounded-md border">
            {activeTopics.length > 0 ? (
              activeTopics.map((topic) => (
                <span key={topic} className="flex items-center bg-white border border-gray-300 shadow-sm rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                  {topic}
                  <button onClick={() => handleRemoveTopic(topic)} className="ml-2 -mr-1 p-0.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors">
                    <XIcon className="h-4 w-4" />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground self-center px-2">Click a suggestion below to add a topic.</p>
            )}
          </div>
        </div>

        {suggestedTopics.length > 0 && (
          <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Suggestions</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((topic) => (
                  <button 
                    key={topic} 
                    onClick={() => handleAddTopicFromSuggestion(topic)}
                    className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm font-medium hover:bg-gray-200/80 hover:border-gray-300 border border-transparent transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TopicManager;