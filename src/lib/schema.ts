import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";

// Bu fonksiyon ilk kurulumda bir kez çalıştırılır (tablo yoksa oluşturur).
export async function ensureSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS packages (
      id SERIAL PRIMARY KEY,
      partner_id TEXT NOT NULL,
      partner_name TEXT NOT NULL,
      title TEXT NOT NULL,
      destination TEXT NOT NULL,
      nights INTEGER NOT NULL DEFAULT 1,
      price_try NUMERIC NOT NULL,
      capacity INTEGER NOT NULL DEFAULT 0,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'partner',
      display_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // İlk kurulumda mevcut sabit kodlu kullanıcıları (rizgar, acente1) veritabanına aktar.
  // Sadece tablo boşsa çalışır, tekrar tekrar eklemez.
  const { rows } = await sql`SELECT COUNT(*) as count FROM users;`;
  if (Number(rows[0].count) === 0) {
    const adminHash = await bcrypt.hash("admin123", 10);
    const partnerHash = await bcrypt.hash("acente123", 10);
    await sql`
      INSERT INTO users (id, username, password_hash, role, display_name, status)
      VALUES
        ('u_admin_1', 'rizgar', ${adminHash}, 'admin', 'Rizgar (Yönetici)', 'active'),
        ('u_partner_1', 'acente1', ${partnerHash}, 'partner', 'Test Acente 1', 'active')
      ON CONFLICT (username) DO NOTHING;
    `;
  }
}

