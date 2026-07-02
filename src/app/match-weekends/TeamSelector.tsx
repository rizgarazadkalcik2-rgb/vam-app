"use client";

import { useState } from "react";
import { t, type Lang } from "@/lib/dictionary";
import type { MatchEvent } from "@/lib/matchEvents";

export type Team = {
  slug: string;
  name: string;
  city: { TR: string; DE: string };
  letter: string;
  badge: { TR: string; DE: string };
  heroTitle: { TR: string; DE: string };
  intro: { TR: string; DE: string };
  included: { TR: string[]; DE: string[] };
};

export const TEAMS: Team[] = [
  {
    slug: "amedspor",
    name: "Amedspor",
    city: { TR: "Diyarbakır", DE: "Diyarbakır" },
    letter: "A",
    badge: { TR: "Amedspor Experience", DE: "Amedspor Experience" },
    heroTitle: {
      TR: "Amed'in Yaşayan Tarihine ve Modern Kimliğine Bir Yolculuk",
      DE: "Eine Reise in Amed's lebendige Geschichte und moderne Identität",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Sur'un beş bin yıllık taşları arasında yankılanan bir tezahüratı, tribünde omuz omuza duran bir şehri ve doksan dakikaya sığmayan bir kimliği sunuyoruz — Amedspor forması, buradaki en genç anıt.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der zwischen fünftausend Jahre alten Mauern von Sur widerhallt, eine Stadt, die Schulter an Schulter auf der Tribüne steht, und eine Identität, die in neunzig Minuten keinen Platz findet — das Amedspor-Trikot ist hier das jüngste Denkmal.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Sur içi konaklama önerileri",
        "Hevsel Bahçeleri ve Dicle kıyısı turu",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Unterkunftsempfehlungen in Sur",
        "Tour durch die Hevsel-Gärten und am Tigrisufer",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
    },
  },
  {
    slug: "vanspor",
    name: "Vanspor FK",
    city: { TR: "Van", DE: "Van" },
    letter: "V",
    badge: { TR: "Vanspor Experience", DE: "Vanspor Experience" },
    heroTitle: {
      TR: "Van'ın Gölü Kadar Derin Bir Kimliğe Yolculuk",
      DE: "Eine Reise in eine Identität, so tief wie der Vansee",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Van Gölü'nün maviliğinde yansıyan bir tezahüratı, Urartu kalesinin gölgesinde nefes alan bir şehri sunuyoruz — Vanspor forması, bu gölün en genç dalgası.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der sich im Blau des Vansees spiegelt, eine Stadt, die im Schatten der Urartu-Festung atmet — das Vanspor-Trikot ist die jüngste Welle dieses Sees.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Van Kalesi ve Urartu izleri turu",
        "Akdamar Adası tekne turu",
        "Van kahvaltısı ve yerel lezzet durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour zur Burg von Van und den Spuren der Urartäer",
        "Bootstour zur Akdamar-Insel",
        "Van-Frühstück und lokale Spezialitäten",
        "Freizeitgestaltung für spielfreie Tage",
      ],
    },
  },
  {
    slug: "batman",
    name: "Batman Petrol Spor",
    city: { TR: "Batman", DE: "Batman" },
    letter: "B",
    badge: { TR: "Batman Petrol Spor Experience", DE: "Batman Petrol Spor Experience" },
    heroTitle: {
      TR: "Dicle'nin Kıyısında Yaşayan Bir Direnişe Yolculuk",
      DE: "Eine Reise zu einem lebendigen Widerstand am Ufer des Tigris",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Hasankeyf'in kayalıklarında yankılanan bir tezahüratı, Dicle'nin akışına direnen bir şehri sunuyoruz — Batman Petrol Spor forması, bu direnişin en genç rengi.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der in den Felsen von Hasankeyf widerhallt, eine Stadt, die der Strömung des Tigris standhält — das Trikot von Batman Petrol Spor ist die jüngste Farbe dieses Widerstands.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Hasankeyf ve Dicle Vadisi turu",
        "Kayalık yerleşimler ve mağara evleri gezisi",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour durch Hasankeyf und das Tigristal",
        "Besichtigung der Felsensiedlungen und Höhlenwohnungen",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
    },
  },
  {
    slug: "mardin1969",
    name: "Mardin 1969 Spor",
    city: { TR: "Mardin", DE: "Mardin" },
    letter: "M",
    badge: { TR: "Mardin 1969 Experience", DE: "Mardin 1969 Experience" },
    heroTitle: {
      TR: "Taş Şehrin Sabrına ve Zarafetine Yolculuk",
      DE: "Eine Reise zur Geduld und Eleganz der Steinstadt",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Mardin'in altın taşlarında yankılanan bir tezahüratı, ovaya bakan bir şehrin sabrını sunuyoruz — Mardin 1969 forması, bu taşların en genç işçiliği.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der in den goldenen Steinen Mardins widerhallt, die Geduld einer Stadt mit Blick auf die Ebene — das Trikot von Mardin 1969 ist die jüngste Handwerkskunst dieser Steine.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Mardin eski şehir ve taş mimari turu",
        "Deyrulzafaran Manastırı ziyareti",
        "Mardin mutfağı ve yerel lezzet durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour durch die Altstadt und Steinarchitektur Mardins",
        "Besuch des Deyrulzafaran-Klosters",
        "Mardiner Küche und lokale Spezialitäten",
        "Freizeitgestaltung für spielfreie Tage",
      ],
    },
  },
  {
    slug: "igdir",
    name: "Iğdır FK",
    city: { TR: "Iğdır", DE: "Iğdır" },
    letter: "I",
    badge: { TR: "Iğdır FK Experience", DE: "Iğdır FK Experience" },
    heroTitle: {
      TR: "Ağrı'nın Gölgesinde Büyüyen Bir Ovaya Yolculuk",
      DE: "Eine Reise in eine Ebene, die im Schatten des Ararat wächst",
    },
    intro: {
      TR: "Bu bir maç bileti satmıyor. Ağrı Dağı'nın eteklerinde yankılanan bir tezahüratı, bereketli ovanın gururunu sunuyoruz — Iğdır FK forması, bu dağın en genç yansıması.",
      DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der an den Hängen des Ararat widerhallt, den Stolz der fruchtbaren Ebene — das Trikot von Iğdır FK ist das jüngste Spiegelbild dieses Berges.",
    },
    included: {
      TR: [
        "Passolig kaydı ve bilet süreci takibi",
        "Tribün seçimi ve stada ulaşım planı",
        "Ağrı Dağı manzara noktaları turu",
        "Iğdır ovası ve yerel tarım kültürü gezisi",
        "Yerel gastronomi durakları",
        "Maç dışı gün için serbest zaman kurgusu",
      ],
      DE: [
        "Passolig-Registrierung und Ticketverfolgung",
        "Tribünenwahl und Anreiseplan zum Stadion",
        "Tour zu den Aussichtspunkten des Ararat",
        "Ausflug in die Ebene von Iğdır und die lokale Agrarkultur",
        "Lokale gastronomische Stationen",
        "Freizeitgestaltung für spielfreie Tage",
      ],
    },
  },
];

