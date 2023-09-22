    import NextAuth from 'next-auth'
    import GoogleProvider from 'next-auth/providers/google'




    export default NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackUrl: '/auth/callback/google',
        }),
    ],

    callbacks: {
        async redirect(url, baseUrl) {
          return url.startsWith(baseUrl) ? url : baseUrl;
        },
        },
  onError(error) {
    console.error("NextAuth Error:", error.message);
  },
    })