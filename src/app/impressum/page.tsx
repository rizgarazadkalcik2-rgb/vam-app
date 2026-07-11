import LegalLayout from "../components/LegalLayout";
import { getLang } from "@/lib/i18n";
import { buildAlternates, canonicalForLang, getUrlLang } from "@/lib/hreflang";

const T = {
  title: { TR: "Yasal Bilgiler", DE: "Impressum", EN: "Legal Notice", KU: "Agahiyên Fermî", CKB: "زانیاری یاسایی" },
  s1_title: { TR: "Hizmet Sağlayıcı", DE: "Diensteanbieter", EN: "Service Provider", KU: "Peydakerê Karûbarê", CKB: "پێشکەشکەری خزمەتگوزاری" },
  sole_proprietor: { TR: "(şahıs işletmesi)", DE: "(Einzelunternehmen)", EN: "(sole proprietorship)", KU: "(karsaziya takekesî)", CKB: "(کارگێڕی تاکەکەسی)" },
  address_label: { TR: "Adres", DE: "Adresse", EN: "Address", KU: "Navnîşan", CKB: "ناونیشان" },
  phone_label: { TR: "Telefon", DE: "Telefon", EN: "Phone", KU: "Telefon", CKB: "تەلەفۆن" },
  email_label: { TR: "E-posta", DE: "E-Mail", EN: "Email", KU: "E-peyam", CKB: "ئیمەیل" },
  s2_title: { TR: "Vergi Bilgisi", DE: "Steuerliche Angaben", EN: "Tax Information", KU: "Agahiyên Bacê", CKB: "زانیاری باج" },
  tax_office_label: { TR: "Vergi Dairesi", DE: "Finanzamt", EN: "Tax Office", KU: "Îdareya Bacê", CKB: "بەڕێوەبەرایەتی باج" },
  tax_id_label: { TR: "VKN", DE: "Steuernummer", EN: "Tax ID", KU: "Hejmara Bacê", CKB: "ژمارەی باج" },
  s3_title: { TR: "İçerikten Sorumlu", DE: "Verantwortlich für den Inhalt", EN: "Responsible for Content", KU: "Berpirsê Naverokê", CKB: "بەرپرسیاری ناوەڕۆک" },
  s3_body: {
    TR: "Yukarıda belirtilen adresteki Narin Kalçık.",
    DE: "Narin Kalçık, Anschrift wie oben.",
    EN: "Narin Kalçık, address as stated above.",
    KU: "Narin Kalçık, navnîşan wek li jor hatiye gotin.",
    CKB: "نارین کالچیک، لەسەر ناونیشانی سەرەوە.",
  },
  s4_title: { TR: "Seyahat Hizmetleri Hakkında Not", DE: "Hinweis zu Reiseleistungen", EN: "Note on Travel Services", KU: "Nîşeya Der Barê Karûbarên Gerê De", CKB: "تێبینی سەبارەت بە خزمەتگوزاریە گەشتیاریەکان" },
  s4_body: {
    TR: "VAM (Visit Anatolia and Mesopotamia) platformu üzerinden sunulan paket tur ve rezervasyon hizmetleri, TÜRSAB belgeli seyahat acenteleriyle B2B iş birliği çerçevesinde yürütülmektedir. VAM'ın kendisi bağımsız bir TÜRSAB belgeli seyahat acentesi değildir.",
    DE: "Die über die Plattform VAM (Visit Anatolia and Mesopotamia) angebotenen Pauschalreise- und Buchungsleistungen werden im Rahmen einer B2B-Zusammenarbeit mit TÜRSAB-lizenzierten Reisebüros durchgeführt. VAM selbst ist kein eigenständig lizenziertes Reisebüro (TÜRSAB).",
    EN: "The package tour and booking services offered through the VAM (Visit Anatolia and Mesopotamia) platform are carried out in B2B partnership with TÜRSAB-licensed travel agencies. VAM itself is not an independently licensed travel agency (TÜRSAB).",
    KU: "Karûbarên pakêta gerê û rezervasyonê yên li ser platforma VAM (Visit Anatolia and Mesopotamia) tên pêşkêşkirin, di çarçoveya hevkariya B2B a bi ajansên gerê yên xwedî belgeya TÜRSAB de tên meşandin. VAM bixwe ne ajansek gerê ya xwedî belgeya serbixwe ya TÜRSAB e.",
    CKB: "خزمەتگوزاریەکانی گەشتی پاکێج و ڕیزێرڤ کە لە ڕێگەی پلاتفۆرمی VAM (Visit Anatolia and Mesopotamia) پێشکەش دەکرێن، لە چوارچێوەی هاوکاریی B2B لەگەڵ ئاژانسە گەشتیاریە بەڵگەنامەدارەکانی TÜRSAB بەڕێوە دەچن. VAM بەخۆی ئاژانسێکی گەشتیاری سەربەخۆی بەڵگەنامەدار نییە (TÜRSAB).",
  },
  s5_title: { TR: "Uyuşmazlıkların Çevrimiçi Çözümü", DE: "Online-Streitbeilegung", EN: "Online Dispute Resolution", KU: "Çareseriya Serhêl a Nakokiyan", CKB: "چارەسەری ئۆنلاینی ناکۆکی" },
  s5_body: {
    TR: "Avrupa Birliği'nde ikamet eden tüketiciler, Avrupa Komisyonu'nun çevrimiçi uyuşmazlık çözüm platformuna şu bağlantıdan ulaşabilir:",
    DE: "Verbraucher mit Wohnsitz in der Europäischen Union können die Online-Streitbeilegungsplattform der Europäischen Kommission über folgenden Link erreichen:",
    EN: "Consumers residing in the European Union can access the European Commission's online dispute resolution platform here:",
    KU: "Xerîdarên ku li Yekîtiya Ewropayê dijîn, dikarin bigihîjin platforma çareseriya nakokiyê ya serhêl a Komîsyona Ewropayê ji vê girêdanê:",
    CKB: "بەکارهێنەرانی نیشتەجێ لە یەکێتی ئەوروپا دەتوانن لەم بەستەرەوە بگەنە پلاتفۆرمی چارەسەری ئۆنلاینی ناکۆکی کۆمیسیۆنی ئەوروپا:",
  },
  s5_note: {
    TR: "Bu platforma katılma veya bu platform üzerinden uyuşmazlık çözme yükümlülüğümüz ya da isteğimiz bulunmamaktadır.",
    DE: "Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    EN: "We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    KU: "Em ne mecbûr in û ne amade ne ku beşdarî pêvajoyên çareseriya nakokiyê yên li ber saziyek hakemiya xerîdaran bibin.",
    CKB: "ئێمە نە ملزەمین و نە ئامادەین بەشداری لە پرۆسەی چارەسەرکردنی ناکۆکی لەبەردەم دەستەیەکی هاکەمیی خەرجدار بکەین.",
  },
  s6_title: { TR: "Sorumluluk Reddi", DE: "Haftungsausschluss", EN: "Disclaimer", KU: "Redkirina Berpirsiyariyê", CKB: "ڕەتکردنەوەی بەرپرسیاری" },
  s6_body: {
    TR: "Sitemizdeki içeriklerin doğruluğu için özen gösterilmiştir; ancak güncellik, eksiksizlik veya doğruluk konusunda garanti verilmez. Sitemizden bağlantı verilen üçüncü taraf web sitelerinin içeriğinden sorumlu değiliz.",
    DE: "Die Inhalte dieser Website wurden mit Sorgfalt erstellt; für Aktualität, Vollständigkeit oder Richtigkeit wird jedoch keine Gewähr übernommen. Für die Inhalte verlinkter externer Websites Dritter übernehmen wir keine Verantwortung.",
    EN: "The content of this website has been prepared with care; however, no guarantee is given for its timeliness, completeness, or accuracy. We are not responsible for the content of linked third-party websites.",
    KU: "Naveroka vê malperê bi baldarî hatiye amadekirin; lê belê ji bo rojanebûn, temambûn an rastbûnê tu garantî nayê dayîn. Em berpirsiyar nînin ji bo naveroka malperên aliyên sêyem ên ku girêdayî ne.",
    CKB: "ناوەڕۆکی ئەم ماڵپەڕە بە وردبینییەوە ئامادەکراوە؛ بەڵام هیچ گەرەنتییەک بۆ نوێبوون، تەواوی یان ڕاستی نادرێت. ئێمە بەرپرسیار نین لە ناوەڕۆکی ماڵپەڕەکانی لایەنی سێیەم کە بەستەریان پێوە کراوە.",
  },
} as const;

