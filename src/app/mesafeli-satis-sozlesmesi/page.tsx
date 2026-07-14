import LegalLayout from "../components/LegalLayout";
import { getLang } from "@/lib/i18n";
import { buildAlternates, canonicalForLang, getUrlLang } from "@/lib/hreflang";

const T = {
  title: { TR: "Mesafeli Satış Sözleşmesi", DE: "Fernabsatzvertrag", EN: "Distance Sales Agreement", KU: "Peymana Firotina ji Dûr ve", CKB: "پەیمانی فرۆشتنی دوور" },
  intro: {
    TR: "Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri çerçevesinde, VAM (Visit Anatolia and Mesopotamia) platformu üzerinden gerçekleştirilen satışlara ilişkin tarafların hak ve yükümlülüklerini düzenler.",
    DE: "Dieser Vertrag regelt im Rahmen des türkischen Verbraucherschutzgesetzes Nr. 6502 und der Verordnung über Fernabsatzverträge die Rechte und Pflichten der Parteien bei Verkäufen über die Plattform VAM (Visit Anatolia and Mesopotamia).",
    EN: "This agreement governs, under Turkish Consumer Protection Law No. 6502 and the Distance Contracts Regulation, the rights and obligations of the parties regarding sales carried out through the VAM (Visit Anatolia and Mesopotamia) platform.",
    KU: "Ev peyman, di çarçoveya Qanûna Parastina Xerîdar a bi hejmara 6502 û Rêziknameya Peymanên Firotina ji Dûr ve de, mafên û berpirsiyariyên aliyan ên di derbarê firotina bi rêya platforma VAM (Visit Anatolia and Mesopotamia) de rêk dixe.",
    CKB: "ئەم پەیمانە، لە چوارچێوەی یاسای پاراستنی خەرجدار ژمارە ٦٥٠٢ و ڕێنمایی پەیمانە دوورەکان، مافەکان و ئەرکەکانی لایەنەکان لەبارەی فرۆشتنی ئەنجامدراو لە ڕێگەی پلاتفۆرمی VAM (Visit Anatolia and Mesopotamia) دیاری دەکات.",
  },
  s1_title: { TR: "1. Taraflar", DE: "1. Vertragsparteien", EN: "1. Parties", KU: "1. Alî", CKB: "١. لایەنەکان" },
  seller_title: { TR: "Satıcı", DE: "Verkäufer", EN: "Seller", KU: "Firotkar", CKB: "فرۆشیار" },
  unvan_label: { TR: "Unvan", DE: "Firma", EN: "Business name", KU: "Nav", CKB: "ناو" },
  address_label: { TR: "Adres", DE: "Adresse", EN: "Address", KU: "Navnîşan", CKB: "ناونیشان" },
  tax_label: { TR: "Vergi Dairesi / VKN", DE: "Finanzamt / Steuernummer", EN: "Tax Office / Tax ID", KU: "Îdareya Bacê / Hejmara Bacê", CKB: "بەڕێوەبەرایەتی باج / ژمارەی باج" },
  email_label: { TR: "E-posta", DE: "E-Mail", EN: "Email", KU: "E-peyam", CKB: "ئیمەیل" },
  phone_label: { TR: "Telefon", DE: "Telefon", EN: "Phone", KU: "Telefon", CKB: "تەلەفۆن" },
  impressum_note: {
    TR: "Ayrıntılı işletme ve iletişim bilgileri için",
    DE: "Ausführliche Unternehmens- und Kontaktangaben finden Sie in unserem",
    EN: "For detailed business and contact information, please see our",
    KU: "Ji bo agahiyên berfireh ên karsazî û têkiliyê, li",
    CKB: "بۆ زانیاری وردتر لەبارەی کارگێڕی و پەیوەندی، سەردانی",
  },
  impressum_link_text: { TR: "Yasal Bilgiler (Impressum)", DE: "Impressum", EN: "Legal Notice", KU: "rûpela Agahiyên Fermî", CKB: "زانیاری یاسایی (Impressum)" },
  impressum_note_suffix: {
    TR: "sayfamıza bakabilirsiniz.",
    DE: "sehen.",
    EN: "page.",
    KU: "binêrin.",
    CKB: "بکە.",
  },
  buyer_title: { TR: "Alıcı", DE: "Käufer", EN: "Buyer", KU: "Kirrîkar", CKB: "کڕیار" },
  buyer_body: {
    TR: "Web sitesi üzerinden rezervasyon/satın alma işlemi gerçekleştiren gerçek veya tüzel kişi (\"Alıcı\").",
    DE: "Die natürliche oder juristische Person, die über die Website eine Buchung/einen Kauf vornimmt (\"Käufer\").",
    EN: "The natural or legal person who makes a reservation/purchase through the website (\"Buyer\").",
    KU: "Kesê rastîn an hiqûqî yê ku bi rêya malperê rezervasyon/kirrînê pêk tîne (\"Kirrîkar\").",
    CKB: "کەسی ڕاستەقینە یان یاسایی کە لە ڕێگەی ماڵپەڕەوە ڕیزێرڤ/کڕین ئەنجام دەدات (\"کڕیار\").",
  },
  s2_title: { TR: "2. Sözleşmenin Konusu", DE: "2. Vertragsgegenstand", EN: "2. Subject of the Agreement", KU: "2. Mijara Peymanê", CKB: "٢. بابەتی پەیمان" },
  s2_body: {
    TR: "Bu sözleşmenin konusu, Alıcı'nın VAM web sitesi üzerinden elektronik ortamda sipariş verdiği seyahat paketi/hizmetinin (\"Hizmet\") satışı ve ifasına ilişkin tarafların hak ve yükümlülüklerinin belirlenmesidir. Hizmetin türü, kapsamı, süresi ve bedeli, ilgili paket sayfasında ve sipariş onayında belirtilen bilgilerle birlikte bu sözleşmenin ayrılmaz parçasıdır.",
    DE: "Gegenstand dieses Vertrags ist die Festlegung der Rechte und Pflichten der Parteien hinsichtlich des Verkaufs und der Erbringung des vom Käufer elektronisch über die VAM-Website bestellten Reisepakets/der Dienstleistung (\"Leistung\"). Art, Umfang, Dauer und Preis der Leistung sind zusammen mit den Angaben auf der jeweiligen Paketseite und in der Bestellbestätigung fester Bestandteil dieses Vertrags.",
    EN: "The subject of this agreement is to determine the rights and obligations of the parties regarding the sale and fulfillment of the travel package/service (\"Service\") ordered electronically by the Buyer through the VAM website. The type, scope, duration, and price of the Service, together with the information stated on the relevant package page and in the order confirmation, form an integral part of this agreement.",
    KU: "Mijara vê peymanê, diyarkirina mafên û berpirsiyariyên aliyan e li ser firotin û pêkanîna pakêta gerê/karûbarê (\"Karûbar\") ku Kirrîkar bi rêya malpera VAM bi awayekî elektronîkî sîparîş kiriye. Cure, berfirehî, dem û buhayê Karûbarê, digel agahiyên ku li rûpela pakêtê û di piştrastkirina sîparîşê de hatine diyarkirin, beşek ji vê peymanê ye ku nayê veqetandin.",
    CKB: "بابەتی ئەم پەیمانە، دیاریکردنی مافەکان و ئەرکەکانی لایەنەکانە سەبارەت بە فرۆشتن و جێبەجێکردنی پاکێج/خزمەتگوزاری گەشتی (\"خزمەتگوزاری\") کە کڕیار بە شێوەی ئەلیکترۆنی لە ڕێگەی ماڵپەڕی VAM داواکاری کردووە. جۆر، فراوانی، ماوە و بەهای خزمەتگوزارییەکە، لەگەڵ زانیاریی دیاریکراو لە پەڕەی پاکێجەکە و لە پشتڕاستکردنەوەی داواکاریدا، بەشێکی جیانەکراوەی ئەم پەیمانەیە.",
  },
  s3_title: { TR: "3. Hizmetin Niteliği", DE: "3. Art der Leistung", EN: "3. Nature of the Service", KU: "3. Cureyê Karûbarê", CKB: "٣. جۆری خزمەتگوزاری" },
  s3_body: {
    TR: "Satılan hizmet, Doğu Anadolu ve Mezopotamya bölgesinde kültürel turizm kapsamında sunulan rehberli tur, konaklama, ulaşım ve/veya deneyim paketlerinden oluşur. Hizmet detayları (tarih, süre, dahil olan kalemler) ilgili paket sayfasında belirtilir.",
    DE: "Die verkaufte Leistung besteht aus geführten Touren, Unterkünften, Transport und/oder Erlebnispaketen im Rahmen des Kulturtourismus in Ostanatolien und Mesopotamien. Die Details der Leistung (Datum, Dauer, enthaltene Leistungen) sind auf der jeweiligen Paketseite angegeben.",
    EN: "The service sold consists of guided tours, accommodation, transport, and/or experience packages offered as part of cultural tourism in Eastern Anatolia and Mesopotamia. Service details (date, duration, included items) are specified on the relevant package page.",
    KU: "Karûbarê ku tê firotin, ji geştên rêberkirî, kirêdayîn, veguhastin û/an pakêtên ezmûnê yên ku di çarçoveya geriyana çandî ya li herêma Anatolya Rojhilat û Mezopotamyayê de tên pêşkêşkirin pêk tê. Hûrgiliyên Karûbarê (dîrok, dem, tiştên tê de hene) li rûpela pakêtê tên diyarkirin.",
    CKB: "خزمەتگوزاریی فرۆشراو پێکدێت لە گەشتی ڕابەرایەتیکراو، جێگە، گواستنەوە و/یان پاکێجی ئەزموون کە وەک بەشێک لە گەشتیاری کەلتووری لە ناوچەی ئەناتۆلیای ڕۆژهەڵات و مێزۆپۆتامیا پێشکەش دەکرێن. وردەکاریی خزمەتگوزارییەکە (بەروار، ماوە، بڕگە پێکراوەکان) لە پەڕەی پاکێجی پەیوەندیدار دیاری دەکرێت.",
  },
  s4_title: { TR: "4. Bedel ve Ödeme", DE: "4. Preis und Zahlung", EN: "4. Price and Payment", KU: "4. Buha û Dayîn", CKB: "٤. نرخ و پارەدان" },
  s4_body: {
    TR: "Hizmet bedeli, sipariş sırasında Alıcı'ya açıkça gösterilen tutardır ve vergiler dahildir. Ödeme, web sitesi üzerinden entegre ödeme kuruluşu (iyzico) aracılığıyla kredi/banka kartı ile gerçekleştirilir.",
    DE: "Der Preis der Leistung ist der dem Käufer bei der Bestellung klar angezeigte Betrag inklusive Steuern. Die Zahlung erfolgt über den in die Website integrierten Zahlungsdienstleister (iyzico) per Kredit-/Bankkarte.",
    EN: "The service price is the amount clearly shown to the Buyer at the time of order and includes taxes. Payment is made via credit/debit card through the integrated payment provider (iyzico) on the website.",
    KU: "Buhayê Karûbarê, ew mîqdar e ku di dema sîparîşê de bi eşkere ji Kirrîkar re tê nîşandan û bacan jî digire nav xwe. Dayîn, bi rêya kompaniya dayîna yekbûyî ya li ser malperê (iyzico) û bi qerta krediyê/bankê tê kirin.",
    CKB: "نرخی خزمەتگوزارییەکە ئەو بڕەیە کە بە ڕوونی لە کاتی داواکاریدا بۆ کڕیار پیشان دەدرێت و باجی تێدایە. پارەدان لە ڕێگەی کۆمپانیای پارەدانی یەکبووی ماڵپەڕەکە (iyzico) و بە کارتی کرێدیت/بانک ئەنجام دەدرێت.",
  },
  s5_title: { TR: "5. Cayma Hakkı", DE: "5. Widerrufsrecht", EN: "5. Right of Withdrawal", KU: "5. Mafê Vegerandinê", CKB: "٥. مافی هەڵوەشاندنەوە" },
  s5_body1_pre: {
    TR: "Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca,",
    DE: "Gemäß Artikel 15 der Verordnung über Fernabsatzverträge kann der Käufer bei",
    EN: "Under Article 15 of the Distance Contracts Regulation, the Buyer may not exercise the right of withdrawal for",
    KU: "Li gorî mahderê 15. yê Rêziknameya Peymanên Firotina ji Dûr ve, Kirrîkar",
    CKB: "بەپێی ماددەی ١٥ی ڕێنمایی پەیمانە دوورەکان، کڕیار ناتوانێت مافی هەڵوەشاندنەوە بەکار بهێنێت بۆ",
  },
  s5_body1_strong: {
    TR: "belirli bir tarihte veya dönemde yapılması gereken konaklama, eşya taşıma, araç kiralama, yiyecek-içecek tedariki ve boş zamanın değerlendirilmesine ilişkin sözleşmelerde",
    DE: "Verträgen über Unterkunft, Warentransport, Fahrzeugmiete, Verpflegung und Freizeitgestaltung, die zu einem bestimmten Termin oder Zeitraum zu erfüllen sind,",
    EN: "contracts relating to accommodation, transport of goods, vehicle rental, catering, and leisure activities that must be performed on a specific date or during a specific period",
    KU: "ji bo peymanên li ser kirêdayîn, veguhastina tiştan, kirêdana wesayîtan, peydakirina xwarin-vexwarinê û bikaranîna dema vala, ên ku divê di roj an demeke diyarkirî de bên pêkanîn,",
    CKB: "پەیمانەکانی سەبارەت بە جێگە، گواستنەوەی کاڵا، کرێی ئۆتۆمبێل، دابینکردنی خواردن-خواردنەوە و بەکارهێنانی کاتی بەتاڵ، کە دەبێت لە بەروار یان ماوەیەکی دیاریکراودا ئەنجام بدرێن،",
  },
  s5_body1_post: {
    TR: "Alıcı, cayma hakkını kullanamaz. Bu kapsamda, belirli bir tarihe bağlı seyahat paketlerinde yasal cayma hakkı istisnası uygulanabilir.",
    DE: "kein Widerrufsrecht ausüben. In diesem Zusammenhang kann bei terminorientierten Reisepaketen die gesetzliche Ausnahme vom Widerrufsrecht gelten.",
    EN: "In this context, the statutory exception to the right of withdrawal may apply to date-bound travel packages.",
    KU: "nikare mafê vegerandinê bi kar bîne. Di vê çarçoveyê de, ji bo pakêtên gerê yên girêdayî rojeke diyarkirî, îstîsnaya qanûnî ya mafê vegerandinê dikare were sepandin.",
    CKB: "لەم چوارچێوەیەدا، دەرچوونی یاسایی لە مافی هەڵوەشاندنەوە دەکرێت بۆ پاکێجی گەشتی بەروار-گیراو جێبەجێ بکرێت.",
  },
  s5_body2_pre: {
    TR: "Bununla birlikte, iptal ve iade talepleriniz",
    DE: "Ihre Stornierungs- und Rückerstattungsanfragen werden jedoch im Rahmen der auf unserer",
    EN: "That said, your cancellation and refund requests are evaluated under the commercial terms set out on our",
    KU: "Lêbelê, daxwazên we yên betalkirin û vegerandinê, li gorî mercên bazirganî yên li",
    CKB: "لەگەڵ ئەوەشدا، داواکارییەکانتان بۆ هەڵوەشاندنەوە و گەڕاندنەوەی پارە، بەپێی مەرجە بازرگانییەکانی لە پەڕەی",
  },
  s5_body2_link: { TR: "İptal ve İade Politikası", DE: "Stornierungsrichtlinie", EN: "Cancellation and Refund Policy", KU: "rûpela Polîtîkaya Betalkirin û Vegerandinê", CKB: "سیاسەتی هەڵوەشاندنەوە و گەڕاندنەوەی پارە" },
  s5_body2_post: {
    TR: "sayfamızda belirtilen ticari koşullar çerçevesinde değerlendirilir.",
    DE: "genannten kommerziellen Bedingungen bearbeitet.",
    EN: "page.",
    KU: "diyarkirî tên nirxandin.",
    CKB: "دیاریکراومان هەڵدەسەنگێنرێن.",
  },
  s6_title: { TR: "6. Hizmetin İfası", DE: "6. Erbringung der Leistung", EN: "6. Performance of the Service", KU: "6. Pêkanîna Karûbarê", CKB: "٦. جێبەجێکردنی خزمەتگوزاری" },
  s6_body: {
    TR: "Hizmet, sipariş onayında belirtilen tarih ve koşullarda ifa edilir. Mücbir sebepler (doğal afet, hava koşulları, resmi makam kararları vb.) nedeniyle hizmetin ifa edilememesi halinde Alıcı bilgilendirilir ve alternatif tarih veya iade seçenekleri sunulur.",
    DE: "Die Leistung wird zu dem in der Bestellbestätigung angegebenen Termin und unter den dort genannten Bedingungen erbracht. Kann die Leistung aufgrund höherer Gewalt (Naturkatastrophen, Wetterbedingungen, behördliche Entscheidungen usw.) nicht erbracht werden, wird der Käufer informiert und es werden alternative Termine oder Rückerstattungsoptionen angeboten.",
    EN: "The Service is performed on the date and under the conditions specified in the order confirmation. If the Service cannot be performed due to force majeure (natural disasters, weather conditions, official decisions, etc.), the Buyer is notified and offered alternative dates or refund options.",
    KU: "Karûbar, di roj û mercên ku di piştrastkirina sîparîşê de hatine diyarkirin de tê pêkanîn. Heke ji ber sedemên bêserûber (karesatên xwezayî, rewşa hewayê, biryarên fermî hwd.) Karûbar nikaribe were pêkanîn, Kirrîkar tê agahdarkirin û vebijarkên rojeke din an vegerandinê tên pêşkêşkirin.",
    CKB: "خزمەتگوزارییەکە لە بەروار و مەرجەکانی دیاریکراو لە پشتڕاستکردنەوەی داواکاریدا جێبەجێ دەکرێت. ئەگەر بەهۆی هۆکاری زۆرەملێ (کارەساتی سروشتی، بارودۆخی کەشوهەوا، بڕیاری فەرمی هتد) خزمەتگوزارییەکە جێبەجێ نەکرێت، کڕیار ئاگادار دەکرێتەوە و بەروار یان گەڕاندنەوەی پارەی بەدیل پێشکەش دەکرێت.",
  },
  s7_title: { TR: "7. Alıcının Beyanı", DE: "7. Erklärung des Käufers", EN: "7. Buyer's Declaration", KU: "7. Daxuyaniya Kirrîkar", CKB: "٧. ڕایگەیاندنی کڕیار" },
  s7_body: {
    TR: "Alıcı, sipariş öncesinde paket içeriği, fiyatı, ödeme şekli, ifa koşulları ile iptal/iade şartları hakkında ön bilgilendirme aldığını, bu bilgileri elektronik ortamda teyit ettiğini ve sözleşmeyi kurduğunu kabul eder.",
    DE: "Der Käufer bestätigt, dass er vor der Bestellung vorab über Paketinhalt, Preis, Zahlungsweise, Erfüllungsbedingungen sowie Stornierungs-/Rückerstattungsbedingungen informiert wurde, diese Informationen elektronisch bestätigt hat und den Vertrag abgeschlossen hat.",
    EN: "The Buyer acknowledges having received prior information about the package content, price, payment method, performance conditions, and cancellation/refund terms before ordering, having confirmed this information electronically, and having thereby concluded the agreement.",
    KU: "Kirrîkar dipejirîne ku berî sîparîşê der barê naveroka pakêtê, buha, awayê dayînê, mercên pêkanînê û mercên betalkirin/vegerandinê de pêşagahî wergirtiye, ev agahî bi awayekî elektronîkî piştrast kiriye û peyman pêk aniye.",
    CKB: "کڕیار پەسەند دەکات کە پێش داواکاریی، پێشوەخت زانیاریی سەبارەت بە ناوەڕۆکی پاکێج، نرخ، شێوازی پارەدان، مەرجەکانی جێبەجێکردن و مەرجەکانی هەڵوەشاندنەوە/گەڕاندنەوەی پارەی وەرگرتووە، ئەم زانیارییانەی بە شێوەی ئەلیکترۆنی پشتڕاست کردووەتەوە و پەیمانەکەی گەیاندووەتە سەرئەنجام.",
  },
  s8_title: { TR: "8. Kişisel Verilerin Korunması", DE: "8. Schutz personenbezogener Daten", EN: "8. Protection of Personal Data", KU: "8. Parastina Daneyên Kesane", CKB: "٨. پاراستنی داتای کەسی" },
  s8_body_pre: {
    TR: "Alıcı'nın paylaştığı kişisel veriler",
    DE: "Die vom Käufer geteilten personenbezogenen Daten werden im Rahmen unserer",
    EN: "Personal data shared by the Buyer is processed under our",
    KU: "Daneyên kesane yên ku Kirrîkar parve dike, li gorî",
    CKB: "داتا کەسییەکانی کە کڕیار بڵاوی دەکاتەوە، لە چوارچێوەی",
  },
  s8_body_link: { TR: "Gizlilik Politikası", DE: "Datenschutzerklärung", EN: "Privacy Policy", KU: "Polîtîkaya Nihêniyê", CKB: "سیاسەتی تایبەتمەندیمان" },
  s8_body_post: {
    TR: "kapsamında işlenir.",
    DE: "verarbeitet.",
    EN: "page.",
    KU: "tên şixulandin.",
    CKB: "پرۆسێس دەکرێن.",
  },
  s9_title: { TR: "9. Uyuşmazlıkların Çözümü", DE: "9. Streitbeilegung", EN: "9. Dispute Resolution", KU: "9. Çareseriya Nakokiyan", CKB: "٩. چارەسەری ناکۆکی" },
  s9_body: {
    TR: "Bu sözleşmeden kaynaklanan uyuşmazlıklarda, Alıcı'nın ikametgâhının bulunduğu yerdeki Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.",
    DE: "Für Streitigkeiten aus diesem Vertrag sind die Verbraucherschiedsstellen und Verbrauchergerichte am Wohnsitz des Käufers zuständig.",
    EN: "For disputes arising from this agreement, the Consumer Arbitration Committees and Consumer Courts at the Buyer's place of residence have jurisdiction.",
    KU: "Ji bo nakokiyên ku ji vê peymanê derdikevin, Encûmenên Hakemiya Xerîdaran û Dadgehên Xerîdaran ên li cîhê niştecihbûna Kirrîkar salahîyetdar in.",
    CKB: "بۆ ناکۆکییەکانی سەرچاوەیان لەم پەیمانەوەیە، دەستەکانی هاکەمیی خەرجدار و دادگاکانی خەرجدار لە شوێنی نیشتەجێبوونی کڕیار دەسەڵاتدارن.",
  },
  s10_title: { TR: "10. Yürürlük", DE: "10. Inkrafttreten", EN: "10. Effective Date", KU: "10. Derketina Meriyetê", CKB: "١٠. جێبەجێبوون" },
  s10_body: {
    TR: "Bu sözleşme, Alıcı'nın sipariş onayı sırasında elektronik olarak kabul etmesiyle yürürlüğe girer.",
    DE: "Dieser Vertrag tritt in Kraft, sobald der Käufer ihn bei der Bestellbestätigung elektronisch akzeptiert.",
    EN: "This agreement takes effect once the Buyer accepts it electronically at the time of order confirmation.",
    KU: "Ev peyman, dema ku Kirrîkar wê di dema piştrastkirina sîparîşê de bi awayekî elektronîkî qebûl bike, derdikeve meriyetê.",
    CKB: "ئەم پەیمانە، کاتێک کڕیار لە کاتی پشتڕاستکردنەوەی داواکاریدا بە شێوەی ئەلیکترۆنی پەسەندی دەکات، دەخرێتە جێبەجێکردن.",
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
    alternates: { canonical: canonicalForLang("/mesafeli-satis-sozlesmesi", urlLang), languages: buildAlternates("/mesafeli-satis-sozlesmesi") },
  };
}

