import { authRouter } from "./auth-router";
import { contentRouter } from "./content-router";
import { uploadRouter } from "./upload-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  content: contentRouter,
  upload: uploadRouter,
});

export type AppRouter = typeof appRouter;