type TKey = keyof typeof T;
function tt(key: TKey, lang: "TR" | "DE" | "EN" | "KU" | "CKB"): string {
  const entry = T[key] as Record<string, string>;
  return entry[lang] ?? entry.TR;
}

export async function generateMetadata() {
  const lang = await getLang();
  const urlLang = await getUrlLang();
  return {
    title: tt("title", lang),
    alternates: { canonical: canonicalForLang("/impressum", urlLang), languages: buildAlternates("/impressum") },
  };
}

export default async function ImpressumPage() {
  const lang = await getLang();

  return (
    <LegalLayout title={tt("title", lang)} updatedDate="6 Temmuz 2026" lang={lang}>
      <h2>{tt("s1_title", lang)}</h2>
      <p>
        Narin Kalçık <span style={{ color: "#8c8275" }}>{tt("sole_proprietor", lang)}</span>
        <br />
        {tt("address_label", lang)}: Akköprü Mahallesi, Orta Sokak No: 68, Tuşba/Van, Türkiye
        <br />
        {tt("phone_label", lang)}: <a href="tel:+905436837978">+90 543 683 7978</a>
        <br />
        {tt("email_label", lang)}: <a href="mailto:info@visitvam.com">info@visitvam.com</a>
      </p>

      <h2>{tt("s2_title", lang)}</h2>
      <p>
        {tt("tax_office_label", lang)}: Van Vergi Dairesi Müdürlüğü
        <br />
        {tt("tax_id_label", lang)}: 4910418681
      </p>

      <h2>{tt("s3_title", lang)}</h2>
      <p>{tt("s3_body", lang)}</p>

      <h2>{tt("s4_title", lang)}</h2>
      <p>{tt("s4_body", lang)}</p>

      <h2>{tt("s5_title", lang)}</h2>
      <p>
        {tt("s5_body", lang)}{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>{tt("s5_note", lang)}</p>

      <h2>{tt("s6_title", lang)}</h2>
      <p>{tt("s6_body", lang)}</p>
    </LegalLayout>
  );
}
