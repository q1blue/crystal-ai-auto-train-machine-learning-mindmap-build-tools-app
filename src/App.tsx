import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Brain } from 'lucide-react';
import { useMindmapStore } from './store/mindmapStore';
import { NodeCard } from './components/NodeCard';
import { Toolbar } from './components/Toolbar';
import { ModelSearch } from './components/ModelSearch';

const nodeTypes = {
  default: NodeCard,
};

function App() {
  const { nodes, edges } = useMindmapStore();

  return (
    <div className="h-screen w-screen bg-gray-50">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <Brain className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">Crystal AI Mindmap</h1>
      </div>
      
      <ReactFlowProvider>
        <div className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{
              style: { strokeWidth: 2 },
              type: 'smoothstep',
              animated: true,
            }}
            fitView
          >
            <Background />
            <Controls />
            <Toolbar />
            <ModelSearch />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;