import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {hostname: "avatars.githubusercontent.com"}, 
      {hostname: "upload.wikimedia.org"}, 
      {hostname: "i.pinimg.com"},
      {hostname: "utfs.io"}
      ],  
  }
  /* config options here */
};

export default nextConfig;
