import LegalLayout from "../components/LegalLayout";
import { getLang } from "@/lib/i18n";

const T = {
  title: { TR: "Gizlilik Politikası", DE: "Datenschutzerklärung", EN: "Privacy Policy", KU: "Polîtîkaya Nihêniyê" },
  intro: {
    TR: "VAM (Visit Anatolia and Mesopotamia) olarak kişisel verilerinizin güvenliğine önem veriyoruz. Bu Gizlilik Politikası, web sitemiz üzerinden topladığımız kişisel verilerin hangi amaçlarla işlendiğini, kimlerle paylaşıldığını ve veri sahibi olarak haklarınızı açıklar.",
    DE: "Als VAM (Visit Anatolia and Mesopotamia) legen wir großen Wert auf die Sicherheit Ihrer personenbezogenen Daten. Diese Datenschutzerklärung erläutert, zu welchen Zwecken wir die über unsere Website erhobenen personenbezogenen Daten verarbeiten, mit wem sie geteilt werden und welche Rechte Sie als betroffene Person haben.",
    EN: "At VAM (Visit Anatolia and Mesopotamia), we take the security of your personal data seriously. This Privacy Policy explains for what purposes we process the personal data collected through our website, with whom it is shared, and your rights as a data subject.",
    KU: "Em li VAM (Visit Anatolia and Mesopotamia) girîngiyê didin ewlehiya daneyên we yên kesane. Ev Polîtîkaya Nihêniyê rave dike ka em daneyên kesane yên ku bi rêya malpera me tên berhevkirin ji bo çi armancan dişixulînin, bi kê re tên parvekirin û mafên we yên wekî xwediyê daneyan çi ne.",
  },
  s1_title: { TR: "1. Veri Sorumlusu", DE: "1. Verantwortlicher", EN: "1. Data Controller", KU: "1. Berpirsê Daneyan" },
  s1_body: {
    TR: "Bu platform, Narin Kalçık şahıs işletmesi tarafından, Tuşba/Van, Türkiye adresinde işletilmektedir. Veri sorumlusu sıfatıyla kişisel verilerinizi 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") ve ilgili Avrupa Birliği Genel Veri Koruma Tüzüğü (\"GDPR\") hükümlerine uygun olarak işliyoruz.",
    DE: "Diese Plattform wird von Narin Kalçık (Einzelunternehmen) mit Sitz in Tuşba/Van, Türkei betrieben. Als Verantwortlicher verarbeiten wir Ihre personenbezogenen Daten in Übereinstimmung mit dem türkischen Gesetz Nr. 6698 zum Schutz personenbezogener Daten (\"KVKK\") sowie der einschlägigen EU-Datenschutz-Grundverordnung (\"DSGVO\").",
    EN: "This platform is operated by Narin Kalçık (sole proprietorship), based in Tuşba/Van, Türkiye. As data controller, we process your personal data in accordance with Turkish Law No. 6698 on the Protection of Personal Data (\"KVKK\") and the applicable EU General Data Protection Regulation (\"GDPR\").",
    KU: "Ev platform, ji hêla karsaziya takekesî ya Narin Kalçık ve, li navnîşana Tuşba/Van, Tirkiyê tê xebitandin. Wekî berpirsê daneyan, em daneyên we yên kesane li gorî Qanûna Parastina Daneyên Kesane ya bi hejmara 6698 (\"KVKK\") û Rêziknameya Giştî ya Parastina Daneyan a Yekîtiya Ewropayê (\"GDPR\") dişixulînin.",
  },
  contact_label: { TR: "İletişim", DE: "Kontakt", EN: "Contact", KU: "Têkilî" },
  s2_title: { TR: "2. Toplanan Kişisel Veriler", DE: "2. Erhobene personenbezogene Daten", EN: "2. Personal Data Collected", KU: "2. Daneyên Kesane yên tên Berhevkirin" },
  s2_intro: {
    TR: "Web sitemizi ve hizmetlerimizi kullanırken aşağıdaki veriler toplanabilir:",
    DE: "Bei der Nutzung unserer Website und Dienste können folgende Daten erhoben werden:",
    EN: "The following data may be collected while using our website and services:",
    KU: "Dema hûn malper û karûbarên me bikar tînin, daneyên jêrîn dikarin werin berhevkirin:",
  },
  s2_li1: { TR: "Ad, soyad, e-posta adresi, telefon numarası", DE: "Vor- und Nachname, E-Mail-Adresse, Telefonnummer", EN: "First and last name, email address, phone number", KU: "Nav, paşnav, navnîşana e-peyamê, hejmara telefonê" },
  s2_li2: { TR: "Fatura/teslimat adresi bilgileri", DE: "Rechnungs-/Lieferadresse", EN: "Billing/delivery address information", KU: "Agahiyên navnîşana fatûre/radestkirinê" },
  s2_li3: { TR: "Rezervasyon ve seyahat tercihleri (destinasyon, tarih, kişi sayısı)", DE: "Buchungs- und Reisepräferenzen (Reiseziel, Datum, Personenzahl)", EN: "Reservation and travel preferences (destination, date, number of people)", KU: "Vebijarkên rezervasyon û gerê (cîhê armanc, dîrok, hejmara kesan)" },
  s2_li4: { TR: "Ödeme işlemine ilişkin sınırlı veriler (kart bilgilerinin tamamı bizde saklanmaz, ödeme kuruluşu tarafından işlenir)", DE: "Begrenzte Zahlungsdaten (vollständige Kartendaten werden nicht bei uns gespeichert, sondern vom Zahlungsdienstleister verarbeitet)", EN: "Limited payment-related data (full card details are not stored by us and are processed by the payment provider)", KU: "Daneyên sînordar ên girêdayî dayînê (agahiyên qerta bi tevahî li ba me nayên tomarkirin, ji hêla kompaniya dayînê ve tên şixulandin)" },
  s2_li5: { TR: "Site kullanım verileri (IP adresi, tarayıcı bilgisi, çerezler)", DE: "Nutzungsdaten der Website (IP-Adresse, Browserinformationen, Cookies)", EN: "Site usage data (IP address, browser information, cookies)", KU: "Daneyên bikaranîna malperê (navnîşana IP, agahiyên gerokê, çerez)" },
  s3_title: { TR: "3. Verilerin İşlenme Amaçları", DE: "3. Zwecke der Datenverarbeitung", EN: "3. Purposes of Processing", KU: "3. Armancên Şixulandina Daneyan" },
  s3_li1: { TR: "Rezervasyon ve paket satın alma işlemlerinin gerçekleştirilmesi", DE: "Abwicklung von Buchungen und Paketkäufen", EN: "Carrying out reservations and package purchases", KU: "Pêkanîna rezervasyon û kirrîna pakêtan" },
  s3_li2: { TR: "Müşteri hizmetleri ve destek taleplerinin yanıtlanması", DE: "Beantwortung von Kundenservice- und Support-Anfragen", EN: "Responding to customer service and support requests", KU: "Bersivandina daxwazên karûbarê xerîdar û piştgiriyê" },
  s3_li3: { TR: "Yasal yükümlülüklerin (fatura düzenleme, muhasebe kayıtları) yerine getirilmesi", DE: "Erfüllung gesetzlicher Pflichten (Rechnungsstellung, Buchhaltungsunterlagen)", EN: "Fulfilling legal obligations (invoicing, accounting records)", KU: "Bicihanîna berpirsiyariyên qanûnî (rêkirina fatûreyan, tomarên hesabdariyê)" },
  s3_li4: { TR: "Hizmet kalitesinin artırılması ve site performansının analiz edilmesi", DE: "Verbesserung der Servicequalität und Analyse der Website-Performance", EN: "Improving service quality and analyzing site performance", KU: "Zêdekirina kalîteya karûbar û analîzkirina performansa malperê" },
  s3_li5: { TR: "Açık rızanız bulunması halinde pazarlama ve bilgilendirme iletişimleri", DE: "Marketing- und Informationsmitteilungen, sofern Sie ausdrücklich eingewilligt haben", EN: "Marketing and informational communications, where you have given explicit consent", KU: "Danûstandinên bazarî û agahdariyê, heke razîbûna we ya eşkere hebe" },
  s4_title: { TR: "4. Verilerin Paylaşıldığı Taraflar", DE: "4. Empfänger der Daten", EN: "4. Parties with Whom Data Is Shared", KU: "4. Alîyên ku Daneyan pê re tên Parvekirin" },
  s4_intro: {
    TR: "Kişisel verileriniz, hizmetin sunulması için gerekli olduğu ölçüde aşağıdaki taraflarla paylaşılabilir:",
    DE: "Ihre personenbezogenen Daten können, soweit für die Erbringung der Leistung erforderlich, mit folgenden Parteien geteilt werden:",
    EN: "Your personal data may be shared with the following parties to the extent necessary to provide the service:",
    KU: "Daneyên we yên kesane, bi qasî ku ji bo pêşkêşkirina karûbarê pêwîst be, dikarin bi aliyên jêrîn re werin parvekirin:",
  },
  s4_li1: { TR: "Ödeme işlemlerini gerçekleştiren ödeme kuruluşu (iyzico ve ilgili bankalar)", DE: "Der Zahlungsdienstleister, der die Zahlungen abwickelt (iyzico und beteiligte Banken)", EN: "The payment provider processing payments (iyzico and related banks)", KU: "Kompaniya dayînê ya ku danûstandinan pêk tîne (iyzico û bankên girêdayî)" },
  s4_li2: { TR: "Rezervasyonun gerçekleştirileceği yerel tur operatörleri, rehberler ve konaklama tesisleri", DE: "Lokale Reiseveranstalter, Guides und Unterkünfte, bei denen die Buchung durchgeführt wird", EN: "Local tour operators, guides, and accommodation facilities where the reservation is carried out", KU: "Operatorên gerê yên herêmî, rêber û taybetmendiyên kirêdayînê yên ku rezervasyon lê pêk tê" },
  s4_li3: { TR: "Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları", DE: "Zuständige Behörden im Falle einer gesetzlichen Verpflichtung", EN: "Authorized public institutions and organizations in case of legal obligation", KU: "Sazî û dezgehên gelemperî yên salahîyetdar di rewşa mecbûriyeta qanûnî de" },
  s4_body2: {
    TR: "Verileriniz, yukarıda belirtilenler dışında üçüncü taraflarla ticari amaçla paylaşılmaz veya satılmaz.",
    DE: "Ihre Daten werden über die oben genannten Fälle hinaus nicht zu kommerziellen Zwecken an Dritte weitergegeben oder verkauft.",
    EN: "Beyond those listed above, your data is not shared with third parties for commercial purposes or sold.",
    KU: "Ji bilî yên li jor hatine gotin, daneyên we ji bo armancên bazirganî nayên parvekirin an firotin bi aliyên sêyem re.",
  },
  s5_title: { TR: "5. Veri Saklama Süresi", DE: "5. Speicherdauer", EN: "5. Data Retention Period", KU: "5. Dema Tomarkirina Daneyan" },
  s5_body: {
    TR: "Kişisel verileriniz, işleme amacının gerektirdiği süre ve yasal saklama yükümlülükleri (örneğin Vergi Usul Kanunu kapsamındaki belgeler için 5 yıl) boyunca saklanır. Süre sonunda veriler silinir, yok edilir veya anonim hale getirilir.",
    DE: "Ihre personenbezogenen Daten werden für die Dauer aufbewahrt, die der Verarbeitungszweck erfordert, sowie für die gesetzlichen Aufbewahrungspflichten (z. B. 5 Jahre für Dokumente nach dem Steuerverfahrensgesetz). Nach Ablauf der Frist werden die Daten gelöscht, vernichtet oder anonymisiert.",
    EN: "Your personal data is retained for as long as required by the purpose of processing and by statutory retention obligations (e.g., 5 years for documents under the Tax Procedure Law). At the end of this period, the data is deleted, destroyed, or anonymized.",
    KU: "Daneyên we yên kesane, ji bo dema ku armanca şixulandinê pêwîst dike û berpirsiyariyên tomarkirina qanûnî (mînak, 5 sal ji bo belgeyên di bin Qanûna Rêbaza Bacê de) tê tomarkirin. Di dawiya demê de daneyan têne jêbirin, tunekirin an nenaskirî kirin.",
  },
  s6_title: { TR: "6. Çerezler (Cookies)", DE: "6. Cookies", EN: "6. Cookies", KU: "6. Çerez" },
  s6_body: {
    TR: "Sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda sitenin bazı özellikleri düzgün çalışmayabilir.",
    DE: "Unsere Website verwendet Cookies, um die Nutzererfahrung zu verbessern und den Website-Traffic zu analysieren. Sie können Cookies in Ihren Browsereinstellungen deaktivieren; in diesem Fall funktionieren möglicherweise einige Funktionen der Website nicht ordnungsgemäß.",
    EN: "Our site uses cookies to improve user experience and analyze site traffic. You can disable cookies in your browser settings; however, some site features may not work properly in that case.",
    KU: "Malpera me, ji bo baştirkirina ezmûna bikarhêner û analîzkirina trafîka malperê çerezan bikar tîne. Hûn dikarin ji mîhengên geroka xwe çerezan neçalak bikin; lê belê di vê rewşê de dibe ku hin taybetmendiyên malperê baş nexebitin.",
  },
  s7_title: { TR: "7. Veri Sahibinin Hakları", DE: "7. Rechte der betroffenen Person", EN: "7. Rights of the Data Subject", KU: "7. Mafên Xwediyê Daneyan" },
  s7_intro: {
    TR: "KVKK madde 11 ve GDPR madde 15-22 kapsamında aşağıdaki haklara sahipsiniz:",
    DE: "Gemäß Artikel 11 KVKK und Artikel 15-22 DSGVO haben Sie folgende Rechte:",
    EN: "Under KVKK Article 11 and GDPR Articles 15-22, you have the following rights:",
    KU: "Li gorî mahderê 11ê KVKK û mahderên 15-22 ên GDPR, hûn xwedî van mafan in:",
  },
  s7_li1: { TR: "Kişisel verilerinizin işlenip işlenmediğini öğrenme", DE: "Auskunft darüber, ob Ihre personenbezogenen Daten verarbeitet werden", EN: "To learn whether your personal data is being processed", KU: "Fêrbûna ka daneyên we yên kesane têne şixulandin an na" },
  s7_li2: { TR: "İşlenen verilere ilişkin bilgi talep etme", DE: "Auskunft über die verarbeiteten Daten zu verlangen", EN: "To request information about processed data", KU: "Daxwaza agahî li ser daneyên ku têne şixulandin" },
  s7_li3: { TR: "Verilerin düzeltilmesini veya silinmesini talep etme", DE: "Berichtigung oder Löschung der Daten zu verlangen", EN: "To request correction or deletion of data", KU: "Daxwaza rastkirin an jêbirina daneyan" },
  s7_li4: { TR: "İşlemeye itiraz etme ve rıza geri çekme", DE: "Widerspruch gegen die Verarbeitung einzulegen und die Einwilligung zu widerrufen", EN: "To object to processing and withdraw consent", KU: "Vegotina li dijî şixulandinê û paşvekişandina razîbûnê" },
  s7_li5: { TR: "Verilerinizin başka bir veri sorumlusuna aktarılmasını talep etme (veri taşınabilirliği)", DE: "Die Übertragung Ihrer Daten an einen anderen Verantwortlichen zu verlangen (Datenübertragbarkeit)", EN: "To request the transfer of your data to another data controller (data portability)", KU: "Daxwaza veguhastina daneyên we li berpirsiyarekî din ê daneyan (guhezbariya daneyan)" },
  s7_footer_pre: {
    TR: "Bu haklarınızı kullanmak için",
    DE: "Um diese Rechte auszuüben, können Sie uns über",
    EN: "To exercise these rights, you can contact us at",
    KU: "Ji bo bikaranîna van mafan, hûn dikarin bi rêya",
  },
  s7_footer_post: {
    TR: "üzerinden bizimle iletişime geçebilirsiniz.",
    DE: "kontaktieren.",
    EN: "reach us.",
    KU: "bi me re têkilî daynin.",
  },
  s8_title: { TR: "8. Veri Güvenliği", DE: "8. Datensicherheit", EN: "8. Data Security", KU: "8. Ewlehiya Daneyan" },
  s8_body: {
    TR: "Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve idari tedbirler alınmaktadır. Ödeme bilgileriniz doğrudan tarafımızca saklanmaz; PCI-DSS uyumlu ödeme kuruluşu altyapısı üzerinden işlenir.",
    DE: "Zur Gewährleistung der Sicherheit Ihrer personenbezogenen Daten werden geeignete technische und organisatorische Maßnahmen ergriffen. Ihre Zahlungsdaten werden nicht direkt von uns gespeichert, sondern über die PCI-DSS-konforme Infrastruktur des Zahlungsdienstleisters verarbeitet.",
    EN: "Appropriate technical and administrative measures are taken to ensure the security of your personal data. Your payment information is not stored directly by us; it is processed through the PCI-DSS-compliant infrastructure of the payment provider.",
    KU: "Ji bo ewlehiya daneyên we yên kesane, pêwendiyên teknîkî û îdarî yên guncan têne girtin. Agahiyên we yên dayînê rasterast ji hêla me ve nayên tomarkirin; bi rêya binesaziya kompaniya dayînê ya li gorî PCI-DSS tê şixulandin.",
  },
  s9_title: { TR: "9. Politika Değişiklikleri", DE: "9. Änderungen der Richtlinie", EN: "9. Policy Changes", KU: "9. Guherînên Polîtîkayê" },
  s9_body: {
    TR: "Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır.",
    DE: "Diese Datenschutzerklärung kann von Zeit zu Zeit aktualisiert werden. Die jeweils aktuelle Fassung wird stets auf dieser Seite veröffentlicht.",
    EN: "This Privacy Policy may be updated from time to time. The current version is always published on this page.",
    KU: "Ev Polîtîkaya Nihêniyê carna carna dikare were rojanekirin. Guherto ya rojane her dem li vê rûpelê tê weşandin.",
  },
} as const;

