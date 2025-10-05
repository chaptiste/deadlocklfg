import { Elysia } from "elysia";
import { openapi } from '@elysiajs/openapi';
import { auth } from "./auth";

// user middleware (compute user and session and pass to routes)
const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

const app = new Elysia()
  .use(openapi())
  .use(betterAuth)
  .get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port} ${Bun.env.DATABASE_URL}`
);
