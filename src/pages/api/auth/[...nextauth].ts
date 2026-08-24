import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    // Example: Google login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Example: Email/password login
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Replace with your own user lookup
        if (
          credentials?.email === 'admin@example.com' &&
          credentials?.password === 'password123'
        ) {
          return {
            id: '1',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach role to session
      session.user.role = (token as any).role || 'user';
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
  },
});
