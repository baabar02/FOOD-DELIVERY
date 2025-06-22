// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
  
//   images:{
//     remotePatterns:[{
//       hostname: "res.cloudinary.com"
//     }]
//   }
// };

// export default nextConfig;
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...(config.resolve || {}),
        fallback: {
          ...(config.resolve?.fallback || {}),
          fs: false,
          stream: false,
          zlib: false,
        },
      };
    }

    
    return config;
  },
};

export default nextConfig;
