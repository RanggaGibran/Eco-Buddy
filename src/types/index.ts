export interface UserStats {
  carbonFootprint: number;
  waterUsage: number;
  wasteReduction: number;
  energySaved: number;
  sustainabilityScore: number;
  completedChallenges: number;
  streak: number;
}

export interface EcoAction {
  id: string;
  title: string;
  description: string;
  impact: {
    carbon: number;
    water: number;
    waste: number;
    energy: number;
  };
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'home' | 'transport' | 'food' | 'shopping' | 'energy';
  imageUrl?: string;
}

export interface EcoTip {
  id: string;
  title: string;
  content: string;
  category: string;
  source?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: number; // in days
  points: number;
  category: string;
  steps: string[];
  progress?: number; // 0-100
  imageUrl?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface LocalService {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  website?: string;
  phone?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'infographic' | 'guide';
  category: string;
  url: string;
  imageUrl?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: Date;
}