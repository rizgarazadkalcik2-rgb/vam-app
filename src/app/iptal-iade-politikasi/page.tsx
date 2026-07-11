import LegalLayout from "../components/LegalLayout";
import { getLang } from "@/lib/i18n";
import { buildAlternates, canonicalForLang, getUrlLang } from "@/lib/hreflang";

const T = {
  title: { TR: "İptal ve İade Politikası", DE: "Stornierungsrichtlinie", EN: "Cancellation and Refund Policy", KU: "Polîtîkaya Betalkirin û Vegerandinê", CKB: "سیاسەتی هەڵوەشاندنەوە و گەڕاندنەوەی پارە" },
  intro: {
    TR: "Bu sayfa, VAM (Visit Anatolia and Mesopotamia) üzerinden satın alınan paket ve hizmetlerin iptal ve iade koşullarını açıklar. Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamındaki haklarınız bu politika ile birlikte geçerlidir.",
    DE: "Diese Seite erläutert die Stornierungs- und Rückerstattungsbedingungen für Pakete und Leistungen, die über VAM (Visit Anatolia and Mesopotamia) erworben wurden. Ihre Rechte aus dem Verbraucherschutzgesetz und der Verordnung über Fernabsatzverträge gelten zusätzlich zu dieser Richtlinie.",
    EN: "This page explains the cancellation and refund conditions for packages and services purchased through VAM (Visit Anatolia and Mesopotamia). Your rights under the Consumer Protection Law and the Distance Contracts Regulation apply alongside this policy.",
    KU: "Ev rûpel, mercên betalkirin û vegerandinê yên pakêt û karûbarên ku bi rêya VAM (Visit Anatolia and Mesopotamia) hatine kirrîn rave dike. Mafên we yên di bin Qanûna Parastina Xerîdar û Rêziknameya Peymanên Firotina ji Dûr ve de, digel vê polîtîkayê derbasdar in.",
    CKB: "ئەم پەڕەیە، مەرجەکانی هەڵوەشاندنەوە و گەڕاندنەوەی پارەی پاکێج و خزمەتگوزارییەکانی کڕدراو لە ڕێگەی VAM (Visit Anatolia and Mesopotamia)ەوە ڕوون دەکاتەوە. مافەکانتان لەژێر یاسای پاراستنی خەرجدار و ڕێنمایی پەیمانە دوورەکاندا، لەگەڵ ئەم سیاسەتەدا بەکاردەهێنرێن.",
  },
  s1_title: { TR: "1. Genel İptal Süreleri", DE: "1. Allgemeine Stornierungsfristen", EN: "1. General Cancellation Periods", KU: "1. Dema Betalkirinê ya Giştî", CKB: "١. ماوەکانی گشتیی هەڵوەشاندنەوە" },
  s1_body1_pre: {
    TR: "Standart koşullar altında, rezervasyon tarihinden",
    DE: "Unter Standardbedingungen wird der vollständige Betrag bei Stornierungsanfragen erstattet, die",
    EN: "Under standard conditions, the full amount is refunded for cancellation requests made",
    KU: "Di bin mercên standard de, ji bo daxwazên betalkirinê yên ku",
    CKB: "لەژێر مەرجی ستاندارددا، بۆ داواکارییەکانی هەڵوەشاندنەوە کە",
  },
  s1_body1_strong: { TR: "en az 7 gün önce", DE: "mindestens 7 Tage vor dem Buchungstermin", EN: "at least 7 days before the reservation date", KU: "herî kêm 7 roj berî dîroka rezervasyonê", CKB: "لانیکەم ٧ ڕۆژ پێش بەرواری ڕیزێرڤ" },
  s1_body1_post: {
    TR: "yapılan iptal talepleri için ödenen tutarın tamamı iade edilir.",
    DE: "eingehen.",
    EN: ".",
    KU: "têne kirin, mîqdara ku hatiye dayîn bi tevahî tê vegerandin.",
    CKB: "ئەنجام دەدرێن، هەموو بڕی پارەدراو دەگەڕێندرێتەوە.",
  },
  s1_body2_strong: { TR: "Önemli:", DE: "Wichtig:", EN: "Important:", KU: "Girîng:", CKB: "گرنگ:" },
  s1_body2: {
    TR: "Bazı paketler (örneğin sınırlı kontenjanlı turlar, özel rehberli deneyimler veya üçüncü taraf tesislerle anlaşmalı konaklamalar) için farklı iptal süreleri ve koşulları uygulanabilir. Geçerli olan özel şartlar, ilgili paketin satın alma sayfasında ve rezervasyon onay e-postasında ayrıca belirtilir. Satın alma öncesinde paket detaylarındaki iptal koşullarını incelemenizi rica ederiz.",
    DE: "Für bestimmte Pakete (z. B. Touren mit begrenzter Teilnehmerzahl, exklusive geführte Erlebnisse oder Unterkünfte bei Partnerbetrieben) können abweichende Stornierungsfristen und -bedingungen gelten. Die jeweils geltenden besonderen Bedingungen werden zusätzlich auf der Kaufseite des Pakets sowie in der Buchungsbestätigung angegeben. Wir bitten Sie, die Stornierungsbedingungen in den Paketdetails vor dem Kauf zu prüfen.",
    EN: "Different cancellation periods and conditions may apply to certain packages (e.g., tours with limited capacity, exclusive guided experiences, or accommodations arranged with third-party facilities). The applicable special terms are additionally specified on the relevant package's purchase page and in the reservation confirmation email. We recommend reviewing the cancellation terms in the package details before purchasing.",
    KU: "Ji bo hin pakêtan (mînak, geştên bi kontenjaneke sînordar, ezmûnên rêberkirî yên taybet an kirêdayînên bi taybetmendiyên aliyê sêyem re li hev kirî) demên û mercên betalkirinê yên cuda dikarin werin sepandin. Mercên taybet ên derbasdar, wekî din li rûpela kirrîna pakêtê û di e-peyama piştrastkirina rezervasyonê de tên diyarkirin. Em ji we hêvî dikin ku berî kirrînê mercên betalkirinê yên di hûrgiliyên pakêtê de bibînin.",
    CKB: "بۆ هەندێک پاکێج (بۆ نموونە گەشتی سنووردار لە ڕووی ژمارەی بەشداربووان، ئەزموونی تایبەت بە ڕابەرایەتیکراو یان جێگە کە لەگەڵ دامەزراوەی لایەنی سێیەم ڕێکەوتوون) دەکرێت ماوە و مەرجی هەڵوەشاندنەوەی جیاواز جێبەجێ بکرێت. مەرجە تایبەتەکانی جێبەجێبوو، هەروەها لە پەڕەی کڕینی پاکێجی پەیوەندیدار و لە ئیمەیلی پشتڕاستکردنەوەی ڕیزێرڤدا دیاری دەکرێن. داوا دەکەین پێش کڕین، مەرجەکانی هەڵوەشاندنەوە لە وردەکارییەکانی پاکێجدا بخوێننەوە.",
  },
  s2_title: { TR: "2. Geç İptal ve Katılmama (No-Show) Durumu", DE: "2. Verspätete Stornierung und Nichterscheinen (No-Show)", EN: "2. Late Cancellation and No-Show", KU: "2. Betalkirina Dereng û Ne-hatina (No-Show)", CKB: "٢. هەڵوەشاندنەوەی دواکەوتوو و نەهاتن (No-Show)" },
  s2_body_pre: {
    TR: "Belirtilen iptal süresi geçtikten sonra yapılan iptal talepleri ile rezervasyon tarihinde hizmete katılmama (no-show) durumlarında",
    DE: "Bei Stornierungsanfragen nach Ablauf der genannten Frist sowie bei Nichterscheinen (No-Show) am Buchungstermin wird",
    EN: "For cancellation requests made after the specified period, as well as in cases of no-show on the reservation date,",
    KU: "Ji bo daxwazên betalkirinê yên ku piştî dema diyarkirî tên kirin, û di rewşên ne-hatina (no-show) di roja rezervasyonê de,",
    CKB: "بۆ داواکارییەکانی هەڵوەشاندنەوە کە پاش ماوەی دیاریکراو ئەنجام دەدرێن، هەروەها لە حاڵەتی نەهاتن (no-show) لە بەرواری ڕیزێرڤدا،",
  },
  s2_body_strong: { TR: "ödenen tutar iade edilmez", DE: "der gezahlte Betrag nicht erstattet", EN: "the amount paid is not refunded", KU: "mîqdara ku hatiye dayîn nayê vegerandin", CKB: "بڕی پارەدراو ناگەڕێندرێتەوە" },
  s2_body_post: {
    TR: "Bu kural; rehber, ulaşım, konaklama ve diğer hizmet sağlayıcılarla yapılan bağlayıcı anlaşmalardan kaynaklanan maliyetler nedeniyle uygulanmaktadır.",
    DE: ". Diese Regelung beruht auf den Kosten, die aus verbindlichen Vereinbarungen mit Guides, Transport-, Unterkunfts- und anderen Dienstleistern entstehen.",
    EN: ". This rule applies due to costs arising from binding agreements with guides, transport, accommodation, and other service providers.",
    KU: ". Ev rêbaz, ji ber lêçûnên ku ji peymanên girêdayî yên bi rêber, veguhastin, kirêdayîn û peydakerên din ên karûbaran re derdikevin tê sepandin.",
    CKB: ". ئەم یاسایە، بەهۆی تێچووی وابەستە بە ڕێکەوتنە بەستنراوەکان لەگەڵ ڕابەر، گواستنەوە، جێگە و پێشکەشکارانی دیکەی خزمەتگوزاری، جێبەجێ دەکرێت.",
  },
  s3_title: { TR: "3. İptal Talebi Nasıl Yapılır", DE: "3. So stellen Sie eine Stornierungsanfrage", EN: "3. How to Submit a Cancellation Request", KU: "3. Daxwaza Betalkirinê Çawa tê Kirin", CKB: "٣. چۆنیەتی پێشکەشکردنی داواکاریی هەڵوەشاندنەوە" },
  s3_intro: {
    TR: "İptal talebinizi aşağıdaki yollardan birini kullanarak iletebilirsiniz:",
    DE: "Sie können Ihre Stornierungsanfrage über einen der folgenden Wege einreichen:",
    EN: "You can submit your cancellation request through one of the following channels:",
    KU: "Hûn dikarin daxwaza xwe ya betalkirinê bi yek ji van rêyan bişînin:",
    CKB: "دەتوانن داواکارییەکەتان لە ڕێگەی یەکێک لەم ڕێگایانە بنێرن:",
  },
  s3_email_label: { TR: "E-posta", DE: "E-Mail", EN: "Email", KU: "E-peyam", CKB: "ئیمەیل" },
  s3_phone_label: { TR: "Telefon", DE: "Telefon", EN: "Phone", KU: "Telefon", CKB: "تەلەفۆن" },
  s3_body2: {
    TR: "Talebinizde rezervasyon numaranızı, paket adını ve iptal sebebinizi belirtmeniz işlemin hızlanmasını sağlar.",
    DE: "Wenn Sie in Ihrer Anfrage Ihre Buchungsnummer, den Paketnamen und den Stornierungsgrund angeben, beschleunigt dies die Bearbeitung.",
    EN: "Providing your reservation number, package name, and reason for cancellation in your request will speed up processing.",
    KU: "Diyarkirina hejmara rezervasyonê, navê pakêtê û sedema betalkirinê di daxwaza we de, lezgînkirina pêvajoyê peyda dike.",
    CKB: "دیاریکردنی ژمارەی ڕیزێرڤ، ناوی پاکێج و هۆکاری هەڵوەشاندنەوە لە داواکارییەکەتاندا، پرۆسەکە خێراتر دەکات.",
  },
  s4_title: { TR: "4. İade Süreci", DE: "4. Rückerstattungsprozess", EN: "4. Refund Process", KU: "4. Pêvajoya Vegerandinê", CKB: "٤. پرۆسەی گەڕاندنەوەی پارە" },
  s4_body_pre: {
    TR: "Onaylanan iadeler, ödemenin yapıldığı kredi kartına veya banka hesabına, talebin onaylanmasından itibaren ortalama",
    DE: "Genehmigte Rückerstattungen werden nach Genehmigung des Antrags durchschnittlich innerhalb von",
    EN: "Approved refunds are credited to the credit card or bank account used for payment, on average within",
    KU: "Vegerandinên ku hatine piştrastkirin, piştî piştrastkirina daxwazê, bi navînî di nav",
    CKB: "گەڕاندنەوەی پارەی پەسەندکراو، بۆ سەر کارتی کرێدیت یان هەژماری بانکی کە پارەدان پێی کراوە، بە ناوەند لە ماوەی",
  },
  s4_body_strong: { TR: "7-14 iş günü", DE: "7-14 Werktagen", EN: "7-14 business days", KU: "7-14 rojên xebatê", CKB: "٧-١٤ ڕۆژی کاری" },
  s4_body_post: {
    TR: "içinde yansıtılır. Bu süre, bankanızın veya ödeme kuruluşunun işlem sürelerine bağlı olarak değişebilik gösterebilir.",
    DE: "auf das zur Zahlung verwendete Kreditkarten- oder Bankkonto zurückerstattet. Diese Frist kann je nach Bearbeitungszeiten Ihrer Bank oder des Zahlungsdienstleisters variieren.",
    EN: "of request approval. This period may vary depending on the processing times of your bank or payment provider.",
    KU: "de li ser qerta krediyê an hesabê bankê yê ku dayîn pê hatiye kirin tê vegerandin. Ev dem, li gorî demên şixulandinê yên bankê an kompaniya dayînê dikare biguhere.",
    CKB: "دوای پەسەندکردنی داواکارییەکە دەگەڕێندرێتەوە. ئەم ماوەیە، بەپێی کاتی پرۆسێسکردنی بانک یان کۆمپانیای پارەدانتان دەکرێت جیاواز بێت.",
  },
  s5_title: { TR: "5. VAM Tarafından İptal Edilen Turlar", DE: "5. Von VAM stornierte Touren", EN: "5. Tours Cancelled by VAM", KU: "5. Geştên ku VAM Betal Dike", CKB: "٥. گەشتەکانی هەڵوەشاندراو لەلایەن VAM" },
  s5_body: {
    TR: "Yetersiz katılım, hava koşulları, güvenlik gerekçeleri veya öngörülemeyen mücbir sebepler nedeniyle bir turun VAM tarafından iptal edilmesi halinde, ödenen tutarın tamamı iade edilir veya talebiniz halinde başka bir tarihe/pakete aktarılır.",
    DE: "Wird eine Tour von VAM aufgrund unzureichender Teilnehmerzahl, Wetterbedingungen, Sicherheitsgründen oder unvorhersehbarer höherer Gewalt storniert, wird der vollständige Betrag erstattet oder auf Ihren Wunsch auf einen anderen Termin/ein anderes Paket übertragen.",
    EN: "If a tour is cancelled by VAM due to insufficient participation, weather conditions, safety reasons, or unforeseeable force majeure, the full amount is refunded or, upon your request, transferred to another date/package.",
    KU: "Heke geştek ji hêla VAM ve ji ber beşdariya negihîştî, rewşa hewayê, sedemên ewlehiyê an sedemên bêserûber ên nayên pêşbînîkirin were betalkirin, mîqdara ku hatiye dayîn bi tevahî tê vegerandin an, li gorî daxwaza we, li rojek/pakêteke din tê veguhestin.",
    CKB: "ئەگەر گەشتێک لەلایەن VAMەوە بەهۆی بەشداریی ناتەواو، بارودۆخی کەشوهەوا، هۆکاری ئاسایش یان هۆکاری زۆرەملێی پێشبینی نەکراو هەڵبوەشێندرێتەوە، هەموو بڕی پارەدراو دەگەڕێندرێتەوە یان، بەپێی داواکاریتان، بۆ بەروار/پاکێجێکی دیکە دەگوازرێتەوە.",
  },
  s6_title: { TR: "6. Değişiklik Talepleri", DE: "6. Änderungsanfragen", EN: "6. Change Requests", KU: "6. Daxwazên Guherînê", CKB: "٦. داواکارییەکانی گۆڕانکاری" },
  s6_body: {
    TR: "Rezervasyon tarihi veya katılımcı sayısı değişikliği talepleri, müsaitlik durumuna bağlı olarak değerlendirilir. Değişiklik talepleri de iptal süreleriyle aynı zaman çizelgesine tabidir.",
    DE: "Anfragen zur Änderung des Buchungstermins oder der Teilnehmerzahl werden je nach Verfügbarkeit geprüft. Änderungsanfragen unterliegen demselben Zeitrahmen wie Stornierungen.",
    EN: "Requests to change the reservation date or number of participants are evaluated based on availability. Change requests are subject to the same timeline as cancellations.",
    KU: "Daxwazên guherîna dîroka rezervasyonê an hejmara beşdaran, li gorî rewşa amadebûnê tên nirxandin. Daxwazên guherînê jî di bin heman demjimêra betalkirinê de ne.",
    CKB: "داواکارییەکانی گۆڕینی بەرواری ڕیزێرڤ یان ژمارەی بەشداربووان، بەپێی بەردەستبوون هەڵدەسەنگێنرێن. داواکارییەکانی گۆڕانکاریش لەژێر هەمان کاتبەندیی هەڵوەشاندنەوەدان.",
  },
  s7_title: { TR: "7. Mesafeli Sözleşmeler Yönetmeliği Kapsamındaki Haklarınız", DE: "7. Ihre Rechte gemäß der Verordnung über Fernabsatzverträge", EN: "7. Your Rights Under the Distance Contracts Regulation", KU: "7. Mafên we di bin Rêziknameya Peymanên Firotina ji Dûr ve", CKB: "٧. مافەکانتان لەژێر ڕێنمایی پەیمانە دوورەکاندا" },
  s7_body_pre: {
    TR: "Türk hukuku kapsamında, hizmetin ifasına başlanmamış olması koşuluyla cayma hakkınız bulunabilir. Cayma hakkına ilişkin detaylar",
    DE: "Nach türkischem Recht kann Ihnen ein Widerrufsrecht zustehen, sofern mit der Erbringung der Leistung noch nicht begonnen wurde. Details zum Widerrufsrecht finden Sie auf unserer",
    EN: "Under Turkish law, you may have a right of withdrawal, provided that performance of the service has not yet begun. Details on the right of withdrawal are available on our",
    KU: "Di bin qanûna Tirkiyê de, bi mercê ku pêkanîna karûbarê hê dest pê nekiribe, dibe ku mafê vegerandinê hebe. Hûrgiliyên mafê vegerandinê li",
    CKB: "لەژێر یاسای تورکیدا، دەکرێت مافی پاشگەزبوونەوەتان هەبێت، بەمەرجی ئەوەی جێبەجێکردنی خزمەتگوزارییەکە هێشتا دەست پێنەکردبێت. وردەکارییەکانی مافی پاشگەزبوونەوە لە پەڕەی",
  },
  s7_link: { TR: "Mesafeli Satış Sözleşmesi", DE: "Fernabsatzvertrag", EN: "Distance Sales Agreement", KU: "rûpela Peymana Firotina ji Dûr ve", CKB: "پەیمانی فرۆشتنی دوور" },
  s7_body_post: {
    TR: "sayfamızda yer almaktadır.",
    DE: "-Seite.",
    EN: "page.",
    KU: "cih digirin.",
    CKB: "ماندا هەیە.",
  },
} as const;

