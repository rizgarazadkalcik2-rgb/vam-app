import LegalLayout from "../components/LegalLayout";
import { getLang } from "@/lib/i18n";

const T = {
  title: { TR: "Teslimat ve Hizmet Şartları", DE: "Nutzungsbedingungen", EN: "Delivery and Service Terms", KU: "Mercên Radestkirin û Karûbarê" },
  intro_pre: {
    TR: "VAM (Visit Anatolia and Mesopotamia) üzerinden satın alınan ürünler fiziksel kargo ile teslim edilen mallar değil, belirli bir tarihte ifa edilen",
    DE: "Die über VAM (Visit Anatolia and Mesopotamia) erworbenen Leistungen sind keine physisch versandten Waren, sondern",
    EN: "Products purchased through VAM (Visit Anatolia and Mesopotamia) are not physically shipped goods, but rather",
    KU: "Berhemên ku bi rêya VAM (Visit Anatolia and Mesopotamia) tên kirrîn ne kelûpelên ku bi kargoya fizîkî tên radestkirin in, lê",
  },
  intro_strong: { TR: "seyahat ve deneyim hizmetleridir", DE: "Reise- und Erlebnisdienstleistungen, die zu einem bestimmten Termin erbracht werden", EN: "travel and experience services performed on a specific date", KU: "karûbarên gerê û ezmûnê ne ku di rojeke diyarkirî de têne pêkanîn" },
  intro_post: {
    TR: "Bu sayfa, hizmetin nasıl ve ne zaman sunulacağına ilişkin koşulları açıklar.",
    DE: "Diese Seite erläutert die Bedingungen, wie und wann die Leistung erbracht wird.",
    EN: "This page explains the conditions under which and when the service will be provided.",
    KU: "Ev rûpel, mercên ka Karûbar dê çawa û kengî were pêşkêşkirin rave dike.",
  },
  s1_title: { TR: "1. Rezervasyon Onayı", DE: "1. Buchungsbestätigung", EN: "1. Reservation Confirmation", KU: "1. Piştrastkirina Rezervasyonê" },
  s1_body: {
    TR: "Ödemenin başarıyla tamamlanmasının ardından, rezervasyon detaylarınız (tarih, paket içeriği, katılımcı sayısı, iletişim bilgileri) kayıtlı e-posta adresinize gönderilir. Bu e-posta, rezervasyonunuzun resmi onayı niteliğindedir.",
    DE: "Nach erfolgreichem Zahlungsabschluss werden Ihre Buchungsdetails (Datum, Paketinhalt, Teilnehmerzahl, Kontaktdaten) an Ihre hinterlegte E-Mail-Adresse gesendet. Diese E-Mail gilt als offizielle Bestätigung Ihrer Buchung.",
    EN: "After successful completion of payment, your reservation details (date, package content, number of participants, contact information) are sent to your registered email address. This email serves as the official confirmation of your reservation.",
    KU: "Piştî ku dayîn bi serkeftî temam bibe, hûrgiliyên rezervasyona we (dîrok, naveroka pakêtê, hejmara beşdaran, agahiyên têkiliyê) li navnîşana we ya e-peyamê ya tomarkirî tê şandin. Ev e-peyam, wekî piştrastkirina fermî ya rezervasyona we ye.",
  },
  s2_title: { TR: "2. Hizmetin Sunum Şekli", DE: "2. Art der Leistungserbringung", EN: "2. How the Service Is Provided", KU: "2. Awayê Pêşkêşkirina Karûbarê" },
  s2_intro: {
    TR: "Satın aldığınız pakete bağlı olarak hizmet aşağıdaki unsurları içerebilir:",
    DE: "Je nach erworbenem Paket kann die Leistung folgende Bestandteile umfassen:",
    EN: "Depending on the package you purchased, the service may include the following elements:",
    KU: "Li gorî pakêta ku we kirrî ye, Karûbar dikare van hêmanan tê de bihewîne:",
  },
  s2_li1: { TR: "Rehberli tur ve gezi programı", DE: "Geführte Tour und Reiseprogramm", EN: "Guided tour and itinerary", KU: "Geşta rêberkirî û bernameya gerê" },
  s2_li2: { TR: "Konaklama rezervasyonu (anlaşmalı tesisler aracılığıyla)", DE: "Unterkunftsbuchung (über Partnerbetriebe)", EN: "Accommodation reservation (through partner facilities)", KU: "Rezervasyona kirêdayînê (bi rêya taybetmendiyên li hev kirî)" },
  s2_li3: { TR: "Yerel ulaşım organizasyonu", DE: "Organisation des lokalen Transports", EN: "Local transport organization", KU: "Rêxistina veguhastina herêmî" },
  s2_li4: { TR: "Giriş ücretleri ve özel deneyimler (pakette belirtilmişse)", DE: "Eintrittsgebühren und besondere Erlebnisse (sofern im Paket angegeben)", EN: "Entrance fees and special experiences (if specified in the package)", KU: "Bacên têketinê û ezmûnên taybet (heke di pakêtê de hatibe diyarkirin)" },
  s2_body2: {
    TR: "Her paketin tam kapsamı, ilgili paket sayfasında ayrıntılı olarak belirtilir.",
    DE: "Der vollständige Umfang jedes Pakets ist auf der jeweiligen Paketseite im Detail angegeben.",
    EN: "The full scope of each package is detailed on the relevant package page.",
    KU: "Berfirehiya tevahî ya her pakêtê, bi hûrgilî li rûpela pakêtê ya têkildar tê diyarkirin.",
  },
  s3_title: { TR: "3. Hizmet Tarihi ve Süresi", DE: "3. Leistungsdatum und -dauer", EN: "3. Service Date and Duration", KU: "3. Dîrok û Dema Karûbarê" },
  s3_body_pre: {
    TR: "Hizmetin gerçekleştirileceği tarih, rezervasyon sırasında seçilen veya onay e-postasında belirtilen tarihtir. Tarih değişikliği talepleri",
    DE: "Das Datum, an dem die Leistung erbracht wird, ist das bei der Buchung gewählte oder in der Bestätigungs-E-Mail angegebene Datum. Anfragen zur Terminänderung unterliegen den auf unserer",
    EN: "The date on which the service is performed is the date selected during the reservation or specified in the confirmation email. Date change requests are subject to the conditions specified on our",
    KU: "Dîroka ku Karûbar dê lê were pêkanîn, ew dîrok e ku di dema rezervasyonê de hatiye hilbijartin an di e-peyama piştrastkirinê de hatiye diyarkirin. Daxwazên guherîna dîrokê, li gorî mercên li",
  },
  s3_link: { TR: "İptal ve İade Politikası", DE: "Stornierungsrichtlinie", EN: "Cancellation and Refund Policy", KU: "rûpela Polîtîkaya Betalkirin û Vegerandinê" },
  s3_body_post: {
    TR: "sayfasında belirtilen koşullara tabidir.",
    DE: "genannten Bedingungen.",
    EN: "page.",
    KU: "diyarkirî ne.",
  },
  s4_title: { TR: "4. Belge ve Bilgilendirme Teslimi", DE: "4. Zustellung von Dokumenten und Informationen", EN: "4. Delivery of Documents and Information", KU: "4. Radestkirina Belge û Agahiyan" },
  s4_body: {
    TR: "Rezervasyonunuza ilişkin voucher, program detayları, buluşma noktası ve rehber iletişim bilgileri gibi belgeler, hizmet tarihinden önce e-posta yoluyla elektronik olarak iletilir. Bu nedenle rezervasyon sırasında verdiğiniz e-posta adresinin doğru ve erişilebilir olması önemlidir.",
    DE: "Dokumente zu Ihrer Buchung wie Voucher, Programmdetails, Treffpunkt und Kontaktdaten des Guides werden vor dem Leistungsdatum elektronisch per E-Mail übermittelt. Es ist daher wichtig, dass die bei der Buchung angegebene E-Mail-Adresse korrekt und erreichbar ist.",
    EN: "Documents related to your reservation, such as vouchers, itinerary details, meeting point, and guide contact information, are sent electronically by email before the service date. It is therefore important that the email address provided at the time of reservation is correct and accessible.",
    KU: "Belgeyên girêdayî rezervasyona we, wekî voucher, hûrgiliyên bernameyê, xala civînê û agahiyên têkiliyê yên rêberê, berî dîroka Karûbarê bi rêya e-peyamê bi awayekî elektronîkî tê şandin. Ji ber vê yekê girîng e ku navnîşana e-peyamê ya ku di dema rezervasyonê de dane, rast û gihîştî be.",
  },
  s5_title: { TR: "5. Katılımcı Yükümlülükleri", DE: "5. Pflichten der Teilnehmer", EN: "5. Participant Obligations", KU: "5. Berpirsiyariyên Beşdaran" },
  s5_intro: {
    TR: "Hizmetin sorunsuz ifası için katılımcıların aşağıdaki hususlara dikkat etmesi gerekir:",
    DE: "Für eine reibungslose Erbringung der Leistung sollten die Teilnehmer Folgendes beachten:",
    EN: "For the smooth performance of the service, participants should observe the following:",
    KU: "Ji bo pêkanîna bêkêmasî ya Karûbarê, divê beşdar li van xalan bala xwe bidin:",
  },
  s5_li1: { TR: "Buluşma noktasına belirtilen saatte hazır bulunmak", DE: "Pünktliches Erscheinen am Treffpunkt zur angegebenen Zeit", EN: "Being present at the meeting point at the specified time", KU: "Li xala civînê di demjimêra diyarkirî de amade bûn" },
  s5_li2: { TR: "Geçerli kimlik/pasaport belgesini yanında bulundurmak", DE: "Mitführen eines gültigen Ausweis-/Reisepassdokuments", EN: "Carrying a valid ID/passport document", KU: "Anîna belgeya nasnameyê/pasaporta derbasdar" },
  s5_li3: { TR: "Sağlık durumu, hareket kısıtlılığı veya özel ihtiyaçların rezervasyon öncesinde bildirilmesi", DE: "Mitteilung von Gesundheitszustand, Mobilitätseinschränkungen oder besonderen Bedürfnissen vor der Buchung", EN: "Informing us of any health conditions, mobility limitations, or special needs before the reservation", KU: "Ragihandina rewşa tenduristiyê, sînordariya tevgerê an hewcedariyên taybet berî rezervasyonê" },
  s6_title: { TR: "6. Hizmetin Sağlanamaması", DE: "6. Nichterbringung der Leistung", EN: "6. Inability to Provide the Service", KU: "6. Nekarîna Peydakirina Karûbarê" },
  s6_body: {
    TR: "Mücbir sebepler, hava koşulları, güvenlik gerekçeleri veya yerel makamların kararları nedeniyle hizmetin planlanan şekilde sunulamaması halinde, Alıcı en kısa sürede bilgilendirilir ve alternatif tarih, alternatif program veya iade seçenekleri sunulur.",
    DE: "Kann die Leistung aufgrund höherer Gewalt, Wetterbedingungen, Sicherheitsgründen oder Entscheidungen lokaler Behörden nicht wie geplant erbracht werden, wird der Käufer schnellstmöglich informiert und es werden alternative Termine, ein alternatives Programm oder Rückerstattungsoptionen angeboten.",
    EN: "If the service cannot be provided as planned due to force majeure, weather conditions, safety reasons, or decisions by local authorities, the Buyer is notified as soon as possible and offered alternative dates, an alternative program, or refund options.",
    KU: "Heke ji ber sedemên bêserûber, rewşa hewayê, sedemên ewlehiyê an biryarên desthilatdarên herêmî Karûbar nikaribe wekî hatiye plankirin were pêşkêşkirin, Kirrîkar zû tê agahdarkirin û vebijarkên rojek, bername an vegerandinê tên pêşkêşkirin.",
  },
  s7_title: { TR: "7. Üçüncü Taraf Hizmet Sağlayıcılar", DE: "7. Drittanbieter", EN: "7. Third-Party Service Providers", KU: "7. Peydakerên Karûbarê yên Aliyê Sêyem" },
  s7_body: {
    TR: "Konaklama, ulaşım ve belirli deneyimler, anlaşmalı yerel hizmet sağlayıcılar tarafından sunulabilir. Bu hizmet sağlayıcıların kendi hizmet şartları ve politikaları da geçerli olabilir; bu durumlarda ilgili bilgilendirme paket sayfasında veya rezervasyon onayında belirtilir.",
    DE: "Unterkunft, Transport und bestimmte Erlebnisse können von lokalen Partnerdienstleistern erbracht werden. Es können auch deren eigene Leistungsbedingungen und Richtlinien gelten; entsprechende Hinweise finden Sie in diesem Fall auf der Paketseite oder in der Buchungsbestätigung.",
    EN: "Accommodation, transport, and certain experiences may be provided by local partner service providers. Their own terms and policies may also apply; relevant information is provided on the package page or in the reservation confirmation in such cases.",
    KU: "Kirêdayîn, veguhastin û ezmûnên diyarkirî, dikarin ji hêla peydakerên karûbarê yên herêmî yên li hev kirî ve werin pêşkêşkirin. Mercên û polîtîkayên xwe yên van peydakeran jî dikarin derbasdar bin; di van rewşan de agahdariya têkildar li rûpela pakêtê an di piştrastkirina rezervasyonê de tê diyarkirin.",
  },
  s8_title: { TR: "8. İletişim", DE: "8. Kontakt", EN: "8. Contact", KU: "8. Têkilî" },
  s8_body_pre: {
    TR: "Hizmet süreciyle ilgili sorularınız için:",
    DE: "Bei Fragen zum Leistungsprozess:",
    EN: "For questions about the service process:",
    KU: "Ji bo pirsên we yên girêdayî pêvajoya Karûbarê:",
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
  return {
    title: tt("title", lang),
    description: `${tt("intro_pre", lang)} ${tt("intro_strong", lang)}. ${tt("intro_post", lang)}`,
    alternates: { canonical: "/teslimat-hizmet-sartlari" },
  };
}

export default async function TeslimatHizmetSartlariPage() {
  const lang = await getLang();

  return (
    <LegalLayout title={tt("title", lang)} updatedDate="28 Haziran 2026" lang={lang}>
      <p>
        {tt("intro_pre", lang)} <strong>{tt("intro_strong", lang)}</strong>. {tt("intro_post", lang)}
      </p>

      <h2>{tt("s1_title", lang)}</h2>
      <p>{tt("s1_body", lang)}</p>

      <h2>{tt("s2_title", lang)}</h2>
      <p>{tt("s2_intro", lang)}</p>
      <ul>
        <li>{tt("s2_li1", lang)}</li>
        <li>{tt("s2_li2", lang)}</li>
        <li>{tt("s2_li3", lang)}</li>
        <li>{tt("s2_li4", lang)}</li>
      </ul>
      <p>{tt("s2_body2", lang)}</p>

      <h2>{tt("s3_title", lang)}</h2>
      <p>
        {tt("s3_body_pre", lang)}{" "}
        <a href="/iptal-iade-politikasi">{tt("s3_link", lang)}</a>{" "}
        {tt("s3_body_post", lang)}
      </p>

      <h2>{tt("s4_title", lang)}</h2>
      <p>{tt("s4_body", lang)}</p>

      <h2>{tt("s5_title", lang)}</h2>
      <p>{tt("s5_intro", lang)}</p>
      <ul>
        <li>{tt("s5_li1", lang)}</li>
        <li>{tt("s5_li2", lang)}</li>
        <li>{tt("s5_li3", lang)}</li>
      </ul>

      <h2>{tt("s6_title", lang)}</h2>
      <p>{tt("s6_body", lang)}</p>

      <h2>{tt("s7_title", lang)}</h2>
      <p>{tt("s7_body", lang)}</p>

      <h2>{tt("s8_title", lang)}</h2>
      <p>
        {tt("s8_body_pre", lang)}{" "}
        <a href="mailto:info@visitvam.com">info@visitvam.com</a> ·{" "}
        <a href="tel:+905436837978">+90 543 683 7978</a>
      </p>
    </LegalLayout>
  );
}
