
export type BondCategory = 
  | 'Friend' 
  | 'Best Friend' 
  | 'Love' 
  | 'Classmate' 
  | 'Bestie' 
  | 'College Buddy' 
  | 'Custom';

export type Mood = 'Cute' | 'Funny' | 'Emotional' | 'Romantic';

export type Duration = '1 Year' | '3 Years' | 'Forever';

export type Theme = 'Gold' | 'Midnight' | 'Sakura' | 'Ocean';

export interface PassData {
  id: string;
  category: BondCategory;
  customCategory?: string;
  senderName: string;
  receiverName: string;
  duration: Duration;
  mood: Mood;
  theme: Theme;
  customMessage?: string;
  aiMessage?: string;
  createdAt: number;
}

export interface AppState {
  step: 'landing' | 'category' | 'verification' | 'details' | 'generating' | 'result' | 'history';
  data: Partial<PassData>;
  history: PassData[];
}
