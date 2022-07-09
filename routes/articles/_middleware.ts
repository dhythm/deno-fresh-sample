import { MiddlewareHandlerContext } from "$fresh/server.ts";
import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.144.0/http/cookie.ts";
import { verifySession } from "../../utils/session.ts";

interface State {
  data: string;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>
) {
  console.log("---------- call middleware in articles ----------");
  const accessToken = getCookies(req.headers)["fresh_blog"];
  const authenticated = await verifySession(accessToken);
  if (!authenticated) {
    const res = new Response("", {
      status: 303,
      headers: { Location: "/login" },
    });
    setCookie(res.headers, {
      name: "fresh_blog",
      value: "",
      httpOnly: true,
    });
    return res;
  }

  const resp = await ctx.next();
  resp.headers.set("server", "fresh server");
  return resp;
}
