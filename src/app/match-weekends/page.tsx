import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import TeamSelector from "./TeamSelector";
import { getLang } from "@/lib/i18n";
import { listActiveMatchEvents } from "@/lib/matchEvents";
import { t } from "@/lib/dictionary";
import "@/app/vam-content.css";

export async function generateMetadata() {
  const lang = await getLang();
  return {
    title: t("meta_mw_title", lang),
    description: t("meta_mw_desc", lang),
    alternates: { canonical: "/match-weekends" },
  };
}

const ICON_STROKE = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

function IconPass() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_STROKE}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8.5" cy="10.5" r="2" />
      <path d="M5.5 16c.6-1.8 2-2.7 3-2.7s2.4.9 3 2.7" />
      <path d="M14.5 9h4M14.5 12h4M14.5 15h2.5" />
    </svg>
  );
}

function IconTicket() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_STROKE}>
      <path d="M4 9a2 2 0 0 0 0-4V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v1a2 2 0 0 0 0 4v0a2 2 0 0 0 0 4v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a2 2 0 0 0 0-4Z" />
      <path d="M14 4v16" strokeDasharray="1.6 2.4" />
    </svg>
  );
}

function IconStadium() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_STROKE}>
      <ellipse cx="12" cy="13" rx="9" ry="5" />
      <ellipse cx="12" cy="13" rx="4.5" ry="2.4" />
      <path d="M3.5 10.5C5 7.8 8.2 6 12 6s7 1.8 8.5 4.5" />
      <path d="M3 12.2 2 11M21 12.2l1-1.2M6 8l-.8-1.4M18 8l.8-1.4" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" {...ICON_STROKE}>
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="18" r="2" />
      <path d="M5.5 8v3a3 3 0 0 0 3 3h3a3 3 0 0 1 3 3v1" strokeDasharray="1.6 2.4" />
    </svg>
  );
}

export const dynamic = "force-dynamic";

export default async function MatchWeekendsPage() {
  const [lang, events] = await Promise.all([getLang(), listActiveMatchEvents()]);

  const SERVICES = [
    { icon: <IconPass />, title: t("mw_service1_title", lang), desc: t("mw_service1_desc", lang) },
    { icon: <IconTicket />, title: t("mw_service2_title", lang), desc: t("mw_service2_desc", lang) },
    { icon: <IconStadium />, title: t("mw_service3_title", lang), desc: t("mw_service3_desc", lang) },
    { icon: <IconRoute />, title: t("mw_service4_title", lang), desc: t("mw_service4_desc", lang) },
  ];

  return (
    <div className="vc-root">
      <VamNavbar lang={lang} />

      <div className="vc-breadcrumb">
        <a href="/platform">{t("breadcrumb_home", lang)}</a> › {t("mw_breadcrumb", lang)}
      </div>

      <TeamSelector lang={lang} events={events}>
        <div className="vc-service-grid">
          {SERVICES.map((s) => (
            <div className="vc-service-card" key={s.title}>
              <div className="vc-service-icon">{s.icon}</div>
              <div className="vc-service-title">{s.title}</div>
              <div className="vc-service-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </TeamSelector>

      <VamFooter lang={lang} />
    </div>
  );
}
