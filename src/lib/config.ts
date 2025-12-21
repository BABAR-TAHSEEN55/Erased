/**
 * Environemnt Configuration Utility
 *
 * @returns production URL
 */
export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV == "production") {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  return "http://localhost:3000";
};
