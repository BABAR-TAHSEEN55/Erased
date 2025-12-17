/*
Type Safety
*/
export type PostBodyType = {
  // input: string;
  res?: {
    GENERATE_URL: string;

    encrypted: string;
    iv: string;
    lookupLink: string;
    // enc: any;
  };
  settings: {
    encryption: string;
    views: string;
    expiration: string;
  };
};
