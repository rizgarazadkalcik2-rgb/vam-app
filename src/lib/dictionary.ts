export type Lang = "TR" | "DE" | "EN";

type Entry = { TR: string; DE: string; EN: string };

export const DICT = {
  // Nav / footer (shared across every Next.js page)
  nav_home: { TR: "Ana Sayfa", DE: "Startseite", EN: "Home" },
  nav_destinations: { TR: "Destinasyonlar", DE: "Destinationen", EN: "Destinations" },
  nav_bundles: { TR: "Paketler", DE: "Pakete", EN: "Packages" },
  nav_experiences: { TR: "Deneyimler", DE: "Erlebnisse", EN: "Experiences" },
  nav_matchweekends: { TR: "Match Weekends", DE: "Match Weekends", EN: "Match Weekends" },
  nav_about: { TR: "Hakkımızda", DE: "Über uns", EN: "About Us" },
  nav_cta: { TR: "Rezervasyon", DE: "Buchung", EN: "Reservation" },
  footer_tagline: {
    TR: "On bin yıllık topraklarda yeni çağın turizmi.",
    DE: "Reisen einer neuen Zeit auf zehntausendjährigem Boden.",
    EN: "A new era of travel across ten-thousand-year-old lands.",
  },
  footer_col_platform: { TR: "Platform", DE: "Platform", EN: "Platform" },
  footer_col_company: { TR: "Şirket", DE: "Unternehmen", EN: "Company" },
  footer_col_support: { TR: "Destek", DE: "Support", EN: "Support" },
  footer_guides: { TR: "Rehberler", DE: "Guides", EN: "Guides" },
  footer_reviews: { TR: "Değerlendirmeler", DE: "Bewertungen", EN: "Reviews" },
  footer_about: { TR: "Hakkımızda", DE: "Über uns", EN: "About Us" },
  footer_contact: { TR: "İletişim", DE: "Kontakt", EN: "Contact" },
  footer_terms_sale: { TR: "Mesafeli Satış Sözleşmesi", DE: "Fernabsatzvertrag", EN: "Distance Sales Agreement" },
  footer_cancel_policy: { TR: "İptal Politikası", DE: "Stornierungsrichtlinie", EN: "Cancellation Policy" },
  footer_privacy: { TR: "Gizlilik", DE: "Datenschutz", EN: "Privacy" },
  footer_service_terms: { TR: "Hizmet Şartları", DE: "Nutzungsbedingungen", EN: "Terms of Service" },
  footer_partner_login: { TR: "Acente / Yönetici Girişi", DE: "Partner-/Admin-Login", EN: "Partner / Admin Login" },

  // Generic / shared chrome
  breadcrumb_home: { TR: "Ana Sayfa", DE: "Startseite", EN: "Home" },
  all_destinations: { TR: "Destinasyonlar", DE: "Destinationen", EN: "Destinations" },
  all_bundles: { TR: "Paketler", DE: "Pakete", EN: "Packages" },
  destination_singular: { TR: "destinasyon", DE: "Destination", EN: "destination" },
  bundle_singular: { TR: "paket", DE: "Paket", EN: "package" },
  clear_filters: { TR: "✕ Filtreleri temizle", DE: "✕ Filter zurücksetzen", EN: "✕ Clear filters" },

  filter_Tümü: { TR: "Tümü", DE: "Alle", EN: "All" },
  filter_Arkeoloji: { TR: "Arkeoloji", DE: "Archäologie", EN: "Archaeology" },
  filter_Doğa: { TR: "Doğa", DE: "Natur", EN: "Nature" },
  filter_Tarih: { TR: "Tarih", DE: "Geschichte", EN: "History" },
  filter_Kültür: { TR: "Kültür", DE: "Kultur", EN: "Culture" },
  filter_Mimari: { TR: "Mimari", DE: "Architektur", EN: "Architecture" },
  filter_Gastronomi: { TR: "Gastronomi", DE: "Gastronomie", EN: "Gastronomy" },

  // Destinations listing
  dest_eyebrow: { TR: "— Keşfet", DE: "— Entdecken", EN: "— Discover" },
  dest_h1: {
    TR: "Anadolu ve Mezopotamya'nın Kadim Durakları",
    DE: "Uralte Stätten Anatoliens und Mesopotamiens",
    EN: "Ancient Stations of Anatolia and Mesopotamia",
  },
  dest_lede: {
    TR: "Göbeklitepe'nin taşlarından Ani'nin kiliselerine — on beş binyıllık bir coğrafyada, küratörlü duraklar.",
    DE: "Von den Steinen Göbeklitepes bis zu den Kirchen von Ani — kuratierte Stationen in einer fünfzehntausendjährigen Landschaft.",
    EN: "From the stones of Göbeklitepe to the churches of Ani — curated stops across a fifteen-thousand-year-old landscape.",
  },
  dest_empty: {
    TR: "Bu kategoride henüz destinasyon eklenmedi.",
    DE: "In dieser Kategorie sind noch keine Destinationen vorhanden.",
    EN: "No destinations have been added to this category yet.",
  },
  dest_card_eyebrow_fallback: { TR: "Destinasyon", DE: "Destination", EN: "Destination" },

  // Destination detail
  dest_back: { TR: "← Tüm Destinasyonlar", DE: "← Alle Destinationen", EN: "← All Destinations" },
  dest_features_title: { TR: "Öne Çıkan Özellikler", DE: "Highlights", EN: "Highlights" },
  dest_related_title: { TR: "İlgili Destinasyonlar", DE: "Ähnliche Destinationen", EN: "Related Destinations" },
  dest_related_bundles_btn: { TR: "İlgili Paketleri Gör", DE: "Passende Pakete ansehen", EN: "View Matching Packages" },
  dest_reviews_suffix: { TR: "değerlendirme", DE: "Bewertungen", EN: "reviews" },
  dest_location: { TR: "Konum", DE: "Lage", EN: "Location" },
  dest_nearest_city: { TR: "En Yakın Şehir", DE: "Nächste Stadt", EN: "Nearest City" },
  dest_duration: { TR: "Önerilen Süre", DE: "Empfohlene Dauer", EN: "Recommended Duration" },
  dest_best_time: { TR: "En İyi Zaman", DE: "Beste Reisezeit", EN: "Best Time to Visit" },
  dest_era_caption_fallback: { TR: "Dönem", DE: "Epoche", EN: "Era" },

  // Bundles listing
  bundle_eyebrow: { TR: "— Paket Koleksiyonu", DE: "— Paketkollektion", EN: "— Package Collection" },
  bundle_h1: { TR: "Her Şey Dahil Rotalar", DE: "All-inclusive Routen", EN: "All-Inclusive Routes" },
  bundle_lede: {
    TR: "Yerel operatörlerle revenue-share modeliyle hazırlanan, konaklama ve rehberlik dahil küratörlü paketler.",
    DE: "Kuratierte Pakete mit Unterkunft und Führung, entwickelt mit lokalen Partnern im Revenue-Share-Modell.",
    EN: "Curated packages including accommodation and guiding, developed with local partners on a revenue-share model.",
  },
  bundle_guests_suffix: { TR: "kişi", DE: "Personen", EN: "people" },
  bundle_label_destination: { TR: "Destinasyon:", DE: "Destination:", EN: "Destination:" },
  bundle_label_experience: { TR: "Deneyim:", DE: "Erlebnis:", EN: "Experience:" },
  bundle_empty: { TR: "Bu kriterlere uygun paket bulunamadı.", DE: "Keine Pakete passen zu diesen Kriterien.", EN: "No packages match these criteria." },
  bundle_show_all: { TR: "Tüm Paketleri Göster", DE: "Alle Pakete anzeigen", EN: "Show All Packages" },
  bundle_card_eyebrow: { TR: "Rota Paketi", DE: "Routenpaket", EN: "Route Package" },
  bundle_night: { TR: "Gece", DE: "Nächte", EN: "Nights" },
  bundle_per_person: { TR: "kişi başı", DE: "pro Person", EN: "per person" },

  // Bundle detail
  bundle_back: { TR: "← Tüm Paketler", DE: "← Alle Pakete", EN: "← All Packages" },
  bundle_route_title: { TR: "Güzergah", DE: "Route", EN: "Route" },
  bundle_includes_title: { TR: "Pakete Dahil", DE: "Im Paket enthalten", EN: "Included in the Package" },
  bundle_duration_label: { TR: "Süre", DE: "Dauer", EN: "Duration" },
  bundle_night_day: { TR: "gece", DE: "Nächte", EN: "nights" },
  bundle_day: { TR: "gün", DE: "Tage", EN: "days" },
  bundle_destination_label: { TR: "Destinasyon", DE: "Destination", EN: "Destination" },
  bundle_point_suffix: { TR: "nokta", DE: "Stationen", EN: "stops" },
  bundle_book_now: { TR: "Şimdi Rezervasyon Yap", DE: "Jetzt buchen", EN: "Book Now" },
  bundle_question_cta: { TR: "Sorusu Olanlar İçin →", DE: "Fragen? →", EN: "Have Questions? →" },
  bundle_book_note: {
    TR: "Rezervasyon talebiniz anında sistemimize düşer, ekibimiz ödeme adımı için sizinle e-posta üzerinden iletişime geçer.",
    DE: "Ihre Buchungsanfrage geht sofort bei uns ein — unser Team meldet sich per E-Mail für den Zahlungsschritt.",
    EN: "Your booking request reaches us instantly — our team will get in touch by email for the payment step.",
  },
  bundle_other_routes: { TR: "Diğer Rotalar", DE: "Weitere Routen", EN: "Other Routes" },

  // Match Weekends
  mw_breadcrumb: { TR: "Match Weekends", DE: "Match Weekends", EN: "Match Weekends" },
  mw_badge_experience: { TR: "Amedspor Experience", DE: "Amedspor Experience", EN: "Amedspor Experience" },
  mw_hero_title: {
    TR: "Amed'in Yaşayan Tarihine ve Modern Kimliğine Bir Yolculuk",
    DE: "Eine Reise in Amed's lebendige Geschichte und moderne Identität",
    EN: "A Journey Into Amed's Living History and Modern Identity",
  },
  mw_hero_location: { TR: "Diyarbakır", DE: "Diyarbakır", EN: "Diyarbakır" },
  mw_hero_tag: { TR: "Maç günü deneyimi", DE: "Spieltag-Erlebnis", EN: "Match day experience" },
  mw_intro: {
    TR: "Bu bir maç bileti satmıyor. Sur'un beş bin yıllık taşları arasında yankılanan bir tezahüratı, tribünde omuz omuza duran bir şehri ve doksan dakikaya sığmayan bir kimliği sunuyoruz — Amedspor forması, buradaki en genç anıt.",
    DE: "Hier verkaufen wir kein Fußballticket. Wir bieten einen Gesang, der zwischen fünftausend Jahre alten Mauern von Sur widerhallt, eine Stadt, die Schulter an Schulter auf der Tribüne steht, und eine Identität, die in neunzig Minuten keinen Platz findet — das Amedspor-Trikot ist hier das jüngste Denkmal.",
    EN: "This isn't a football ticket. We offer a chant that echoes among the five-thousand-year-old stones of Sur, a city standing shoulder to shoulder in the stands, and an identity that ninety minutes can't hold — the Amedspor jersey is the youngest monument here.",
  },
  mw_service1_title: { TR: "Passolig Destek & Rehberlik", DE: "Passolig-Unterstützung & Beratung", EN: "Passolig Support & Guidance" },
  mw_service1_desc: {
    TR: "Avrupa'dan gelen taraftarlar için Passolig kaydı ve bürokratik sürecin baştan sona yönetimi — sahaya inmeden önce hiçbir engel kalmasın.",
    DE: "Passolig-Registrierung und vollständige Abwicklung der Formalitäten für Fans aus Europa — kein Hindernis mehr, bevor es ins Stadion geht.",
    EN: "Passolig registration and the full bureaucratic process handled end to end for fans traveling from Europe — no obstacle left before you reach the stands.",
  },
  mw_service2_title: { TR: "Resmi Bilet Danışmanlığı", DE: "Offizielle Ticketberatung", EN: "Official Ticket Consulting" },
  mw_service2_desc: {
    TR: "Bilet temin sürecinde teknik asistanlık; doğru kategori, doğru maç, doğru zamanlama için resmi kanallar üzerinden yönlendirme.",
    DE: "Technische Unterstützung beim Ticketkauf über offizielle Kanäle — die richtige Kategorie, das richtige Spiel, das richtige Timing.",
    EN: "Technical assistance through the ticket process — guided through official channels for the right category, the right match, the right timing.",
  },
  mw_service3_title: { TR: "Maç Günü Concierge", DE: "Spieltag-Concierge", EN: "Match Day Concierge" },
  mw_service3_desc: {
    TR: "Tribün seçimi, stada ulaşım ve yerel taraftar kültürüyle tanışma — maç günü tek başına değil, bir yerelin yanında yaşanır.",
    DE: "Tribünenwahl, Anreise zum Stadion und Einblick in die lokale Fankultur — der Spieltag wird nicht allein erlebt, sondern an der Seite eines Einheimischen.",
    EN: "Choosing your stand, getting to the stadium, and meeting the local fan culture — match day is lived alongside a local, never alone.",
  },
  mw_service4_title: { TR: "Kişiselleştirilmiş Seyahat Planı", DE: "Personalisierte Reiseroute", EN: "A Personalized Travel Plan" },
  mw_service4_desc: {
    TR: "Konaklama, gastronomi ve maç dışı şehir turları — Sur'un daracık sokakları, Hevsel Bahçeleri, Dicle kıyısı — sizin ritminize göre kurgulanır.",
    DE: "Unterkunft, Gastronomie und Stadttouren abseits des Spiels — die engen Gassen von Sur, die Hevsel-Gärten, das Tigrisufer — ganz nach Ihrem Rhythmus.",
    EN: "Accommodation, gastronomy, and city touring beyond the match — the narrow lanes of Sur, the Hevsel Gardens, the banks of the Tigris — shaped to your own rhythm.",
  },
  mw_cta_design: { TR: "Deneyimi Tasarla", DE: "Erlebnis gestalten", EN: "Design the Experience" },
  mw_band_eyebrow: { TR: "— Kişisel Güzergah Tasarımı", DE: "— Persönliche Routenplanung", EN: "— Personal Route Design" },
  mw_band_title: { TR: "Maç Haftası, Şehrin Tamamı Olsun", DE: "Die Spielwoche als Tor zur ganzen Stadt", EN: "Let Match Week Become the Whole City" },
  mw_band_desc: {
    TR: "Stat sadece bir durak. Güzergahınızı; Sur içindeki taş evler, Hevsel Bahçeleri'nde bir akşamüstü, Dicle kıyısında bir sofra ve yerel esnafla kurulan sahici bir sohbet üzerine kuruyoruz. Maç günü, şehri tanımanın bir bahanesi haline gelir.",
    DE: "Das Stadion ist nur eine Station. Wir gestalten Ihre Route um die Steinhäuser in Sur, einen Nachmittag in den Hevsel-Gärten, eine Tafel am Tigrisufer und ein echtes Gespräch mit lokalen Händlern. Der Spieltag wird zum Anlass, die Stadt kennenzulernen.",
    EN: "The stadium is only one stop. We build your route around the stone houses of Sur, an afternoon in the Hevsel Gardens, a table by the Tigris, and a real conversation with local shopkeepers. Match day becomes the reason to get to know the city.",
  },
  mw_plan_week: { TR: "Maç Haftanı Planla", DE: "Deine Spielwoche planen", EN: "Plan Your Match Week" },
  mw_view_routes: { TR: "Rotalara Göz At", DE: "Routen ansehen", EN: "View Routes" },
  mw_included_title: { TR: "Güzergaha Dahil Olabilecekler", DE: "Mögliche Bestandteile der Route", EN: "What Your Route Can Include" },
  mw_included_1: { TR: "Passolig kaydı ve bilet süreci takibi", DE: "Passolig-Registrierung und Ticketverfolgung", EN: "Passolig registration and ticket process tracking" },
  mw_included_2: { TR: "Tribün seçimi ve stada ulaşım planı", DE: "Tribünenwahl und Anreiseplan zum Stadion", EN: "Stand selection and stadium transfer plan" },
  mw_included_3: { TR: "Sur içi konaklama önerileri", DE: "Unterkunftsempfehlungen in Sur", EN: "Accommodation recommendations within Sur" },
  mw_included_4: { TR: "Hevsel Bahçeleri ve Dicle kıyısı turu", DE: "Tour durch die Hevsel-Gärten und am Tigrisufer", EN: "Tour of the Hevsel Gardens and the Tigris riverside" },
  mw_included_5: { TR: "Yerel gastronomi durakları", DE: "Lokale gastronomische Stationen", EN: "Local gastronomy stops" },
  mw_included_6: { TR: "Maç dışı gün için serbest zaman kurgusu", DE: "Freizeitgestaltung für spielfreie Tage", EN: "Free time planning for non-match days" },

  // Reservation form
  rez_eyebrow: { TR: "Rezervasyon", DE: "Buchung", EN: "Reservation" },
  rez_night: { TR: "gece", DE: "Nächte", EN: "nights" },
  rez_name: { TR: "Ad Soyad", DE: "Vor- und Nachname", EN: "Full Name" },
  rez_email: { TR: "E-posta", DE: "E-Mail", EN: "Email" },
  rez_phone: { TR: "Telefon", DE: "Telefon", EN: "Phone" },
  rez_travel_date: { TR: "Seyahat Tarihi", DE: "Reisedatum", EN: "Travel Date" },
  rez_guests: { TR: "Kişi Sayısı", DE: "Anzahl der Personen", EN: "Number of People" },
  rez_notes: { TR: "Notunuz (opsiyonel)", DE: "Ihre Anmerkung (optional)", EN: "Your Note (optional)" },
  rez_total: { TR: "Toplam Tutar", DE: "Gesamtbetrag", EN: "Total Amount" },
  rez_no_payment: {
    TR: "Bu adımda ödeme alınmamaktadır. Talebiniz kaydedildikten sonra ödeme bağlantısı e-posta adresinize gönderilecektir.",
    DE: "In diesem Schritt erfolgt keine Zahlung. Nachdem Ihre Anfrage gespeichert wurde, erhalten Sie den Zahlungslink per E-Mail.",
    EN: "No payment is taken at this step. Once your request is saved, a payment link will be sent to your email address.",
  },
  rez_submit: { TR: "Rezervasyon Talebi Gönder", DE: "Buchungsanfrage senden", EN: "Send Reservation Request" },
  rez_submitting: { TR: "Gönderiliyor...", DE: "Wird gesendet...", EN: "Sending..." },
  rez_error_generic: { TR: "Bir hata oluştu.", DE: "Es ist ein Fehler aufgetreten.", EN: "Something went wrong." },
  rez_success_title: { TR: "Talebiniz alındı", DE: "Ihre Anfrage ist eingegangen", EN: "Your request has been received" },
  rez_success_body_1: {
    TR: "paketi için rezervasyon talebiniz kaydedildi.",
    DE: "— Ihre Buchungsanfrage für dieses Paket wurde gespeichert.",
    EN: "— your reservation request for this package has been saved.",
  },
  rez_success_body_2: {
    TR: "Ödeme adımı için ekibimiz sizinle e-posta üzerinden iletişime geçecek.",
    DE: "Für den Zahlungsschritt wird sich unser Team per E-Mail bei Ihnen melden.",
    EN: "Our team will contact you by email for the payment step.",
  },
  rez_back_home: { TR: "Ana Sayfaya Dön", DE: "Zur Startseite", EN: "Back to Home" },

  // 404 page
  nf_eyebrow: { TR: "404 — Sayfa Bulunamadı", DE: "404 — Seite nicht gefunden", EN: "404 — Page Not Found" },
  nf_title: {
    TR: "Aradığınız sayfa bu coğrafyada yok",
    DE: "Diese Seite gibt es in dieser Landschaft nicht",
    EN: "The page you're looking for doesn't exist in this landscape",
  },
  nf_body: {
    TR: "Bağlantı değişmiş veya sayfa kaldırılmış olabilir. Aşağıdaki duraklardan yolculuğunuza devam edebilirsiniz.",
    DE: "Der Link wurde möglicherweise geändert oder die Seite entfernt. Über die folgenden Stationen können Sie Ihre Reise fortsetzen.",
    EN: "The link may have changed or the page may have been removed. You can continue your journey from the stops below.",
  },
  nf_home: { TR: "Ana Sayfa", DE: "Startseite", EN: "Home" },
  nf_destinations: { TR: "Destinasyonlar", DE: "Destinationen", EN: "Destinations" },
  nf_bundles: { TR: "Paketler", DE: "Pakete", EN: "Packages" },

  // Match Weekends — dinamik içerik
  mw_fixtures_title: { TR: "Maç Fikstürü", DE: "Spielplan", EN: "Match Fixtures" },
  mw_fixtures_sub: {
    TR: "Yaklaşan maç haftaları — güzergahınızı bu tarihlere göre kuruyoruz.",
    DE: "Kommende Spielwochen — wir bauen Ihre Route um diese Termine.",
    EN: "Upcoming match weeks — we build your route around these dates.",
  },
  mw_news_title: { TR: "Haberler & Kutlamalar", DE: "News & Feiern", EN: "News & Celebrations" },
  mw_venue_home: { TR: "İç saha", DE: "Heimspiel", EN: "Home" },
  mw_venue_away: { TR: "Deplasman", DE: "Auswärts", EN: "Away" },

  // Site-wide meta
  meta_site_desc: {
    TR: "Doğu Anadolu ve Mezopotamya'nın kadim toprakları için kültürel turizm platformu — küratörlü destinasyonlar, bündel paketler ve maç haftası deneyimleri.",
    DE: "Kulturtourismus-Plattform für die uralten Landschaften Ostanatoliens und Mesopotamiens — kuratierte Destinationen, Bündel-Pakete und Match-Wochenenden.",
    EN: "A cultural tourism platform for the ancient lands of Eastern Anatolia and Mesopotamia — curated destinations, bundled packages, and match weekend experiences.",
  },
  meta_dest_title: { TR: "Destinasyonlar", DE: "Destinationen", EN: "Destinations" },
  meta_bundles_title: { TR: "Bündel Paketler", DE: "Bündel-Pakete", EN: "Bundle Packages" },
  meta_mw_title: {
    TR: "Match Weekends — Bölge Takımlarıyla Kültürel Bir Yolculuk",
    DE: "Match Weekends — Eine kulturelle Reise mit den Teams der Region",
    EN: "Match Weekends — A Cultural Journey with the Region's Teams",
  },
  meta_mw_desc: {
    TR: "Amedspor, Vanspor FK, Batman Petrol Spor, Mardin 1969 Spor ve Iğdır FK maç haftaları — Passolig danışmanlığından kişiselleştirilmiş şehir güzergahına, küratörlü bir deneyim.",
    DE: "Spielwochen von Amedspor, Vanspor FK, Batman Petrol Spor, Mardin 1969 Spor und Iğdır FK — von der Passolig-Beratung bis zur persönlichen Stadtroute, ein kuratiertes Erlebnis.",
    EN: "Match weeks with Amedspor, Vanspor FK, Batman Petrol Spor, Mardin 1969 Spor, and Iğdır FK — a curated experience from Passolig consulting to a personalized city route.",
  },
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
