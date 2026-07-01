import VamNavbar from "@/app/components/VamNavbar";
import VamFooter from "@/app/components/VamFooter";
import "@/app/vam-content.css";

export const metadata = {
  title: "Match Weekends — Amed'in Yaşayan Tarihine Bir Yolculuk | VAM",
  description:
    "Amedspor maç haftası, Diyarbakır'ın kadim sokaklarıyla buluşuyor. Passolig danışmanlığından kişiselleştirilmiş şehir güzergahına, küratörlü bir deneyim.",
};

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

const SERVICES = [
  {
    icon: <IconPass />,
    title: "Passolig Destek & Rehberlik",
    desc:
      "Avrupa'dan gelen taraftarlar için Passolig kaydı ve bürokratik sürecin baştan sona yönetimi — sahaya inmeden önce hiçbir engel kalmasın.",
  },
  {
    icon: <IconTicket />,
    title: "Resmi Bilet Danışmanlığı",
    desc:
      "Bilet temin sürecinde teknik asistanlık; doğru kategori, doğru maç, doğru zamanlama için resmi kanallar üzerinden yönlendirme.",
  },
  {
    icon: <IconStadium />,
    title: "Maç Günü Concierge",
    desc:
      "Tribün seçimi, stada ulaşım ve yerel taraftar kültürüyle tanışma — maç günü tek başına değil, bir yerelin yanında yaşanır.",
  },
  {
    icon: <IconRoute />,
    title: "Kişiselleştirilmiş Seyahat Planı",
    desc:
      "Konaklama, gastronomi ve maç dışı şehir turları — Sur'un daracık sokakları, Hevsel Bahçeleri, Dicle kıyısı — sizin ritminize göre kurgulanır.",
  },
];

export default function MatchWeekendsPage() {
  const subjectHero = encodeURIComponent("Match Weekends – Deneyim Talebi");
  const subjectItinerary = encodeURIComponent("Match Weekends – Kişisel Güzergah Talebi");

  return (
    <div className="vc-root">
      <VamNavbar />

      <div className="vc-breadcrumb">
        <a href="/platform">Ana Sayfa</a> › Match Weekends
      </div>

      <div className="vc-mw-hero">
        <div className="vc-mw-hero-glow" />
        <span className="vc-mw-hero-letter">A</span>
        <div className="vc-mw-hero-content">
          <div className="vc-badges">
            <span className="vc-badge vc-badge-gold">Match Weekends</span>
            <span className="vc-badge vc-badge-dark">Amedspor Experience</span>
          </div>
          <h1 className="vc-hero-title">Amed&apos;in Yaşayan Tarihine ve Modern Kimliğine Bir Yolculuk</h1>
          <div className="vc-hero-meta">
            <span>⊙ Diyarbakır</span>
            <span className="vc-dot" />
            <span>Maç günü deneyimi</span>
          </div>
        </div>
      </div>

      <div className="vc-mw-intro">
        <p>
          Bu bir maç bileti satmıyor. Sur&apos;un beş bin yıllık taşları arasında yankılanan bir
          tezahüratı, tribünde omuz omuza duran bir şehri ve doksan dakikaya sığmayan bir kimliği
          sunuyoruz — Amedspor forması, buradaki en genç anıt.
        </p>
      </div>

      <div className="vc-service-grid">
        {SERVICES.map((s) => (
          <div className="vc-service-card" key={s.title}>
            <div className="vc-service-icon">{s.icon}</div>
            <div className="vc-service-title">{s.title}</div>
            <div className="vc-service-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 8px", textAlign: "center" }}>
        <a
          className="vc-btn-cta"
          href={`mailto:info@visitvam.com?subject=${subjectHero}`}
        >
          Deneyimi Tasarla
        </a>
      </div>

      <div className="vc-mw-band">
        <div className="vc-mw-band-inner">
          <div>
            <div className="vc-mw-band-eyebrow">— Kişisel Güzergah Tasarımı</div>
            <h2 className="vc-mw-band-title">Maç Haftası, Şehrin Tamamı Olsun</h2>
            <p className="vc-mw-band-p">
              Stat sadece bir durak. Güzergahınızı; Sur içindeki taş evler, Hevsel Bahçeleri&apos;nde
              bir akşamüstü, Dicle kıyısında bir sofra ve yerel esnafla kurulan sahici bir sohbet
              üzerine kuruyoruz. Maç günü, şehri tanımanın bir bahanesi haline gelir.
            </p>
            <div className="vc-mw-cta-row">
              <a
                className="vc-btn-cta"
                href={`mailto:info@visitvam.com?subject=${subjectItinerary}`}
              >
                Maç Haftanı Planla
              </a>
              <a className="vc-btn-cta-ghost" href="/bundles">
                Rotalara Göz At
              </a>
            </div>
          </div>
          <div className="vc-mw-band-card">
            <div className="vc-section-label" style={{ color: "var(--gold-300)" }}>
              Güzergaha Dahil Olabilecekler
            </div>
            <ul className="vc-checklist">
              <li>Passolig kaydı ve bilet süreci takibi</li>
              <li>Tribün seçimi ve stada ulaşım planı</li>
              <li>Sur içi konaklama önerileri</li>
              <li>Hevsel Bahçeleri ve Dicle kıyısı turu</li>
              <li>Yerel gastronomi durakları</li>
              <li>Maç dışı gün için serbest zaman kurgusu</li>
            </ul>
          </div>
        </div>
      </div>

      <VamFooter />
    </div>
  );
}
