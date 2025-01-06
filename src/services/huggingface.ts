import { HfInference } from '@huggingface/inference';

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const inference = new HfInference(HF_TOKEN);

export interface ModelInfo {
  id: string;
  name: string;
  description: string;
  category: string;
  task?: string;
}

export async function searchModels(query: string): Promise<ModelInfo[]> {
  try {
    const response = await fetch(
      `https://huggingface.co/api/models?search=${encodeURIComponent(query)}`,
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
        },
      }
    );
    
    const data = await response.json();
    return data.map((model: any) => ({
      id: model.modelId,
      name: model.modelId.split('/').pop(),
      description: model.description,
      category: model.pipeline_tag,
      task: model.task
    }));
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
}

export async function getModelDetails(modelId: string): Promise<ModelInfo | null> {
  try {
    const response = await fetch(`https://huggingface.co/api/models/${modelId}`, {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
      },
    });
    
    const data = await response.json();
    return {
      id: data.modelId,
      name: data.modelId.split('/').pop(),
      description: data.description,
      category: data.pipeline_tag,
      task: data.task
    };
  } catch (error) {
    console.error('Error fetching model details:', error);
    return null;
  }
}