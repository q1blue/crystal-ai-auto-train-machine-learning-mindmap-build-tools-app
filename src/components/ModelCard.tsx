import React from 'react';
import { Model } from '../types/model';

interface ModelCardProps {
  model: Model;
  onSelect: (model: Model) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(model)}
      className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-gray-900">{model.name}</h3>
        {model.task && (
          <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
            {model.task}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{model.description}</p>
      {model.metrics && (
        <div className="mt-2 flex gap-2">
          {Object.entries(model.metrics).map(([key, value]) => (
            <span key={key} className="text-xs text-gray-600">
              {key}: {value.toFixed(2)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};