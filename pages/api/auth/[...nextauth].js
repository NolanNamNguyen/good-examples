/* eslint-disable new-cap */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        if (credentials) {
          return {
            name: 'E-Typing User',
            ...credentials,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.profile = user.profile;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
