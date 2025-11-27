
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  level: number;
  completedTasks: number;
  xp: number;
  joinDate: string;
  avatar?: string;
  location?: string;
  bio?: string;
}

// Changed from enum to const object for better runtime safety in all environments
export const TaskType = {
  SURVEY: 'SURVEY',
  APP_DOWNLOAD: 'APP_DOWNLOAD',
  GAME: 'GAME',
  VIDEO: 'VIDEO'
} as const;

export type TaskType = typeof TaskType[keyof typeof TaskType];

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number; // in IDR
  timeEstimate: string; // e.g., "5 min"
  type: TaskType;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  image: string;
}

export interface Reward {
  id: string;
  name: string;
  minAmount: number; // in IDR
  image: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'EARN' | 'WITHDRAW';
  amount: number; // in IDR
  description: string;
  date: string;
  status: 'COMPLETED' | 'PENDING';
}
