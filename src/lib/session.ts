import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById } from "./users";

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
  sessionVersion: number;
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
  const payload = await verifySessionToken(token);
  if (!payload) return null;

  // GÜVENLİK: JWT imzası geçerli olsa da, kullanıcının DB'deki güncel
  // durumunu her istekte yeniden sorguluyoruz. İmza kontrolü tek başına
  // yeterli değil — devre dışı bırakılan veya şifresi sıfırlanan bir
  // kullanıcının elindeki eski çerez, aksi halde 7 gün boyunca (token süresi
  // dolana kadar) geçerli kalmaya devam ederdi.
  const user = await findUserById(payload.userId);
  if (!user || user.status !== "active" || user.session_version !== payload.sessionVersion) {
    return null;
  }

  return payload;
}

export { COOKIE_NAME };
