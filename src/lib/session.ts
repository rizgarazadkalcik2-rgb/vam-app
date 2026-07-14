import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { findUserById } from "./users";

const JWT_SECRET_ENV = process.env.JWT_SECRET;

// GÜVENLİK: secret'i modül yüklenirken değil, ilk gerçek kullanımda (token
// imzalama/doğrulama) hesaplıyoruz. Böylece `next build` sırasında bu modül
// statik analiz için import edilirse (JWT_SECRET henüz build ortamına
// enjekte edilmemiş olabilir) build çökmez — ama prodüksiyonda gerçek bir
// isteğin secret'i KULLANMAYA çalıştığı an env değişkeni hâlâ eksikse,
// bilinen/sabit bir secret'e sessizce düşmek yerine hemen fırlatıyoruz
// (fail-closed). Eskiden eksik env değişkeninde kaynak kodda görünen sabit
// bir dev-secret'a düşülüyordu — bu, imzası bilinen bir secret'le sahte
// admin token'ı üretilebilmesi anlamına geliyordu.
function getSecret(): Uint8Array {
  if (!JWT_SECRET_ENV) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "[GUVENLIK] JWT_SECRET ortam degiskeni tanimli degil — Vercel proje ayarlarindan eklenmeden oturum imzalama/dogrulama calismaz."
      );
    }
    return new TextEncoder().encode("vam-dev-secret-change-in-production-please");
  }
  return new TextEncoder().encode(JWT_SECRET_ENV);
}
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
    .sign(getSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
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
  let user;
  try {
    user = await findUserById(payload.userId);
  } catch (err) {
    // DB'ye ulaşılamıyorsa (geçici kesinti) burada patlayıp çağıran
    // sayfa/route'u yakalanmamış bir istisnayla çökertmek yerine "oturum
    // yok" say — fail-closed (güvenlik yönü doğru kalır) ama çağıran taraf
    // en azından temiz bir 401/giriş sayfası görür, çıplak 500 değil.
    console.error("[session] getSession() sırasında DB hatası:", err);
    return null;
  }
  if (!user || user.status !== "active" || user.session_version !== payload.sessionVersion) {
    return null;
  }

  return payload;
}

export { COOKIE_NAME };