export default function TeamSelector({
  lang,
  events = [],
  children,
}: {
  lang: Lang;
  events?: MatchEvent[];
  children?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const team = TEAMS[active];

  const locale = lang === "DE" ? "de-DE" : "tr-TR";
  const today = new Date().toISOString().slice(0, 10);
  const teamEvents = events.filter((e) => e.team === team.slug);
  const fixtures = teamEvents.filter(
    (e) => e.kind === "match" && e.event_date && String(e.event_date).slice(0, 10) >= today
  );
  const news = teamEvents.filter((e) => e.kind === "news");
  const heroImage = news.find((e) => e.image_url)?.image_url || null;

  function fmtDate(d: string) {
    return new Date(d).toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  function venueLabel(v: string | null) {
    if (v === "İç saha") return t("mw_venue_home", lang);
    if (v === "Deplasman") return t("mw_venue_away", lang);
    return v;
  }
  const subjectHero = encodeURIComponent(`Match Weekends – ${team.name} – Deneyim Talebi`);
  const subjectItinerary = encodeURIComponent(`Match Weekends – ${team.name} – Kişisel Güzergah Talebi`);

  return (
    <>
      <div className="vc-mw-team-row">
        {TEAMS.map((tm, i) => (
          <button
            key={tm.slug}
            className={`vc-mw-team-chip${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
          >
            {tm.name}
          </button>
        ))}
      </div>

      <div className="vc-mw-hero">
        {heroImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="vc-mw-hero-img" src={heroImage} alt={team.name} />
            <div className="vc-mw-hero-shade" />
          </>
        ) : (
          <>
            <div className="vc-mw-hero-glow" />
            <span className="vc-mw-hero-letter">{team.letter}</span>
          </>
        )}
        <div className="vc-mw-hero-content">
          <div className="vc-badges">
            <span className="vc-badge vc-badge-gold">Match Weekends</span>
            <span className="vc-badge vc-badge-dark">{team.badge[lang]}</span>
          </div>
          <h1 className="vc-hero-title">{team.heroTitle[lang]}</h1>
          <div className="vc-hero-meta">
            <span>⊙ {team.city[lang]}</span>
            <span className="vc-dot" />
            <span>{t("mw_hero_tag", lang)}</span>
          </div>
        </div>
      </div>

      <div className="vc-mw-intro">
        <p>{team.intro[lang]}</p>
      </div>

      {fixtures.length > 0 && (
        <div className="vc-mw-fixtures">
          <div className="vc-section-label">{t("mw_fixtures_title", lang)}</div>
          <p className="vc-mw-fixtures-sub">{t("mw_fixtures_sub", lang)}</p>
          <div className="vc-mw-fixture-list">
            {fixtures.map((f) => (
              <div className="vc-mw-fixture" key={f.id}>
                <div className="vc-mw-fixture-date">{fmtDate(f.event_date as string)}</div>
                <div className="vc-mw-fixture-main">
                  <span className="vc-mw-fixture-teams">
                    {team.name} — {f.title}
                  </span>
                  <span className="vc-mw-fixture-meta">
                    {[f.event_time, f.competition, venueLabel(f.venue)].filter(Boolean).join(" · ")}
                  </span>
                  {f.body && <span className="vc-mw-fixture-note">{f.body}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {news.length > 0 && (
        <div className="vc-mw-news">
          <div className="vc-section-label">{t("mw_news_title", lang)}</div>
          <div className="vc-mw-news-grid">
            {news.map((n) => (
              <div className="vc-mw-news-card" key={n.id}>
                {n.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={n.image_url} alt={n.title} />
                )}
                <div className="vc-mw-news-body">
                  <div className="vc-mw-news-title">{n.title}</div>
                  {n.event_date && <div className="vc-mw-news-date">{fmtDate(n.event_date)}</div>}
                  {n.body && <p className="vc-mw-news-text">{n.body}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "8px 24px 8px", textAlign: "center" }}>
        <a className="vc-btn-cta" href={`mailto:info@visitvam.com?subject=${subjectHero}`}>
          {t("mw_cta_design", lang)}
        </a>
      </div>

      <div className="vc-mw-band">
        <div className="vc-mw-band-inner">
          <div>
            <div className="vc-mw-band-eyebrow">{t("mw_band_eyebrow", lang)}</div>
            <h2 className="vc-mw-band-title">{t("mw_band_title", lang)}</h2>
            <p className="vc-mw-band-p">{t("mw_band_desc", lang)}</p>
            <div className="vc-mw-cta-row">
              <a className="vc-btn-cta" href={`mailto:info@visitvam.com?subject=${subjectItinerary}`}>
                {t("mw_plan_week", lang)}
              </a>
              <a className="vc-btn-cta-ghost" href="/bundles">
                {t("mw_view_routes", lang)}
              </a>
            </div>
          </div>
          <div className="vc-mw-band-card">
            <div className="vc-section-label" style={{ color: "var(--gold-300)" }}>
              {t("mw_included_title", lang)}
            </div>
            <ul className="vc-checklist">
              {team.included[lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
