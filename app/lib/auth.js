import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/app/lib/prisma"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: "/login",
        signOut: "/"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.email || !credentials.password) {
                    return null;
                }

                let existingUser;

                try {

                    existingUser = await prisma.users.findMany({
                        where: { email: credentials.email }
                    });
    
                    if (!existingUser) {
                        return null;
                    }
    
                    const passwordMatch = await compare(credentials.password, existingUser[0].password);
    
                    if (!passwordMatch) {
                        return null;
                    }

                } catch (err) {

                    console.log("Error", err);
                    return null;

                }

                return {
                    id: existingUser[0].id,
                    email: existingUser[0].email,
                    role: existingUser[0].role
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    role: token.role
                }
            }
        }
    }
}
