import React from 'react';
import { Handle, Position } from 'reactflow';

interface NodeCardProps {
  data: {
    label: string;
    description?: string;
    category?: string;
  };
}

export const NodeCard: React.FC<NodeCardProps> = ({ data }) => {
  const getBgColor = () => {
    switch (data.category) {
      case 'root':
        return 'bg-indigo-500';
      case 'branch':
        return 'bg-emerald-500';
      default:
        return 'bg-sky-500';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg ${getBgColor()} min-w-[150px]`}>
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="text-white">
        <h3 className="font-bold">{data.label}</h3>
        {data.description && (
          <p className="text-sm mt-1 text-white/80">{data.description}</p>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  );
};