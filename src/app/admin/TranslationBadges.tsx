const LANGS = ["DE", "EN", "KU", "CKB"] as const;

/**
 * Liste ekranlarında hangi dillerin çevirisi eksik olduğunu tek bakışta
 * gösterir — önceden bu bilgi sadece düzenleme formunu açınca (ve orada da
 * yanıltıcı bir "✓" ile) görünüyordu, Rizgar her kaydı tek tek açmadan
 * eksik çeviriyi fark edemiyordu.
 */
export default function TranslationBadges({ translated }: { translated: Record<(typeof LANGS)[number], boolean> }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {LANGS.map((lang) => {
        const ok = translated[lang];
        return (
          <span
            key={lang}
            title={ok ? `${lang} çevirisi var` : `${lang} çevirisi eksik`}
            style={{
              fontSize: 9,
              fontWeight: 700,
              lineHeight: 1,
              padding: "3px 4px",
              borderRadius: 3,
              background: ok ? "#e6f4ea" : "#fdeceb",
              color: ok ? "#2a7a50" : "#a64022",
              border: `1px solid ${ok ? "#2a7a50" : "#a64022"}`,
            }}
          >
            {lang}
          </span>
        );
      })}
    </div>
  );
}
