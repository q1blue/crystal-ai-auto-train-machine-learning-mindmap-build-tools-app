export interface Node {
  id: string;
  type: 'default';
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    category?: string;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}