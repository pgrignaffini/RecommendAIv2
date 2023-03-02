declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
    API_KEY: string;
    TMDB_API_URL: string;
    DATABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
  }
}

declare module "tailwind-scrollbar-hide";
