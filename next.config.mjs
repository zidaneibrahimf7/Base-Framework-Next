/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          remotePatterns: [
               {
                    hostname: 'cdn.dummyjson.com'
               },
               {
                    hostname: 'cdn.myanimelist.net'
               },
          ]
     }
};

export default nextConfig;
