import { Node, Edge } from '../types/mindmap';

export function autoLayout(nodes: Node[], edges: Edge[]) {
  const VERTICAL_SPACING = 150;
  const HORIZONTAL_SPACING = 250;
  
  const rootNode = nodes.find(node => node.data.category === 'root');
  if (!rootNode) return nodes;

  const levels = new Map<string, number>();
  const visited = new Set<string>();

  function calculateLevels(nodeId: string, level: number) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    levels.set(nodeId, level);
    
    const childEdges = edges.filter(edge => edge.source === nodeId);
    childEdges.forEach(edge => calculateLevels(edge.target, level + 1));
  }

  calculateLevels(rootNode.id, 0);

  return nodes.map(node => {
    const level = levels.get(node.id) || 0;
    const nodesAtLevel = nodes.filter(n => levels.get(n.id) === level);
    const index = nodesAtLevel.indexOf(node);
    
    return {
      ...node,
      position: {
        x: (index - nodesAtLevel.length / 2) * HORIZONTAL_SPACING + 400,
        y: level * VERTICAL_SPACING + 100
      }
    };
  });
}