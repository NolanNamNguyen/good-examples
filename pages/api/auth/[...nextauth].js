// /* eslint-disable new-cap */
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
//
// const options = {
//   // Configure one or more authentication providers
//   providers: [
//     Providers.Credentials({
//       authorize: async (credentials) => {
//         if (credentials) {
//           return {
//             name: 'Administrator',
//             ...credentials,
//           };
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     /**
//      * @param  {string} url      URL provided as callback URL by the client
//      * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
//      * @return {string}          URL the client will be redirect to
//      */
//     async redirect(url, baseUrl) {
//       return baseUrl;
//     },
//     async session(session, user) {
//       session.profile = user.profile;
//       return session;
//     },
//     async jwt(token, user) {
//       if (user && user.profile) {
//         token.profile = JSON.parse(user.profile);
//       }
//       return token;
//     },
//   },
// };
//
// export default (req, res) => NextAuth(req, res, options);
