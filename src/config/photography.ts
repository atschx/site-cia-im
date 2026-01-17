/**
 * Photography page configuration
 */

export const PHOTOGRAPHY_CONFIG = {
  pagination: {
    initialPageSize: 6,
    incrementSize: 3,
  },
  categories: {
    defaultCategory: 'all' as const,
  },
} as const;
