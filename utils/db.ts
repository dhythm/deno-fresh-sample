import "dotenv/load.ts";
import { Client } from "postgress";

export interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface User {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}

interface Session {
  id: string;
  username: string;
  access_token: string;
  created_at: string;
  expires_at: string;
}

const client = new Client({
  user: Deno.env.get("DB_USER"),
  database: Deno.env.get("POSTGRES_DB"),
  hostname: Deno.env.get("DB_HOST"),
  password: Deno.env.get("DB_PASSWORD"),
  port: Deno.env.get("DB_PORT"),
});

await client.connect();

export const findAllArticles = async () => {
  try {
    const result = await client.queryObject<Article>(
      "SELECT * FROM articles ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const findArticleById = async (id: string) => {
  try {
    const result = await client.queryObject<Article>(
      "SELECT * FROM articles WHERE id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createArticle = async (
  article: Pick<Article, "title" | "content">
) => {
  try {
    const result = await client.queryObject<Article>(
      "INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *",
      [article.title, article.content]
    );
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    const result = await client.queryObject<User>(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createSession = async (username: string, accessToken: string) => {
  try {
    const result = await client.queryObject<Session>(
      "INSERT INTO sessions (username, access_token) VALUES ($1, $2) RETURNING *",
      [username, accessToken]
    );
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const findSessionByToken = async (token: string) => {
  try {
    const result = await client.queryObject<Session>(
      "SELECT * FROM sessions WHERE access_token = $1",
      [token]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  } catch (e) {
    console.error(e);
    return null;
  }
};
