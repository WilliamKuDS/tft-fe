/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    DJANGO_ADDRESS: process.env.DJANGO_ADDRESS,
    DJANGO_PORT: process.env.DJANGO_PORT,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    TFT_RIOT_API_KEY: process.env.TFT_RIOT_API_KEY,
  },
};

export default nextConfig;
