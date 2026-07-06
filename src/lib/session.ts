import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV && process.env.NODE_ENV === "production") {
  console.error(
    "[GUVENLIK] JWT_SECRET ortam degiskeni tanimli degil — varsayilan (guvensiz) secret kullaniliyor! Vercel proje ayarlarindan JWT_SECRET eklenmeli."
  );
}
const SECRET = new TextEncoder().encode(
  JWT_SECRET_ENV || "vam-dev-secret-change-in-production-please"
);
const COOKIE_NAME = "vam_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 gün

export interface SessionPayload {
  userId: string;
  username: string;
  role: "admin" | "partner";
  displayName: string;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(SECRET);
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
