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

export type ViewLimit = "1 (Burn)" | "5 Views" | "10 Views" | "Unlimited";
export type EncryptionType = "AES-256-GCM" | "AES-CTR" | "PBKDF2-HMAC";
export type Expiration = "1 Hour" | "24 Hours" | "7 Days" | "Never";
