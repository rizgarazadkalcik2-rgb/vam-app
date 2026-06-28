// VAM — Kullanıcı tanımları
// Yeni acente eklemek için: bcrypt ile şifre hash'i üret, aşağıdaki listeye ekle.
// Hash üretmek için: node -e "console.log(require('bcryptjs').hashSync('YENI_SIFRE', 10))"

export type Role = "admin" | "partner";

export interface VamUser {
  id: string;
  username: string;
  passwordHash: string;
  role: Role;
  displayName: string;
}

export const USERS: VamUser[] = [
  {
    id: "u_admin_1",
    username: "rizgar",
    passwordHash: "$2b$10$tUSl4md8QUcMo6g16w.ss.wUKjdPLNbeN06r1vnt.glX/X9FBeYme", // admin123
    role: "admin",
    displayName: "Rizgar (Yönetici)",
  },
  {
    id: "u_partner_1",
    username: "acente1",
    passwordHash: "$2b$10$Y45./mi6DIopyXAv4VT6KetLLDhppNHsMwiiiRELS/bAt5DPNzxgC", // acente123
    role: "partner",
    displayName: "Test Acente 1",
  },
];

export function findUserByUsername(username: string): VamUser | undefined {
  return USERS.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function findUserById(id: string): VamUser | undefined {
  return USERS.find((u) => u.id === id);
}
