import { HfInference } from '@huggingface/inference';

const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_TOKEN;
const inference = new HfInference(HF_TOKEN);

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<ApiResponse<T>> {
  const { timeout = 5000, ...fetchOptions } = options;

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HF_TOKEN}`,
        ...fetchOptions.headers,
      },
    });

    clearTimeout(id);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export const api = {
  models: {
    search: (query: string) => 
      fetchWithTimeout(`https://huggingface.co/api/models?search=${encodeURIComponent(query)}`),
    getDetails: (modelId: string) =>
      fetchWithTimeout(`https://huggingface.co/api/models/${modelId}`),
  },
};