export default async function MesafeliSatisSozlesmesiPage() {
  const lang = await getLang();

  return (
    <LegalLayout title={tt("title", lang)} updatedDate="2026-06-28" lang={lang}>
      <p>{tt("intro", lang)}</p>

      <h2>{tt("s1_title", lang)}</h2>
      <h3>{tt("seller_title", lang)}</h3>
      <p>
        {tt("unvan_label", lang)}: Narin Kalçık ({lang === "DE" ? "Einzelunternehmen" : lang === "EN" ? "sole proprietorship" : lang === "KU" ? "karsaziya takekesî" : lang === "CKB" ? "کارگێڕی تاکەکەسی" : "şahıs işletmesi"})
        <br />
        {tt("address_label", lang)}: Akköprü Mahallesi, Orta Sokak No: 68, Tuşba/Van, Türkiye
        <br />
        {tt("tax_label", lang)}: Van Vergi Dairesi Müdürlüğü / 4910418681
        <br />
        {tt("email_label", lang)}: <a href="mailto:info@visitvam.com">info@visitvam.com</a>
        <br />
        {tt("phone_label", lang)}: <a href="tel:+905436837978">+90 543 683 7978</a>
      </p>
      <p style={{ fontSize: 13.5 }}>
        {tt("impressum_note", lang)}{" "}
        <a href="/impressum">{tt("impressum_link_text", lang)}</a>{" "}
        {tt("impressum_note_suffix", lang)}
      </p>

      <h3>{tt("buyer_title", lang)}</h3>
      <p>{tt("buyer_body", lang)}</p>

      <h2>{tt("s2_title", lang)}</h2>
      <p>{tt("s2_body", lang)}</p>

      <h2>{tt("s3_title", lang)}</h2>
      <p>{tt("s3_body", lang)}</p>

      <h2>{tt("s4_title", lang)}</h2>
      <p>{tt("s4_body", lang)}</p>

      <h2>{tt("s5_title", lang)}</h2>
      <p>
        {tt("s5_body1_pre", lang)} <strong>{tt("s5_body1_strong", lang)}</strong> {tt("s5_body1_post", lang)}
      </p>
      <p>
        {tt("s5_body2_pre", lang)}{" "}
        <a href="/iptal-iade-politikasi">{tt("s5_body2_link", lang)}</a>{" "}
        {tt("s5_body2_post", lang)}
      </p>

      <h2>{tt("s6_title", lang)}</h2>
      <p>{tt("s6_body", lang)}</p>

      <h2>{tt("s7_title", lang)}</h2>
      <p>{tt("s7_body", lang)}</p>

      <h2>{tt("s8_title", lang)}</h2>
      <p>
        {tt("s8_body_pre", lang)}{" "}
        <a href="/gizlilik-politikasi">{tt("s8_body_link", lang)}</a>{" "}
        {tt("s8_body_post", lang)}
      </p>

      <h2>{tt("s9_title", lang)}</h2>
      <p>{tt("s9_body", lang)}</p>

      <h2>{tt("s10_title", lang)}</h2>
      <p>{tt("s10_body", lang)}</p>
    </LegalLayout>
  );
}
