export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  type: 'theory' | 'practical' | 'code' | 'advanced';
  completed?: boolean;
}

export interface Progress {
  moduleId: string;
  topicId: string;
  completed: boolean;
  timeSpent: number;
  completionDate?: string;
}