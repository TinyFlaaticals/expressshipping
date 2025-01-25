declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string;
      RECIPIENT_EMAIL: string;
      NODE_ENV: 'development' | 'production';
      // Add any other environment variables here
    }
  }
}

export {}; 