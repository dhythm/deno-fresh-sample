/** @jsx h */
import { Head } from "$fresh/src/runtime/head.ts";
import { tw } from "@twind";
import { h } from "preact";

export default function CreateArticlePage() {
  return (
    <div class={tw("min-h-screen bg-gray-200")}>
      <Head>
        <title>Create Post</title>
      </Head>
      <div
        class={tw(
          "max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col"
        )}
      >
        <h1 class={tw("font-extrabold text-5xl text-gray-800")}>Create Post</h1>

        <form
          class={tw("rounded-xl border p-5 shadow-md bg-white mt-8")}
          method="POST"
        >
          <div class={tw("flex flex-col gap-y-2")}>
            <div>
              <label class={tw("text-gray-500 text-sm")} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                class={tw("w-full p-2 border border-gray-300 rounded-md")}
                type="text"
                name="title"
              />
            </div>
            <div>
              <label class={tw("text-gray-500 text-sm")} htmlFor="content">
                Content
              </label>
              <textarea
                id="content"
                rows={10}
                class={tw("w-full p-2 border border-gray-300 rounded-md")}
                name="content"
              />
            </div>
          </div>
          <div class={tw("flex justify-end mt-4")}>
            <button
              class={tw(
                "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              )}
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
