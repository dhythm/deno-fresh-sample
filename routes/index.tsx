/** @jsx h */
import { Handlers } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import { tw } from "@twind";
import { h } from "preact";

export const handler: Handlers = {
  GET(_req, _ctx) {
    return new Response("", { status: 303, headers: { Location: "/login" } });
  },
};

export default function Home() {
  return (
    <div class={tw("h-screen bg-gray-200")}>
      <Head>
        <title>Loading</title>
      </Head>
      <div
        class={tw(
          "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col"
        )}
      >
        <p>Loading...</p>
      </div>
    </div>
  );
}
