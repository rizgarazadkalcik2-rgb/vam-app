import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { ensureSchema } from "./schema";

export type Role = "admin" | "partner";

export interface VamUser {
  id: string;
  username: string;
  password_hash: string;
  role: Role;
  display_name: string;
  status: string;
  failed_attempts: number;
  locked_until: string | null;
  created_at: string;
  updated_at: string;
}

export type SafeUser = Omit<VamUser, "password_hash">;

export async function findUserByUsername(username: string): Promise<VamUser | null> {
  await ensureSchema();
  const { rows } = await sql<VamUser>`
    SELECT * FROM users WHERE LOWER(username) = LOWER(${username}) LIMIT 1;
  `;
  return rows[0] || null;
}

export async function findUserById(id: string): Promise<VamUser | null> {
  await ensureSchema();
  const { rows } = await sql<VamUser>`
    SELECT * FROM users WHERE id = ${id} LIMIT 1;
  `;
  return rows[0] || null;
}

export async function listAllUsers(): Promise<VamUser[]> {
  await ensureSchema();
  const { rows } = await sql<VamUser>`
    SELECT * FROM users ORDER BY created_at DESC;
  `;
  return rows;
}

export async function createUser(data: {
  username: string;
  password: string;
  role: Role;
  displayName: string;
}): Promise<VamUser> {
  await ensureSchema();
  const id = `u_${data.role}_${Date.now()}`;
  const passwordHash = await bcrypt.hash(data.password, 10);
  const { rows } = await sql<VamUser>`
    INSERT INTO users (id, username, password_hash, role, display_name, status)
    VALUES (${id}, ${data.username}, ${passwordHash}, ${data.role}, ${data.displayName}, 'active')
    RETURNING *;
  `;
  return rows[0];
}

export async function updateUserPassword(id: string, newPassword: string): Promise<boolean> {
  await ensureSchema();
  const passwordHash = await bcrypt.hash(newPassword, 10);
  const { rowCount } = await sql`
    UPDATE users SET password_hash = ${passwordHash}, updated_at = now() WHERE id = ${id};
  `;
  return (rowCount ?? 0) > 0;
}

export async function updateUserStatus(id: string, status: "active" | "disabled"): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`
    UPDATE users SET status = ${status}, updated_at = now() WHERE id = ${id};
  `;
  return (rowCount ?? 0) > 0;
}

export async function updateUserDisplayName(id: string, displayName: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`
    UPDATE users SET display_name = ${displayName}, updated_at = now() WHERE id = ${id};
  `;
  return (rowCount ?? 0) > 0;
}

export async function deleteUser(id: string): Promise<boolean> {
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM users WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

export async function usernameExists(username: string): Promise<boolean> {
  await ensureSchema();
  const { rows } = await sql`
    SELECT 1 FROM users WHERE LOWER(username) = LOWER(${username}) LIMIT 1;
  `;
  return rows.length > 0;
}

// --- Kaba kuvvet (brute-force) koruması ---
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

export async function recordFailedLogin(id: string): Promise<void> {
  await ensureSchema();
  const { rows } = await sql<{ failed_attempts: number }>`
    UPDATE users SET failed_attempts = failed_attempts + 1, updated_at = now()
    WHERE id = ${id}
    RETURNING failed_attempts;
  `;
  const attempts = rows[0]?.failed_attempts ?? 0;
  if (attempts >= MAX_FAILED_ATTEMPTS) {
    await sql`
      UPDATE users SET locked_until = now() + (${LOCKOUT_MINUTES} * interval '1 minute')
      WHERE id = ${id};
    `;
  }
}

export async function resetFailedLogins(id: string): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE users SET failed_attempts = 0, locked_until = NULL, updated_at = now()
    WHERE id = ${id};
  `;
}

export function isLocked(user: VamUser): boolean {
  return !!user.locked_until && new Date(user.locked_until).getTime() > Date.now();
}

export function lockRemainingSeconds(user: VamUser): number {
  if (!user.locked_until) return 0;
  return Math.max(0, Math.ceil((new Date(user.locked_until).getTime() - Date.now()) / 1000));
}
