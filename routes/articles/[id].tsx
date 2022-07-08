/** @jsx h */
import { PageProps } from "$fresh/server.ts";
import { h } from "preact";

export default function ArticlePage(props: PageProps) {
  const { id } = props.params;
  return (
    <div>
      <h1>Article: {id}</h1>
    </div>
  );
}
