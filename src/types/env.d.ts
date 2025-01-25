declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_API_KEY: string;
      RECIPIENT_EMAIL: string;
    }
  }
}

export {}; 