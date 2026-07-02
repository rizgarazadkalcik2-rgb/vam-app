export type Lang = "TR" | "DE";

type Entry = { TR: string; DE: string };

export const DICT = {
  // Nav / footer (shared across every Next.js page)
  nav_home: { TR: "Ana Sayfa", DE: "Startseite" },
  nav_destinations: { TR: "Destinasyonlar", DE: "Destinationen" },
  nav_bundles: { TR: "Paketler", DE: "Pakete" },
  nav_experiences: { TR: "Deneyimler", DE: "Erlebnisse" },
  nav_matchweekends: { TR: "Match Weekends", DE: "Match Weekends" },
  nav_about: { TR: "Hakkımızda", DE: "Über uns" },
  nav_cta: { TR: "Rezervasyon", DE: "Buchung" },
  footer_tagline: { TR: "On bin yıllık topraklarda yeni çağın turizmi.", DE: "Reisen einer neuen Zeit auf zehntausendjährigem Boden." },
  footer_col_platform: { TR: "Platform", DE: "Platform" },
  footer_col_company: { TR: "Şirket", DE: "Unternehmen" },
  footer_col_support: { TR: "Destek", DE: "Support" },
  footer_guides: { TR: "Rehberler", DE: "Guides" },
  footer_reviews: { TR: "Değerlendirmeler", DE: "Bewertungen" },
  footer_about: { TR: "Hakkımızda", DE: "Über uns" },
  footer_contact: { TR: "İletişim", DE: "Kontakt" },
  footer_terms_sale: { TR: "Mesafeli Satış Sözleşmesi", DE: "Fernabsatzvertrag" },
  footer_cancel_policy: { TR: "İptal Politikası", DE: "Stornierungsrichtlinie" },
  footer_privacy: { TR: "Gizlilik", DE: "Datenschutz" },
  footer_service_terms: { TR: "Hizmet Şartları", DE: "Nutzungsbedingungen" },
  footer_partner_login: { TR: "Acente / Yönetici Girişi", DE: "Partner-/Admin-Login" },

  // Generic / shared chrome
  breadcrumb_home: { TR: "Ana Sayfa", DE: "Startseite" },
  all_destinations: { TR: "Destinasyonlar", DE: "Destinationen" },
  all_bundles: { TR: "Paketler", DE: "Pakete" },
  destination_singular: { TR: "destinasyon", DE: "Destination" },
  bundle_singular: { TR: "paket", DE: "Paket" },
  clear_filters: { TR: "✕ Filtreleri temizle", DE: "✕ Filter zurücksetzen" },

  filter_Tümü: { TR: "Tümü", DE: "Alle" },
  filter_Arkeoloji: { TR: "Arkeoloji", DE: "Archäologie" },
  filter_Doğa: { TR: "Doğa", DE: "Natur" },
  filter_Tarih: { TR: "Tarih", DE: "Geschichte" },
  filter_Kültür: { TR: "Kültür", DE: "Kultur" },
  filter_Mimari: { TR: "Mimari", DE: "Architektur" },
  filter_Gastronomi: { TR: "Gastronomi", DE: "Gastronomie" },

  // Destinations listing
  dest_eyebrow: { TR: "— Keşfet", DE: "— Entdecken" },
  dest_h1: { TR: "Anadolu ve Mezopotamya'nın Kadim Durakları", DE: "Uralte Stätten Anatoliens und Mesopotamiens" },
  dest_lede: {
    TR: "Göbeklitepe'nin taşlarından Ani'nin kiliselerine — on beş binyıllık bir coğrafyada, küratörlü duraklar.",
    DE: "Von den Steinen Göbeklitepes bis zu den Kirchen von Ani — kuratierte Stationen in einer fünfzehntausendjährigen Landschaft.",
  },
  dest_empty: { TR: "Bu kategoride henüz destinasyon eklenmedi.", DE: "In dieser Kategorie sind noch keine Destinationen vorhanden." },
  dest_card_eyebrow_fallback: { TR: "Destinasyon", DE: "Destination" },

  // Destination detail
  dest_back: { TR: "← Tüm Destinasyonlar", DE: "← Alle Destinationen" },
  dest_features_title: { TR: "Öne Çıkan Özellikler", DE: "Highlights" },
  dest_related_title: { TR: "İlgili Destinasyonlar", DE: "Ähnliche Destinationen" },
  dest_related_bundles_btn: { TR: "İlgili Paketleri Gör", DE: "Passende Pakete ansehen" },
  dest_reviews_suffix: { TR: "değerlendirme", DE: "Bewertungen" },
  dest_location: { TR: "Konum", DE: "Lage" },
  dest_nearest_city: { TR: "En Yakın Şehir", DE: "Nächste Stadt" },
  dest_duration: { TR: "Önerilen Süre", DE: "Empfohlene Dauer" },
  dest_best_time: { TR: "En İyi Zaman", DE: "Beste Reisezeit" },
  dest_era_caption_fallback: { TR: "Dönem", DE: "Epoche" },

  // Bundles listing
  bundle_eyebrow: { TR: "— Paket Koleksiyonu", DE: "— Paketkollektion" },
  bundle_h1: { TR: "Her Şey Dahil Rotalar", DE: "All-inclusive Routen" },
  bundle_lede: {
    TR: "Yerel operatörlerle revenue-share modeliyle hazırlanan, konaklama ve rehberlik dahil küratörlü paketler.",
    DE: "Kuratierte Pakete mit Unterkunft und Führung, entwickelt mit lokalen Partnern im Revenue-Share-Modell.",
  },
  bundle_guests_suffix: { TR: "kişi", DE: "Personen" },
  bundle_label_destination: { TR: "Destinasyon:", DE: "Destination:" },
  bundle_label_experience: { TR: "Deneyim:", DE: "Erlebnis:" },
  bundle_empty: { TR: "Bu kriterlere uygun paket bulunamadı.", DE: "Keine Pakete passen zu diesen Kriterien." },
  bundle_show_all: { TR: "Tüm Paketleri Göster", DE: "Alle Pakete anzeigen" },
  bundle_card_eyebrow: { TR: "Rota Paketi", DE: "Routenpaket" },
  bundle_night: { TR: "Gece", DE: "Nächte" },
  bundle_per_person: { TR: "kişi başı", DE: "pro Person" },

  // Bundle detail
  bundle_back: { TR: "← Tüm Paketler", DE: "← Alle Pakete" },
  bundle_route_title: { TR: "Güzergah", DE: "Route" },
  bundle_includes_title: { TR: "Pakete Dahil", DE: "Im Paket enthalten" },
  bundle_duration_label: { TR: "Süre", DE: "Dauer" },
  bundle_night_day: { TR: "gece", DE: "Nächte" },
  bundle_day: { TR: "gün", DE: "Tage" },
  bundle_destination_label: { TR: "Destinasyon", DE: "Destination" },
  bundle_point_suffix: { TR: "nokta", DE: "Stationen" },
  bundle_book_now: { TR: "Şimdi Rezervasyon Yap", DE: "Jetzt buchen" },
  bundle_question_cta: { TR: "Sorusu Olanlar İçin →", DE: "Fragen? →" },
  bundle_book_note: {
    TR: "Rezervasyon talebiniz anında sistemimize düşer, ekibimiz ödeme adımı için sizinle e-posta üzerinden iletişime geçer.",
    DE: "Ihre Buchungsanfrage geht sofort bei uns ein — unser Team meldet sich per E-Mail für den Zahlungsschritt.",
  },
  bundle_other_routes: { TR: "Diğer Rotalar", DE: "Weitere Routen" },

  // Match Weekends
  mw_breadcrumb: { TR: "Match Weekends", DE: "Match Weekends" },
  mw_badge_experience: { TR: "Amedspor Experience", DE: "Amedspor Experience" },
  mw_hero_title: {
    TR: "Amed'in Yaşayan Tarihine ve Modern Kimliğine Bir Yolculuk",
    DE: "Eine Reise in Amed's lebendige Geschichte und moderne Identität",
  },
  mw_hero_location: { TR: "Diyarbakır", DE: "Diyarbakır" },
  mw_hero_tag: { TR: "Maç günü deneyimi", DE: "Spieltag-Erlebnis" },
  mw_intro: {
    TR: "Bu bir maç bileti satmıyor. Sur'un beş bin yıllık taşları arasında yankılanan bir tezahüratı, tribünde omuz omuza duran bir şehri ve doksan dakikaya sığmayan bir kimliği sunuyoruz — Amedspor forması, buradaki en genç anıt.",
    DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der zwischen fünftausend Jahre alten Mauern von Sur widerhallt, eine Stadt, die Schulter an Schulter auf der Tribüne steht, und eine Identität, die in neunzig Minuten keinen Platz findet — das Amedspor-Trikot ist hier das jüngste Denkmal.",
  },
  mw_service1_title: { TR: "Passolig Destek & Rehberlik", DE: "Passolig-Unterstützung & Beratung" },
  mw_service1_desc: {
    TR: "Avrupa'dan gelen taraftarlar için Passolig kaydı ve bürokratik sürecin baştan sona yönetimi — sahaya inmeden önce hiçbir engel kalmasın.",
    DE: "Passolig-Registrierung und vollständige Abwicklung der Formalitäten für Fans aus Europa — kein Hindernis mehr, bevor es ins Stadion geht.",
  },
  mw_service2_title: { TR: "Resmi Bilet Danışmanlığı", DE: "Offizielle Ticketberatung" },
  mw_service2_desc: {
    TR: "Bilet temin sürecinde teknik asistanlık; doğru kategori, doğru maç, doğru zamanlama için resmi kanallar üzerinden yönlendirme.",
    DE: "Technische Unterstützung beim Ticketkauf über offizielle Kanäle — die richtige Kategorie, das richtige Spiel, das richtige Timing.",
  },
  mw_service3_title: { TR: "Maç Günü Concierge", DE: "Spieltag-Concierge" },
  mw_service3_desc: {
    TR: "Tribün seçimi, stada ulaşım ve yerel taraftar kültürüyle tanışma — maç günü tek başına değil, bir yerelin yanında yaşanır.",
    DE: "Tribünenwahl, Anreise zum Stadion und Einblick in die lokale Fankultur — der Spieltag wird nicht allein erlebt, sondern an der Seite eines Einheimischen.",
  },
  mw_service4_title: { TR: "Kişiselleştirilmiş Seyahat Planı", DE: "Personalisierte Reiseroute" },
  mw_service4_desc: {
    TR: "Konaklama, gastronomi ve maç dışı şehir turları — Sur'un daracık sokakları, Hevsel Bahçeleri, Dicle kıyısı — sizin ritminize göre kurgulanır.",
    DE: "Unterkunft, Gastronomie und Stadttouren abseits des Spiels — die engen Gassen von Sur, die Hevsel-Gärten, das Tigrisufer — ganz nach Ihrem Rhythmus.",
  },
  mw_cta_design: { TR: "Deneyimi Tasarla", DE: "Erlebnis gestalten" },
  mw_band_eyebrow: { TR: "— Kişisel Güzergah Tasarımı", DE: "— Persönliche Routenplanung" },
  mw_band_title: { TR: "Maç Haftası, Şehrin Tamamı Olsun", DE: "Die Spielwoche als Tor zur ganzen Stadt" },
  mw_band_desc: {
    TR: "Stat sadece bir durak. Güzergahınızı; Sur içindeki taş evler, Hevsel Bahçeleri'nde bir akşamüstü, Dicle kıyısında bir sofra ve yerel esnafla kurulan sahici bir sohbet üzerine kuruyoruz. Maç günü, şehri tanımanın bir bahanesi haline gelir.",
    DE: "Das Stadion ist nur eine Station. Wir gestalten Ihre Route um die Steinhäuser in Sur, einen Nachmittag in den Hevsel-Gärten, eine Tafel am Tigrisufer und ein echtes Gespräch mit lokalen Händlern. Der Spieltag wird zum Anlass, die Stadt kennenzulernen.",
  },
  mw_plan_week: { TR: "Maç Haftanı Planla", DE: "Deine Spielwoche planen" },
  mw_view_routes: { TR: "Rotalara Göz At", DE: "Routen ansehen" },
  mw_included_title: { TR: "Güzergaha Dahil Olabilecekler", DE: "Mögliche Bestandteile der Route" },
  mw_included_1: { TR: "Passolig kaydı ve bilet süreci takibi", DE: "Passolig-Registrierung und Ticketverfolgung" },
  mw_included_2: { TR: "Tribün seçimi ve stada ulaşım planı", DE: "Tribünenwahl und Anreiseplan zum Stadion" },
  mw_included_3: { TR: "Sur içi konaklama önerileri", DE: "Unterkunftsempfehlungen in Sur" },
  mw_included_4: { TR: "Hevsel Bahçeleri ve Dicle kıyısı turu", DE: "Tour durch die Hevsel-Gärten und am Tigrisufer" },
  mw_included_5: { TR: "Yerel gastronomi durakları", DE: "Lokale gastronomische Stationen" },
  mw_included_6: { TR: "Maç dışı gün için serbest zaman kurgusu", DE: "Freizeitgestaltung für spielfreie Tage" },
} satisfies Record<string, Entry>;

export type DictKey = keyof typeof DICT;

export function t(key: DictKey, lang: Lang): string {
  const entry = DICT[key];
  return (entry && entry[lang]) || entry?.TR || key;
}

/** For values that aren't proper nouns (e.g. filter chip labels like "Tümü"),
 *  translate if we have an entry, otherwise show the original label untouched. */
export function chip(label: string, lang: Lang): string {
  const key = `filter_${label}` as DictKey;
  return DICT[key] ? t(key, lang) : label;
}
