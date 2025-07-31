import { type StoryCount, type Schedule } from './types';

export const DEFAULT_TOPICS: string[] = [
    'United Kingdom',
    'World',
    'Local',
    'Business',
    'Technology',
    'Entertainment',
    'Sports',
    'Science',
    'Health',
    'Music'
];

export const SCHEDULES: { value: Schedule; label: string }[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'monday', label: 'Mondays' },
  { value: 'tuesday', label: 'Tuesdays' },
  { value: 'wednesday', label: 'Wednesdays' },
  { value: 'thursday', label: 'Thursdays' },
  { value: 'friday', label: 'Fridays' },
  { value: 'saturday', label: 'Saturdays' },
  { value: 'sunday', label: 'Sundays' },
];

export const STORY_COUNTS: StoryCount[] = Array.from({ length: 10 }, (_, i) => i + 1);