type TKey = keyof typeof T;
type Lang = "TR" | "DE" | "EN" | "KU";
function tt(key: TKey, lang: Lang): string {
  return T[key][lang] ?? T[key].TR;
}

export default async function GizlilikPolitikasiPage() {
  const lang = await getLang();

  return (
    <LegalLayout title={tt("title", lang)} updatedDate="28 Haziran 2026">
      <p>{tt("intro", lang)}</p>

      <h2>{tt("s1_title", lang)}</h2>
      <p>{tt("s1_body", lang)}</p>
      <p>
        {tt("contact_label", lang)}: <a href="mailto:info@visitvam.com">info@visitvam.com</a> ·{" "}
        <a href="tel:+905436837978">+90 543 683 7978</a>
      </p>

      <h2>{tt("s2_title", lang)}</h2>
      <p>{tt("s2_intro", lang)}</p>
      <ul>
        <li>{tt("s2_li1", lang)}</li>
        <li>{tt("s2_li2", lang)}</li>
        <li>{tt("s2_li3", lang)}</li>
        <li>{tt("s2_li4", lang)}</li>
        <li>{tt("s2_li5", lang)}</li>
      </ul>

      <h2>{tt("s3_title", lang)}</h2>
      <ul>
        <li>{tt("s3_li1", lang)}</li>
        <li>{tt("s3_li2", lang)}</li>
        <li>{tt("s3_li3", lang)}</li>
        <li>{tt("s3_li4", lang)}</li>
        <li>{tt("s3_li5", lang)}</li>
      </ul>

      <h2>{tt("s4_title", lang)}</h2>
      <p>{tt("s4_intro", lang)}</p>
      <ul>
        <li>{tt("s4_li1", lang)}</li>
        <li>{tt("s4_li2", lang)}</li>
        <li>{tt("s4_li3", lang)}</li>
      </ul>
      <p>{tt("s4_body2", lang)}</p>

      <h2>{tt("s5_title", lang)}</h2>
      <p>{tt("s5_body", lang)}</p>

      <h2>{tt("s6_title", lang)}</h2>
      <p>{tt("s6_body", lang)}</p>

      <h2>{tt("s7_title", lang)}</h2>
      <p>{tt("s7_intro", lang)}</p>
      <ul>
        <li>{tt("s7_li1", lang)}</li>
        <li>{tt("s7_li2", lang)}</li>
        <li>{tt("s7_li3", lang)}</li>
        <li>{tt("s7_li4", lang)}</li>
        <li>{tt("s7_li5", lang)}</li>
      </ul>
      <p>
        {tt("s7_footer_pre", lang)}{" "}
        <a href="mailto:info@visitvam.com">info@visitvam.com</a>{" "}
        {tt("s7_footer_post", lang)}
      </p>

      <h2>{tt("s8_title", lang)}</h2>
      <p>{tt("s8_body", lang)}</p>

      <h2>{tt("s9_title", lang)}</h2>
      <p>{tt("s9_body", lang)}</p>
    </LegalLayout>
  );
}
