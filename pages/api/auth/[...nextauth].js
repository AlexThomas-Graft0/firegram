import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/api/auth/signin",
  },
  secret: "LHmOc3G/Mk2XCy3+i2WAYjs108/gI5bVQu4Jwy+B0U8=",
  callbacks: {
    async session({ session, user, token }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLowerCase();
      session.user.uid = token.sub;

      return session;
    },
  },
  //   theme: {
  // Customize the look and feel of NextAuth
  //
  // For example:
  //
  // logo: "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png",
  // brandColor: "#fafafa",
  // colorScheme: "auto",
  //
  // colors: {
  //   primary: '#0070f3',
  //   secondary: '#1e90ff',
  // },
  //
  // font: {
  //   family: '"Roboto", "Helvetica", "Arial", sans-serif',
  //   size: '14px',
  //   height: '20px',
  // },
  //
  // button: {
  //   background: '#0070f3',
  //   border: '#0070f3',
  //   fontWeight: 'bold',
  //   color: '#fff',
  // },
  //
  //   },
});
