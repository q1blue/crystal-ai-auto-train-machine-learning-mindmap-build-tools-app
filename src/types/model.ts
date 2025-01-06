export interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  task?: string;
  metrics?: Record<string, number>;
}

export type ModelCategory = 'root' | 'branch' | 'leaf';