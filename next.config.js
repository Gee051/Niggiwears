/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    DB_URI:"mongodb://localhost:27017/niggiwears",
    NEXTAUTH_SECRET:"allonGod"
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
