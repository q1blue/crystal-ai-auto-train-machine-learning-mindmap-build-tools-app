export function validateModelId(modelId: string): boolean {
  return /^[\w-]+\/[\w-]+$/.test(modelId);
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '').trim();
}

export function validateApiResponse<T>(response: T | null): asserts response is T {
  if (!response) {
    throw new Error('Invalid API response received');
  }
}