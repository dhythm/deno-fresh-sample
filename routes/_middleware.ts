import { MiddlewareHandlerContext } from "$fresh/server.ts";

export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  console.log("---------- invoke top-level middleware ----------");
  const res = await ctx.next();
  res.headers.set("server", "fresh server");
  return res;
}
