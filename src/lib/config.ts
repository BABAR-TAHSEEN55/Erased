/**
 * Environemnt Configuration Utility
 *
 * @returns production URL
 */
export const getBaseUrl = (): string => {
  if (process.env.NODE_ENV == "production") {
    return "https://vanixftw.live";
  }
  return "http://localhost:3000";
};
