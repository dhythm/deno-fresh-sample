/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { tw } from "@twind";
import { setCookie } from "https://deno.land/std@0.144.0/http/cookie.ts";
import { h } from "preact";
import { bcrypt } from "../deps.ts";
import { createSession, findUserByUsername } from "../utils/db.ts";
import { generateAccessToken } from "../utils/session.ts";

interface Data {
  error: {
    form: string;
    username: string;
    password: string;
  };
  username?: string;
  password?: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const formData = await req.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !password) {
      return ctx.render({
        error: {
          form: "",
          username: username ? "" : "Required",
          password: password ? "" : "Required",
        },
        username,
        password: "",
      });
    }

    const user = await findUserByUsername(username);
    if (!user)
      return ctx.render({
        error: {
          form: "Username or Password is not correct",
          username: "",
          password: "",
        },
        username,
        password: "",
      });

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isCorrectPassword)
      return ctx.render({
        error: {
          form: "Username or Password is not correct",
          username: "",
          password: "",
        },
        username,
        password: "",
      });

    const accessToken = await generateAccessToken(username);

    await createSession(username, accessToken);

    const res = new Response("", { status: 303, headers: { Location: "/" } });
    setCookie(res.headers, {
      name: "fresh_blog",
      value: accessToken,
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res;
  },
};

export default function LoginPage({ data }: PageProps<Data | undefined>) {
  return (
    <div class={tw("min-h-screen bg-gray-200")}>
      <Head>
        <title>Login</title>
      </Head>
      <div
        class={tw(
          "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col"
        )}
      >
        <h1 class={tw("font-extrabold text-5xl text-gray-800")}>Login</h1>
        <form
          class={tw("rounded-xl border p-5 shadow-md bg-white mt-8")}
          method="POST"
        >
          <div class={tw("flex flex-col gap-y-2")}>
            <div>
              <label class={tw("text-gray-500 text-sm")} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                class={tw("w-full p-2 border border-gray-300 rounded-md")}
                type="text"
                name="username"
              />
              {data?.error?.username && (
                <p class={tw("text-red-500 text-sm")}>{data.error.username}</p>
              )}
            </div>
            <div>
              <label class={tw("text-gray-500 text-sm")} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                class={tw("w-full p-2 border border-gray-300 rounded-md")}
                type="password"
                name="password"
              />
              {data?.error?.password && (
                <p class={tw("text-red-500 text-sm")}>{data.error.password}</p>
              )}
            </div>
          </div>
          {data?.error?.form && (
            <p class={tw("text-red-500 text-sm")}>{data.error.form}</p>
          )}
          <div class={tw("flex justify-end mt-4")}>
            <button
              class={tw(
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              )}
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
