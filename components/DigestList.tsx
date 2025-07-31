import React from 'react';
import { type Digest } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { PlusIcon } from './icons/PlusIcon';
import { PencilIcon } from './icons/PencilIcon';
import { TrashIcon } from './icons/TrashIcon';
import { AutomationIcon } from './icons/AutomationIcon';

interface DigestListProps {
  digests: Digest[];
  selectedDigestId: string | null;
  onCreate: () => void;
  onEdit: (digest: Digest) => void;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  onAutomate: (digest: Digest) => void;
}

const scheduleLabels: { [key: string]: string } = {
    daily: 'Daily',
    monday: 'Mondays',
    tuesday: 'Tuesdays',
    wednesday: 'Wednesdays',
    thursday: 'Thursdays',
    friday: 'Fridays',
    saturday: 'Saturdays',
    sunday: 'Sundays',
}

const DigestList: React.FC<DigestListProps> = ({ digests, selectedDigestId, onCreate, onEdit, onDelete, onSelect, onAutomate }) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">My Digests</h2>
        <Button onClick={onCreate} size="sm" className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Create New
        </Button>
      </div>
      <div className="space-y-3">
        {digests.length > 0 ? (
          digests.map((digest) => {
            const isSelected = digest.id === selectedDigestId;
            return (
                <div
                    key={digest.id}
                    onClick={() => onSelect(digest.id)}
                    className={`flex items-center justify-between p-3 border rounded-lg shadow-sm transition-all duration-200 cursor-pointer ${
                        isSelected
                        ? 'bg-indigo-100 border-indigo-300 ring-2 ring-indigo-200 shadow-md'
                        : 'bg-white/70 hover:shadow-md hover:bg-gray-50'
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(digest.id); }}
                >
                    <div className="overflow-hidden mr-2">
                      <p className="font-semibold text-gray-800 truncate">{digest.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${isSelected ? 'bg-indigo-200 text-indigo-800' : 'bg-gray-100 text-gray-700'}`}>{scheduleLabels[digest.schedule]}</span>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Button onClick={(e) => { e.stopPropagation(); onAutomate(digest); }} size="icon" variant="ghost" aria-label="Automate">
                            <AutomationIcon className="h-4 w-4 text-purple-600" />
                        </Button>
                        <Button onClick={(e) => { e.stopPropagation(); onEdit(digest); }} size="icon" variant="ghost" aria-label="Edit">
                            <PencilIcon className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button onClick={(e) => { e.stopPropagation(); onDelete(digest.id); }} size="icon" variant="ghost" aria-label="Delete">
                            <TrashIcon className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                </div>
            )
          })
        ) : (
          <div className="text-center py-8 px-4 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground font-medium">No digests found.</p>
            <p className="text-sm text-muted-foreground">Click "Create New" to set up your first digest.</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DigestList;