import * as jose from "https://deno.land/x/jose@v4.8.3/index.ts";
import { findSessionByToken } from "./db.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"]
);

export const generateAccessToken = async (username: string) => {
  const jwt = await new jose.SignJWT({
    jti: crypto.randomUUID(),
    sub: username,
  })
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);
  return jwt;
};

export const verifyAccessToken = async (jwt: string) => {
  const { payload } = await jose.jwtVerify(jwt, key);
  return payload;
};

export const verifySession = async (jwt: string) => {
  try {
    const session = await findSessionByToken(jwt);
    const payload = await verifyAccessToken(jwt);
    return payload.sub === session?.username;
  } catch (e) {
    console.log(e);
    return false;
  }
};
