import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export default NextAuth({
  secret: 'w3b3d3v b00tc4mp',
  debug: false,
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers 
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.discord = token.discord
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      const discord = {
        id: profile.id,
        username: `${profile.username}#${profile.discriminator}`,
        verified: profile.verified,
        email: profile.email,
        locale: profile.locale,
      };
      if(user) {
        account.discord = discord;
      }
      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if(account) {
        token.discord = account.discord
        token.accessToken = account.access_token;
      }
      return token;
    }
  }
})
