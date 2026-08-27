import NextAuth, { NextAuthOptions } from 'nextauth';
import CredentialsProvider from 'nextauth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (credentials?.email && credentials?.password) {
          return {
            id: '1',
            name: 'Demo User',
            email: credentials.email,
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-builds',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };