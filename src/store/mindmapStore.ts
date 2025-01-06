import { create } from 'zustand';
import { Node, Edge } from '../types/mindmap';
import { autoLayout } from '../utils/layout';

interface MindmapState {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  autoArrangeNodes: () => void;
}

export const useMindmapStore = create<MindmapState>((set) => ({
  nodes: [
    {
      id: '1',
      type: 'default',
      position: { x: 400, y: 200 },
      data: { 
        label: 'Artificial Intelligence',
        category: 'root',
        description: 'The simulation of human intelligence by machines'
      }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 200, y: 400 },
      data: {
        label: 'Machine Learning',
        category: 'branch',
        description: 'Systems that learn and improve from experience'
      }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 600, y: 400 },
      data: {
        label: 'Deep Learning',
        category: 'branch',
        description: 'Neural networks with multiple layers'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' }
  ],
  addNode: (node) => set((state) => {
    const newNodes = [...state.nodes, node];
    return { nodes: autoLayout(newNodes, state.edges) };
  }),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, ...data } : node
    ),
  })),
  autoArrangeNodes: () => set((state) => ({
    nodes: autoLayout(state.nodes, state.edges)
  })),
}));