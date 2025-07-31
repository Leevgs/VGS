export type Schedule = 'daily' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type StoryCount = number;

export type Topic = string;

export interface Article {
  title: string;
  summary: string;
  url: string;
}

export interface TopicDigest {
    topicName: string;
    articles: Article[];
}

export interface DigestData {
    digest: TopicDigest[];
}

export interface Digest {
  id: string;
  name:string;
  topics: Topic[];
  storyCount: StoryCount;
  schedule: Schedule;
}