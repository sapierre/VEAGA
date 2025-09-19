/**
 * Generate a unique ID similar to cuid
 * This is a simplified version for development that works in edge runtime
 */
export function createId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}${randomPart}`;
}

/**
 * Generate a shorter ID for less critical use cases
 */
export function createShortId(): string {
  return Math.random().toString(36).substring(2, 8);
}