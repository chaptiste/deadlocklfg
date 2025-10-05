import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "./generated/prisma";
// If your Prisma file is located elsewhere, you can change the path

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        discord: {
            clientId: Bun.env.DISCORD_CLIENT_ID!,
            clientSecret: Bun.env.DISCORD_CLIENT_SECRET!
        }
    }
});