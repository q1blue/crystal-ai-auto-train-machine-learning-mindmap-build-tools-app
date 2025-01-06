import React from 'react';
import { Plus, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { useReactFlow } from 'reactflow';
import { useMindmapStore } from '../store/mindmapStore';

export const Toolbar: React.FC = () => {
  const { zoomIn, zoomOut } = useReactFlow();
  const addNode = useMindmapStore((state) => state.addNode);

  const handleAddNode = () => {
    const newNode = {
      id: `node-${Math.random()}`,
      type: 'default',
      position: { x: 400, y: 400 },
      data: { label: 'New Topic', category: 'leaf' }
    };
    addNode(newNode);
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 flex gap-2">
      <button
        onClick={handleAddNode}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Add Node"
      >
        <Plus className="w-5 h-5" />
      </button>
      <button
        onClick={() => zoomIn()}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        onClick={() => zoomOut()}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Export"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );
};