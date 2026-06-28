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
      image_url TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  // Eski tablolarda image_url sütunu yoksa ekle (geriye dönük uyumluluk)
  await sql`ALTER TABLE packages ADD COLUMN IF NOT EXISTS image_url TEXT;`;

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

  await sql`
    CREATE TABLE IF NOT EXISTS reservations (
      id SERIAL PRIMARY KEY,
      package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
      partner_id TEXT NOT NULL,
      partner_name TEXT NOT NULL,
      package_title TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      customer_phone TEXT,
      travel_date DATE,
      guest_count INTEGER NOT NULL DEFAULT 1,
      notes TEXT,
      total_price NUMERIC NOT NULL,
      payment_status TEXT NOT NULL DEFAULT 'pending',
      reservation_status TEXT NOT NULL DEFAULT 'new',
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

