"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./admin.css";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconBox = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M21 8.5v7a2 2 0 0 1-1 1.73l-6 3.46a2 2 0 0 1-2 0l-6-3.46a2 2 0 0 1-1-1.73v-7a2 2 0 0 1 1-1.73l6-3.46a2 2 0 0 1 2 0l6 3.46a2 2 0 0 1 1 1.73Z" /><path d="m3.3 7.3 8.7 5 8.7-5M12 22.2V12.3" /></svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
);
const IconRoute = () => (
  <svg viewBox="0 0 24 24" {...S}><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" /></svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" {...S}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18M9 15l2 2 4-4" /></svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" {...S}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.9-3.2 3.4-5 6.5-5s5.6 1.8 6.5 5" /><circle cx="17.5" cy="9.5" r="2.5" /><path d="M16.5 15.2c2.5.3 4.3 1.8 5 4.3" /></svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" {...S}><path d="m3 11 9-8 9 8" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>
);

const IconBall = () => (
  <svg viewBox="0 0 24 24" {...S}><circle cx="12" cy="12" r="9" /><path d="M12 3v3.2M12 12l-4.7 3.4M12 12l4.7 3.4M12 6.2 7.6 9.4l1.7 5.3h5.4l1.7-5.3L12 6.2ZM3.3 10l4.3-.6M20.7 10l-4.3-.6M6.4 19.2l2.9-4.5M17.6 19.2l-2.9-4.5" /></svg>
);
const IconLayout = () => (
  <svg viewBox="0 0 24 24" {...S}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9.5h18M8.5 9.5V20" /></svg>
);

const ADMIN_NAV = [
  { href: "/admin", label: "Paketler", icon: <IconBox /> },
  { href: "/admin/destinasyonlar", label: "Destinasyonlar", icon: <IconPin /> },
  { href: "/admin/bundles", label: "Bundle Rotalar", icon: <IconRoute /> },
  { href: "/admin/site-icerigi", label: "Site İçeriği", icon: <IconLayout /> },
  { href: "/admin/rezervasyonlar", label: "Rezervasyonlar", icon: <IconCalendar /> },
  { href: "/admin/match-weekends", label: "Match Weekends", icon: <IconBall /> },
  { href: "/admin/acenteler", label: "Acenteler", icon: <IconUsers /> },
];

const PARTNER_NAV = [{ href: "/acente", label: "Panelim", icon: <IconHome /> }];

export default function AdminShell({
  title,
  subtitle,
  displayName,
  role,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  displayName: string;
  role: "admin" | "partner";
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = role === "admin" ? ADMIN_NAV : PARTNER_NAV;
  const initials = displayName
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/giris");
    router.refresh();
  }

  return (
    <div className="adm-root">
      <aside className="adm-sidebar">
        <div className="adm-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/vam-logo-for-dark-bg.png" alt="VAM" />
          <div className="adm-brand-text">
            <div className="adm-brand-name">VAM</div>
            <div className="adm-brand-sub">{role === "admin" ? "Yönetim" : "Acente"}</div>
          </div>
        </div>

        <nav className="adm-nav">
          <div className="adm-nav-label">Menü</div>
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`adm-nav-item${active ? " active" : ""}`}>
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="adm-side-footer">
          <div className="adm-user">
            <div className="adm-avatar">{initials}</div>
            <div>
              <div className="adm-user-name">{displayName}</div>
              <div className="adm-user-role">{role === "admin" ? "Yönetici" : "Acente"}</div>
            </div>
          </div>
          <button className="adm-logout" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="adm-main">
        <div className="adm-topbar">
          <div>
            <div className="adm-page-title">{title}</div>
            {subtitle && <div className="adm-page-sub">{subtitle}</div>}
          </div>
          <div className="adm-topbar-right">
            {actions}
            <a className="adm-view-site" href="/platform" target="_blank" rel="noreferrer">
              Siteyi Görüntüle ↗
            </a>
          </div>
        </div>
        <div className="adm-content">{children}</div>
      </div>
    </div>
  );
}