type TKey = keyof typeof T;
type Lang = "TR" | "DE" | "EN" | "KU" | "CKB";
function tt(key: TKey, lang: Lang): string {
  const entry = T[key] as Record<string, string>;
  return entry[lang] ?? entry.TR;
}

export async function generateMetadata() {
  const lang = await getLang();
  const urlLang = await getUrlLang();
  return {
    title: tt("title", lang),
    description: tt("intro", lang),
    alternates: { canonical: canonicalForLang("/iptal-iade-politikasi", urlLang), languages: buildAlternates("/iptal-iade-politikasi") },
  };
}

export default async function IptalIadePolitikasiPage() {
  const lang = await getLang();

  return (
    <LegalLayout title={tt("title", lang)} updatedDate="28 Haziran 2026" lang={lang}>
      <p>{tt("intro", lang)}</p>

      <h2>{tt("s1_title", lang)}</h2>
      <p>
        {tt("s1_body1_pre", lang)} <strong>{tt("s1_body1_strong", lang)}</strong> {tt("s1_body1_post", lang)}
      </p>
      <p>
        <strong>{tt("s1_body2_strong", lang)}</strong> {tt("s1_body2", lang)}
      </p>

      <h2>{tt("s2_title", lang)}</h2>
      <p>
        {tt("s2_body_pre", lang)} <strong>{tt("s2_body_strong", lang)}</strong>
        {tt("s2_body_post", lang)}
      </p>

      <h2>{tt("s3_title", lang)}</h2>
      <p>{tt("s3_intro", lang)}</p>
      <ul>
        <li>
          {tt("s3_email_label", lang)}: <a href="mailto:info@visitvam.com">info@visitvam.com</a>
        </li>
        <li>
          {tt("s3_phone_label", lang)}: <a href="tel:+905436837978">+90 543 683 7978</a>
        </li>
      </ul>
      <p>{tt("s3_body2", lang)}</p>

      <h2>{tt("s4_title", lang)}</h2>
      <p>
        {tt("s4_body_pre", lang)} <strong>{tt("s4_body_strong", lang)}</strong> {tt("s4_body_post", lang)}
      </p>

      <h2>{tt("s5_title", lang)}</h2>
      <p>{tt("s5_body", lang)}</p>

      <h2>{tt("s6_title", lang)}</h2>
      <p>{tt("s6_body", lang)}</p>

      <h2>{tt("s7_title", lang)}</h2>
      <p>
        {tt("s7_body_pre", lang)}{" "}
        <a href="/mesafeli-satis-sozlesmesi">{tt("s7_link", lang)}</a>{" "}
        {tt("s7_body_post", lang)}
      </p>
    </LegalLayout>
  );
}
