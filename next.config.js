/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "opfaxotdajkhrhhzqvxk.supabase.co",
      },
      {
        protocol: "https",
        hostname: "share.google",
      },
    ],
  },
};

module.exports = nextConfig;
