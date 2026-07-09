// Bu dosya, ilk veritabanı kurulumunda (tablo boşsa) destinations ve
// bundles tablolarını mevcut içerikle dolduran tohum (seed) verisini içerir.
// Admin panelinden bu içerikler düzenlenebilir/silinebilir — bu sadece
// başlangıç noktasıdır, ileride buradaki dosyayı değiştirmenin bir etkisi
// olmaz (tablo bir kez doldurulduktan sonra tekrar çalışmaz).

export interface SeedDestination {
  slug: string;
  name: string;
  region: string;
  era: string | null;
  eraDisplay: string | null;
  eraCaption: string | null;
  unesco: boolean;
  tags: string[];
  imageUrl: string | null;
  rating: number | null;
  reviews: number | null;
  history: string[];
  features: { title: string; body: string }[];
  visitLocation: string | null;
  visitNearestCity: string | null;
  visitDuration: string | null;
  visitBestTime: string | null;
  related: string[];
  translations?: Partial<
    Record<
      "DE" | "EN" | "KU" | "CKB",
      {
        name?: string;
        region?: string;
        eraDisplay?: string;
        eraCaption?: string;
        history?: string[];
        features?: { title: string; body: string }[];
      }
    >
  >;
}

export interface SeedBundle {
  slug: string;
  title: string;
  imageUrl: string | null;
  description: string;
  nights: number;
  destinations: string[];
  price: number;
  originalPrice: number | null;
  includes: string[];
  badge: string | null;
  translations?: Partial<Record<"DE" | "EN" | "KU", { title?: string; description?: string; includes?: string[]; badge?: string }>>;
}

export const SEED_DESTINATIONS: SeedDestination[] = [
  {
    "slug": "gobeklitepe",
    "name": "Göbeklitepe",
    "region": "Şanlıurfa",
    "era": "M.Ö. ~9600",
    "eraDisplay": "M.Ö. 9600",
    "eraCaption": "Tahmini Tarih",
    "translations": {
      "DE": {
        "region": "Şanlıurfa",
        "eraDisplay": "9600 v. Chr.",
        "eraCaption": "Geschätztes Datum",
        "history": [
          "Göbeklitepe ist eine archäologische Stätte auf einem Hügel etwa 15 Kilometer nordöstlich von Şanlıurfa, nahe dem Dorf Örencik. Die Bauwerke werden auf 9600-7300 v. Chr. datiert, also etwa 11.000-12.000 Jahre vor unserer Zeit — was den Ort zum ältesten bekannten monumentalen Tempelkomplex macht.",
          "Die Stätte wurde erstmals 1963 bei einer gemeinsamen Oberflächenuntersuchung der Universitäten Istanbul und Chicago entdeckt, ihre wahre Bedeutung zeigte sich jedoch erst durch die 1995 vom deutschen Archäologen Klaus Schmidt begonnenen Ausgrabungen. Schmidts Funde kehrten die bis dahin akzeptierte Reihenfolge \"erst Landwirtschaft, dann Tempel\" um: Hier wurden monumentale Bauwerke gefunden, die von Jäger- und Sammlergesellschaften errichtet wurden, bevor Landwirtschaft und sesshaftes Leben begannen.",
          "Göbeklitepe wurde 2018 in die UNESCO-Welterbeliste aufgenommen. Bislang wurden sechs monumentale Bauwerke freigelegt, doch geomagnetische Untersuchungen deuten darauf hin, dass es insgesamt fast zwanzig sein könnten."
        ],
        "features": [
          { "title": "T-förmige Pfeiler", "body": "Im Zentrum der bis zu 30 Meter großen kreisförmigen/ovalen Bauten stehen Kalksteinsäulen von bis zu 5 Metern Höhe. Archäologen zufolge stellen diese Säulen stilisierte menschliche Figuren dar." },
          { "title": "Tierreliefs", "body": "Auf den Säulen sind Tierfiguren wie Schlangen, Skorpione, Füchse und Wildschweine im Relief dargestellt." },
          { "title": "Bau vor der Landwirtschaft", "body": "Die Erbauer betrieben noch keine Landwirtschaft — ein Beleg dafür, dass organisierte Gemeinschaftsarbeit schon vor der Landwirtschaft möglich war." },
          { "title": "Absichtliche Verfüllung", "body": "Die Bauwerke wurden zu einem bestimmten Zeitpunkt absichtlich mit Erde und Schutt verfüllt; der Grund dafür ist bis heute umstritten." }
        ]
      },
      "EN": {
        "region": "Şanlıurfa",
        "eraDisplay": "9600 BCE",
        "eraCaption": "Estimated Date",
        "history": [
          "Göbeklitepe is an archaeological site atop a hill about 15 kilometers northeast of Şanlıurfa, near the village of Örencik. The structures are believed to date to 9600-7300 BCE — roughly 11,000 to 12,000 years ago — making it the oldest known monumental temple complex.",
          "The site was first noticed in 1963 during a joint survey by Istanbul and Chicago universities, but its true significance emerged only with the excavations begun in 1995 by German archaeologist Klaus Schmidt. Schmidt's findings reversed the long-accepted order of \"farming first, then temples\": monumental structures were found here that were built by hunter-gatherer communities before farming and settled life began.",
          "Göbeklitepe was inscribed on the UNESCO World Heritage List in 2018. Six monumental structures have been uncovered so far, though geomagnetic surveys suggest the total could be close to twenty."
        ],
        "features": [
          { "title": "T-shaped pillars", "body": "At the center of circular/oval structures up to 30 meters in diameter stand limestone pillars nearly 5 meters tall. Archaeologists believe these pillars represent stylized human figures." },
          { "title": "Animal reliefs", "body": "Animal figures such as snakes, scorpions, foxes, and wild boars are carved in relief on the pillars." },
          { "title": "Built before farming", "body": "The builders were not yet practicing agriculture — evidence that organized collective work was possible before farming began." },
          { "title": "Deliberate burial", "body": "At some point the structures were deliberately buried under earth and rubble; the reason remains debated." }
        ]
      },
      "KU": {
        "region": "Riha",
        "eraDisplay": "9600 BZ",
        "eraCaption": "Dîroka Texmînî",
        "history": [
          "Gobeklîtepe, li bakurrojhilatê Rihayê, nêzî 15 kîlometreyan, li nêzî gundê Örencikê, li ser girekî cihekî arkeolojîk e. Tê texmînkirin ku avahî di navbera 9600-7300 BZ de, ango nêzî 11-12 hezar sal berê, hatine avakirin — ev jî wê dike komplekseke perestgehê ya herî kevn a naskirî.",
          "Cih cara yekem di sala 1963an de, di lêkolîna rûerdê ya hevbeş a zanîngehên Stenbol û Chicagoyê de hate dîtin, lê girîngiya wê ya rastîn bi kolanên ku arkeologê alman Klaus Schmidt di sala 1995an de dest pê kirin diyar bû. Dîtinên Schmidt rêza \"pêşî çandinî, paşê perestgeh\" ya heta wê demê pejirandî berevajî kir: li vir, berî ku çandinî û jiyana bicihbûyî dest pê bike, avahiyên mezin ên ku ji hêla civakên nêçîrvan-berhevkar ve hatine avakirin hatin dîtin.",
          "Gobeklîtepe di sala 2018an de ket Lîsteya Mîrateya Cîhanê ya UNESCOyê. Heta niha şeş avahiyên mezin derketine ronahiyê, lê lêkolînên jeomanyetîk destnîşan dikin ku hejmara giştî dikare nêzî bîstî be."
        ],
        "features": [
          { "title": "Stûnên bi şeklê T", "body": "Di navenda avahiyên gilover/oval ên bi qonaxa 30 metreyan de, stûnên kevirê şilûtê yên nêzî 5 metreyan bilind cih digirin. Li gorî arkeologan, van stûnan wêneyên mirovî yên stîlîzekirî temsîl dikin." },
          { "title": "Kelûşên heywanan", "body": "Li ser stûnan, wêneyên heywanan ên wek mar, dûpişk, rovî û berazê kovî bi teknîka kelûşê hatine xêzkirin." },
          { "title": "Avakirina berî çandiniyê", "body": "Avakerên vê avahiyê hêj bi çandiniyê re nebûn; ev nîşan dide ku xebata civakî ya organîzekirî berî çandiniyê jî pêkan bû." },
          { "title": "Veşartina bi mebest", "body": "Avahî di xalek de bi mebest bi ax û bermayiyan hatine veşartin; sedema vê hîn jî nakok e." }
        ]
      },
      "CKB": {
        "history": [
          "گۆبەکلیتەپە، لە باکووری ڕۆژهەڵاتی شانلیئۆرفا، نزیکەی ١٥ کیلۆمەتر لە گوندی ئۆرەنجیکەوە، شوێنێکی شوێنەوارییە کە لەسەر گردێک بنیاتنراوە. پێدەچێت ئەم بیناکان لە نێوان ساڵانی ٩٦٠٠-٧٣٠٠ی پێش زایین، واتە نزیکەی ١١-١٢ هەزار ساڵ لەمەوپێش دروستکرابن — ئەمەش وای لێدەکات بە هەرە کۆنترین کۆمپلێکسی پەرستگای دیارییکراوی ناسراو.",
          "ئەم شوێنە بۆ یەکەم جار لە ساڵی ١٩٦٣دا لە توێژینەوەیەکی هاوبەشی ڕووکاری زانکۆکانی ئیستەنبوڵ و شیکاگۆدا دۆزرایەوە، بەڵام گرنگیی ڕاستەقینەی تەنها بە هەڵکۆڵینەکانی کە لە ساڵی ١٩٩٥دا لەلایەن ئارکیۆلۆژیستی ئەڵمانی کلاوس شمیدتەوە دەستی پێکرد، دەرکەوت. دۆزینەوەکانی شمیدت ئەو ڕیزبەندییەی کە هەتا ئەو کاتە پەسەندبوو \"یەکەم چاندن، پاشان پەرستگا\" بەرەوپێچ کردەوە: لێرەدا، پێش دەستپێکردنی چاندن و ژیانی نیشتەجێبوون، بیناکانی گەورە کە لەلایەن کۆمەڵگای ڕاوچی-کۆکەرەوە دروستکرابوون دۆزرانەوە.",
          "گۆبەکلیتەپە لە ساڵی ٢٠١٨دا خرایە لیستی میراتی جیهانی یۆنیسکۆ. هەتا ئێستا شەش بینای گەورە دۆزراونەتەوە، بەڵام لێکۆڵینەوە جیۆمەگنێتییەکان ئاماژە بەوە دەکەن کە کۆی گشتی لەوانەیە نزیکەی بیست بێت."
        ],
        "features": [
          { "title": "کۆڵەکە T شێوەکان", "body": "لە ناوەڕاستی بیناکانی خڕ/بێضاوی کە تیرەیان دەگاتە ٣٠ مەتر، کۆڵەکەی بەردی چیمەنتۆ کە بەرزییان نزیکەی ٥ مەتر دەبێت هەیە. بەپێی ئارکیۆلۆژیستەکان، ئەم کۆڵەکانە وێنەی مرۆڤی شێوەگۆڕدراو نیشان دەدەن." },
          { "title": "نەخشی ئاژەڵ", "body": "لەسەر کۆڵەکەکان، وێنەی ئاژەڵ وەک مار، دووپشک، ڕێوی و بەرازی کێوی بە تەکنیکی نەخشکردن دروستکراون." },
          { "title": "بنیادنان پێش چاندن", "body": "ئەوانەی ئەم بینایان بنیاد ناوە هێشتا خەریکی چاندن نەبوون؛ ئەمە پیشان دەدات کارکردنی کۆمەڵایەتیی ڕێکخراو پێش چاندن گونجاو بووە." },
          { "title": "شاردنەوەی ئەنقەست", "body": "بیناکان لە خاڵێکدا بە ئەنقەست بە خاک و بەرماوە شاردراونەتەوە؛ هۆکاری ئەمە هێشتا مشتومڕی لەسەرە." }
        ]
      }
    },
    "unesco": true,
    "tags": [
      "Arkeoloji"
    ],
    "imageUrl": "/images/destinations/gobeklitepe.webp",
    "rating": 4.9,
    "reviews": 312,
    "history": [
      "Göbeklitepe, Şanlıurfa'nın yaklaşık 15 kilometre kuzeydoğusunda, Örencik köyü yakınında yer alan bir tepe üzerindeki arkeolojik alandır. Yapıların M.Ö. 9600-7300 yılları arasına, yani günümüzden aşağı yukarı 11-12 bin yıl öncesine tarihlendiği düşünülüyor — bu da onu bilinen en eski anıtsal tapınak kompleksi yapıyor.",
      "Alan ilk kez 1963'te İstanbul ve Chicago üniversitelerinin ortak yüzey araştırmasında fark edildi, ancak gerçek önemi 1995'te Alman arkeolog Klaus Schmidt'in başlattığı kazılarla ortaya çıktı. Schmidt'in bulguları, o döneme kadar kabul gören \"önce tarım, sonra tapınak\" sıralamasını tersine çevirdi: burada henüz tarım ve yerleşik hayat başlamadan, avcı-toplayıcı topluluklar tarafından inşa edilmiş anıtsal yapılar bulundu.",
      "Göbeklitepe 2018 yılında UNESCO Dünya Mirası Listesi'ne alındı. Bugüne kadar altı anıtsal yapı gün yüzüne çıkarılmış olsa da, jeomanyetik araştırmalar toplam sayının yirmiye yakın olabileceğine işaret ediyor."
    ],
    "features": [
      {
        "title": "T biçimli dikilitaşlar",
        "body": "Çapları 30 metreye varan dairesel/oval yapıların ortasında, 5 metreye yaklaşan yükseklikte kireçtaşı sütunlar yer alıyor. Arkeologlara göre bu sütunlar stilize insan figürlerini temsil ediyor."
      },
      {
        "title": "Hayvan kabartmaları",
        "body": "Sütunlar üzerinde yılan, akrep, tilki, yaban domuzu gibi hayvan figürleri kabartma tekniğiyle işlenmiş."
      },
      {
        "title": "Tarım öncesi inşa",
        "body": "Yapıyı inşa edenler henüz tarımla uğraşmıyordu; bu, organize toplu çalışmanın tarımdan önce mümkün olduğunu gösteriyor."
      },
      {
        "title": "Kasıtlı gömülme",
        "body": "Yapılar bir noktada toprak ve molozla kasıtlı olarak gömülmüş; bunun nedeni hâlâ tartışmalı."
      }
    ],
    "visitLocation": "Şanlıurfa, Haliliye, Örencik Mahallesi",
    "visitNearestCity": "Şanlıurfa merkez (~15 km)",
    "visitDuration": "2-3 saat",
    "visitBestTime": "İlkbahar/sonbahar sabahı veya gün batımı",
    "related": [
      "harran",
      "nemrut-dagi",
      "catalhoyuk"
    ]
  },
  {
    "slug": "catalhoyuk",
    "name": "Çatalhöyük",
    "region": "Konya",
    "era": "M.Ö. ~7400",
    "eraDisplay": "M.Ö. 7400",
    "eraCaption": "Tahmini Tarih",
    "translations": {
      "DE": {
        "eraDisplay": "7400 v. Chr.",
        "eraCaption": "Geschätztes Datum",
        "history": [
          "Çatalhöyük ist eine neolithische Siedlung im Landkreis Çumra in Konya, auf dem südanatolischen Plateau, bestehend aus zwei Hügeln (Ost und West). Der Osthügel birgt 18 Siedlungsschichten aus der Zeit von 7400-6200 v. Chr.; der Westhügel gehört zur chalkolithischen Periode zwischen 6200-5200 v. Chr.",
          "Die Siedlung wurde 1958 erstmals vom britischen Archäologen James Mellaart und seinem Team entdeckt; Ausgrabungen zwischen 1961 und 1965 legten die Überreste von mehr als 160 Häusern frei. Çatalhöyük wurde 2012 in die UNESCO-Welterbeliste aufgenommen, da es einen seltenen Beleg für den Übergang vom Dorf zum städtischen Leben in einer über 2.000 Jahre andauernden Siedlung an demselben Ort liefert."
        ],
        "features": [
          { "title": "Straßenlose Stadtanlage", "body": "Die Häuser wurden aneinandergrenzend (Rücken an Rücken) gebaut; Ein- und Ausgang erfolgten nicht über Straßen, sondern über Öffnungen in den Dächern." },
          { "title": "Wandmalereien und Reliefs", "body": "Unter den Funden befinden sich Jagdszenen, Stierkopf-Reliefs (Bukranien) und geometrische Muster." },
          { "title": "Bestattungen im Hausinneren", "body": "Die Toten wurden unter den Plattformen im Hausinneren bestattet; neue Häuser wurden auf den alten errichtet, wodurch sich ein 18-schichtiger Hügel bildete." },
          { "title": "Egalitäre Siedlung", "body": "Die Bauten weisen keine architektonischen Unterschiede auf, die auf eine Hierarchie hindeuten — ein Hinweis auf die relativ egalitäre Struktur der damaligen Gesellschaft." }
        ]
      },
      "EN": {
        "eraDisplay": "7400 BCE",
        "eraCaption": "Estimated Date",
        "history": [
          "Çatalhöyük is a Neolithic settlement in the Çumra district of Konya, on the South Anatolian Plateau, made up of two mounds (East and West). The East Mound contains 18 settlement layers dating from 7400-6200 BCE; the West Mound belongs to the Chalcolithic period between 6200-5200 BCE.",
          "The settlement was first discovered in 1958 by British archaeologist James Mellaart and his team; excavations between 1961 and 1965 uncovered the remains of more than 160 houses. Çatalhöyük was inscribed on the UNESCO World Heritage List in 2012 for offering rare evidence of the transition from village to urban life in a settlement that persisted in the same place for over 2,000 years."
        ],
        "features": [
          { "title": "Streetless town plan", "body": "Houses were built adjoining one another (back to back); entry and exit were through openings in the roofs rather than streets." },
          { "title": "Wall paintings and reliefs", "body": "Hunting scenes, bull-head reliefs (bucrania), and geometric patterns are among the finds." },
          { "title": "Burials within houses", "body": "The dead were buried beneath platforms inside houses; new houses were built atop old ones, forming an 18-layer mound." },
          { "title": "Egalitarian settlement", "body": "The structures show no architectural distinction pointing to hierarchy, suggesting the relatively egalitarian structure of the society of the time." }
        ]
      },
      "KU": {
        "eraDisplay": "7400 BZ",
        "eraCaption": "Dîroka Texmînî",
        "history": [
          "Çatalhöyük, li navçeya Çumra ya Konyayê, li ser Platoya Anatolyaya Başûr, niştecihbûneke Neolîtîk e ku ji du hoyükan (Rojhilat û Rojava) pêk tê. Hoyükê Rojhilat 18 qatên niştecihbûnê yên di navbera 7400-6200 BZ de vedihewîne; Hoyükê Rojava jî ya serdema Kalkolîtîk a di navbera 6200-5200 BZ de ye.",
          "Niştecihbûn cara yekem di sala 1958an de ji hêla arkeologê brîtanî James Mellaart û tîmê wî ve hate dîtin; kolanên di navbera 1961-1965an de bermahiyên zêdetirî 160 xaniyan derxistin ronahiyê. Çatalhöyük di sala 2012an de ket Lîsteya Mîrateya Cîhanê ya UNESCOyê, çimkî di heman cihî de bêtirî 2.000 salan berdewam bûyî niştecihbûnekê, delîlek kêm a derbasbûna ji gund berbi jiyana bajarî pêşkêş dike."
        ],
        "features": [
          { "title": "Plana bajêr a bêkolan", "body": "Xanî li ser hev (pişt bi pişt) hatine avakirin; têketin-derketin ne ji kolanan, lê ji vekirinên li banan pêk dihat." },
          { "title": "Wêneyên dîwêr û kelûş", "body": "Sehneyên nêçîrê, kelûşên serê ga (bukranyum) û şêweyên geometrîk di nav berhemên dîtî de ne." },
          { "title": "Veşartina di nav xaniyan de", "body": "Miriyan li binê platformên di nav xaniyan de hatine veşartin; xaniyên nû li ser yên kevn hatine avakirin, kombûyeke 18 qatî pêk anî." },
          { "title": "Niştecihbûna wekhev", "body": "Di avahiyan de ferqeke mîmarî ya ku îşaretê bide hiyerarşiyê tune; ev jî nîşan dide ku civaka wê serdemê bi awayekî têkildar wekhev bû." }
        ]
      },
      "CKB": {
        "history": [
          "چاتالهۆیۆک، لە ناوچەی چۆمرای کۆنیا، لەسەر پلاتۆی ئەناتۆلیای باشوور، شوێنی نیشتەجێبوونێکی نیۆلیتیکە کە لە دوو گردی (ڕۆژهەڵات و ڕۆژئاوا) پێکهاتووە. گردی ڕۆژهەڵات ١٨ چینی نیشتەجێبوونی نێوان ساڵانی ٧٤٠٠-٦٢٠٠ی پێش زایین لەخۆدەگرێت؛ گردی ڕۆژئاواش سەر بە سەردەمی کالکۆلیتیکە لە نێوان ساڵانی ٦٢٠٠-٥٢٠٠ی پێش زایین.",
          "ئەم شوێنە بۆ یەکەم جار لە ساڵی ١٩٥٨دا لەلایەن ئارکیۆلۆژیستی بەریتانی جەیمس مێلائارت و تیمەکەیەوە دۆزرایەوە؛ هەڵکۆڵینەکانی نێوان ساڵانی ١٩٦١-١٩٦٥ بەرماوەی زیاتر لە ١٦٠ ماڵیان دەرخست. چاتالهۆیۆک لە ساڵی ٢٠١٢دا خرایە لیستی میراتی جیهانی یۆنیسکۆ، چونکە بەڵگەیەکی دەگمەنی گواستنەوە لە گوند بۆ ژیانی شارستانی لە شوێنێکی یەکسان کە زیاتر لە ٢٠٠٠ ساڵ بەردەوام بووە پێشکەش دەکات."
        ],
        "features": [
          { "title": "پلانی شاری بێ شەقام", "body": "خانووەکان پێکەوە بەستراونەتەوە (پشت بە پشت)؛ چوونەژوورەوە و دەرچوون لە ڕێگەی شەقامەوە نەبوو، بەڵکو لە ڕێگەی کونی سەربانەکانەوە بوو." },
          { "title": "وێنەی دیوار و نەخش", "body": "دیمەنی ڕاوکردن، نەخشی سەری گا (بوکرانیۆم) و نەخشی جیۆمەتری لەنێو دۆزراوەکاندان." },
          { "title": "شاردنەوە لەناو خانووەکان", "body": "مردووەکان لەژێر سەکۆکانی ناو خانووەکان شاردراونەتەوە؛ خانووی نوێ لەسەر ئەوانی کۆن دروستکراوە، کۆمەڵێکی ١٨ چینی پێکهێناوە." },
          { "title": "نیشتەجێبوونی یەکسان", "body": "لە بیناکاندا هیچ جیاوازیی تەلارسازی کە ئاماژە بە پلەبەندی بکات نییە؛ ئەمە ئاماژەیە بۆ پێکهاتەی نسبەتەن یەکسانی کۆمەڵگای ئەو سەردەمە." }
        ]
      }
    },
    "unesco": true,
    "tags": [
      "Arkeoloji"
    ],
    "imageUrl": "/images/destinations/catalhoyuk.jpg",
    "rating": 4.5,
    "reviews": 72,
    "history": [
      "Çatalhöyük, Konya'nın Çumra ilçesinde, Güney Anadolu Platosu'nda yer alan ve iki höyükten (Doğu ve Batı) oluşan bir Neolitik yerleşim alanıdır. Doğu Höyük M.Ö. 7400-6200 yılları arasına tarihlenen 18 yerleşim katmanı barındırıyor; Batı Höyük ise M.Ö. 6200-5200 arasındaki Kalkolitik döneme ait.",
      "Yerleşim ilk olarak 1958'de İngiliz arkeolog James Mellaart ve ekibi tarafından keşfedildi; 1961-1965 arasında yapılan kazılar 160'tan fazla evin kalıntısını ortaya çıkardı. Çatalhöyük, aynı bölgede 2.000 yıldan uzun süre devam eden bir yerleşimin, köyden kentsel hayata geçişin nadir kanıtlarından birini sunduğu için 2012'de UNESCO Dünya Mirası Listesi'ne alındı."
    ],
    "features": [
      {
        "title": "Sokaksız kent planı",
        "body": "Evler birbirine bitişik (sırt sırta) inşa edilmiş; giriş-çıkış sokaklardan değil, çatılardaki açıklıklardan sağlanıyor."
      },
      {
        "title": "Duvar resimleri ve kabartmalar",
        "body": "Av sahneleri, boğa başı kabartmaları (bukranyum) ve geometrik desenler eserlerin arasında."
      },
      {
        "title": "Ev içi gömüler",
        "body": "Ölüler, evlerin içindeki platformların altına gömülmüş; yeni evler eskilerinin üzerine inşa edilerek 18 katmanlık bir yığın oluşmuş."
      },
      {
        "title": "Eşitlikçi yerleşim",
        "body": "Yapılarda hiyerarşiye işaret eden bir mimari fark yok; bu, dönem toplumunun görece eşitlikçi yapısına işaret ediyor."
      }
    ],
    "visitLocation": "Konya, Çumra ilçesi, Küçükköy Mahallesi",
    "visitNearestCity": "Konya merkez (~52 km), Çumra (~10 km)",
    "visitDuration": "1.5-2 saat",
    "visitBestTime": "Nisan-Ekim arası gündüz saatleri",
    "related": [
      "gobeklitepe",
      "harran"
    ]
  },
  {
    "slug": "harran",
    "name": "Harran",
    "region": "Şanlıurfa",
    "era": "Neolitik – Antik",
    "eraDisplay": "M.Ö. 6. yy",
    "eraCaption": "Erken Yerleşim",
    "translations": {
      "DE": {
        "region": "Şanlıurfa",
        "eraDisplay": "6. Jh. v. Chr.",
        "eraCaption": "Frühe Besiedlung",
        "history": [
          "Harran ist ein Landkreis südlich von Şanlıurfa, nahe der syrischen Grenze. Sein Name, der im Sumerischen und Akkadischen \"Karawanen-/Reiseweg\" bedeutet, lag in der Antike am Kreuzungspunkt der Handelswege zwischen Anatolien, Syrien und Mesopotamien. Seit den Sumerern, Assyrern, Babyloniern und Hethitern besiedelt, wurde Harran 744 kurzzeitig Hauptstadt des Umayyaden-Kalifats.",
          "Im Mittelalter war die Stadt ein bedeutendes Wissenschaftszentrum — der Name der Harran-Universität hält dieses Erbe lebendig. Heute ist sie vor allem für ihre kegelförmigen Kuppelhäuser bekannt, die bis ins 6. Jahrhundert v. Chr. zurückreichen und eine der ältesten Haustraditionen der Welt bewahren."
        ],
        "features": [
          { "title": "Kegelförmige Kuppelhäuser", "body": "Jede Kuppel steht für einen Raum; die Anzahl der Kuppeln zeigte den Wohlstand der Familie an. Da es keine Fenster oder Glas gab, blieben die Kuppelspitzen offen, um Licht und Rauch entweichen zu lassen." },
          { "title": "Festung von Harran", "body": "Das Verteidigungsbauwerk der Stadt trägt Spuren von Reparaturen aus verschiedenen Epochen." },
          { "title": "Ruinen der Ulu-Moschee", "body": "Eine der ältesten Moscheen Anatoliens, erbaut im 8. Jahrhundert unter den Umayyaden." },
          { "title": "Antike Universitätsruinen", "body": "Reste der einst bedeutenden Lehr- und Übersetzungsstätte, die im Mittelalter griechisches und persisches Wissen bewahrte." }
        ]
      },
      "EN": {
        "eraDisplay": "6th century BCE",
        "eraCaption": "Early Settlement",
        "history": [
          "Harran is a district south of Şanlıurfa, close to the Syrian border. Its name, meaning \"caravan/travel route\" in Sumerian and Akkadian, sat at the crossroads of Anatolian-Syrian-Mesopotamian trade routes in antiquity. Settled since the time of the Sumerians, Assyrians, Babylonians, and Hittites, Harran briefly became the capital of the Umayyad Caliphate in 744.",
          "The city was an important center of learning in the Middle Ages; the name of Harran University keeps this legacy alive. Today it is best known for its beehive-domed houses, a tradition dating back to the 6th century BCE and one of the oldest conical-dome house traditions in the world."
        ],
        "features": [
          { "title": "Beehive-domed houses", "body": "Each dome represents a room; the number of domes indicated a family's wealth. With no windows or glass, the domes' tops were left open to let light and smoke escape." },
          { "title": "Harran Castle", "body": "The city's defensive structure bears traces of repairs from different periods." },
          { "title": "Ruins of the Great Mosque", "body": "One of the oldest mosques in Anatolia, built in the 8th century under the Umayyads." },
          { "title": "Ancient university ruins", "body": "Remains of what was once an important center of teaching and translation, preserving Greek and Persian knowledge in the Middle Ages." }
        ]
      },
      "KU": {
        "region": "Riha",
        "eraDisplay": "Sedsala 6. BZ",
        "eraCaption": "Niştecihbûna Destpêkê",
        "history": [
          "Herran, navçeyek li başûrê Rihayê ye, nêzî sînorê Sûriyeyê. Bi navê xwe yê ku bi Sumerî û Akadî tê wateya \"riya kerwan/rêwîtiyê\", di serdema kevn de li xala hevbeşiya rêyên bazirganiyê yên Anatolya-Sûriye-Mezopotamyayê bû. Herran ku ji serdema Sumeran, Asûrî, Babîlî û Hîtîtiyan ve niştecihbûyî bû, di sala 744an de ji bo demeke kurt bû paytexta Dewleta Emewiyan.",
          "Bajêr di serdema navîn de navendeke zanistî ya girîng bû; navê Zanîngeha Herranê jî vê mîratê zindî digire. Îro herî zêde bi xaniyên xwe yên kombeta konîk tê naskirin ku heta sedsala 6. BZ dirêj dibin û yek ji kevntirîn kevneşopiyên xaniyên konîk ên cîhanê diparêzin."
        ],
        "features": [
          { "title": "Xaniyên kombeta konîk", "body": "Her kombet ji bo odeyekê ye; hejmara kombetan rewşa aborî ya malbatê nîşan dida. Ji ber ku pace û camê tunebû, serê kombetan vekirî hatine hiştin da ku ronahî û dûmanê derkeve." },
          { "title": "Kela Herranê", "body": "Avahiya parastina bajêr, şopên tamîrkirinê yên ji serdemên cuda hildigire." },
          { "title": "Kavilên Mizgefta Mezin", "body": "Yek ji mizgeftên herî kevn ên Anatolyayê, di sedsala 8. de di bin Emewiyan de hatiye avakirin." },
          { "title": "Kavilên zanîngeha kevnar", "body": "Bermahiyên navendeke fêrkirin û wergerandinê ya girîng, ku di serdema navîn de zanîna Yewnanî û Farisî parastiye." }
        ]
      },
      "CKB": {
        "history": [
          "حەڕان، ناوچەیەکە لە باشووری شانلیئۆرفا، لە نزیک سنووری سووریا. ناوی کە بە زمانی سومەری و ئەکەدی مانای \"ڕێگای کاروان/گەشت\" دەگەیەنێت، لە سەردەمی کۆندا لە خاچەڕێی ڕێگا بازرگانییەکانی ئەناتۆلیا-سووریا-مێزۆپۆتامیا بوو. حەڕان کە لە سەردەمی سومەری، ئاشووری، بابلی و حیتییەکانەوە نیشتەجێبوو، لە ساڵی ٧٤٤دا بۆ ماوەیەکی کورت بووە پایتەختی خەلافەتی ئومەوی.",
          "شارەکە لە سەردەمی ناوەڕاستدا ناوەندێکی زانستیی گرنگ بوو؛ ناوی زانکۆی حەڕانیش ئەم میراتە زیندوو ڕادەگرێت. ئەمڕۆ زۆرترین بە خانووە گومبەز-کۆنییەکانی دەناسرێتەوە کە دەگاتە سەدەی شەشەمی پێش زایین و یەکێکە لە کۆنترین نەریتی خانووی گومبەزی کۆنی جیهان."
        ],
        "features": [
          { "title": "خانووی گومبەز-کۆنی", "body": "هەر گومبەزێک نوێنەرایەتی ژوورێک دەکات؛ ژمارەی گومبەزەکان بارودۆخی داراییی خێزانی نیشان دەدا. لەبەر نەبوونی پەنجەرە و شووشە، سەروی گومبەزەکان کراوە هێڵدراوە بۆ دەرچوونی ڕووناکی و دووکەڵ." },
          { "title": "قەڵای حەڕان", "body": "بینای پاراستنی شارەکە شوێنی چاککردنەوەی سەردەمە جیاوازەکان هەڵدەگرێت." },
          { "title": "کاولی مزگەوتی گەورە", "body": "یەکێک لە کۆنترین مزگەوتەکانی ئەناتۆلیا، لە سەدەی ٨ لەژێر ئومەوییەکاندا بنیادنراوە." },
          { "title": "کاولی زانکۆیە کۆنەکە", "body": "بەرماوەی ئەوەی کە جارێکیان ناوەندێکی گرنگی فێرکردن و وەرگێڕان بوو، زانیاری یۆنانی و فارسی لە سەردەمی ناوەڕاستدا پاراستبوو." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Tarih"
    ],
    "imageUrl": "/images/destinations/harran.jpg",
    "rating": 4.6,
    "reviews": 98,
    "history": [
      "Harran, Şanlıurfa'nın güneyinde, Suriye sınırına yakın bir ilçedir. Sümer ve Akatça'da \"kervan / seyahat yolu\" anlamına gelen adıyla, antik çağda Anadolu-Suriye-Mezopotamya ticaret yollarının kesişim noktasında yer alıyordu. Sümerler, Asurlular, Babilliler ve Hititler döneminden beri yerleşim gören Harran, 744 yılında kısa süreliğine Emevi Devleti'nin başkenti oldu.",
      "Şehir, ortaçağda önemli bir bilim merkeziydi; Harran Üniversitesi'nin adı da bu mirası yaşatıyor. Bugün en çok, M.Ö. 6. yüzyıla kadar uzanan tarihiyle dünyanın en eski konik kubbeli ev geleneklerinden birini koruyan kümbet evleriyle tanınıyor."
    ],
    "features": [
      {
        "title": "Konik kubbeli kümbet evler",
        "body": "Her kubbe bir odayı temsil ediyor; kubbe sayısı ailenin maddi durumuna işaret ediyor. Pencere ve cam olmadığı için kubbe tepeleri açık bırakılarak ışık ve duman çıkışı sağlanmış."
      },
      {
        "title": "Harran Kalesi",
        "body": "Şehrin savunma yapısı, farklı dönemlerden onarım izleri taşıyor."
      },
      {
        "title": "Ulu Cami kalıntıları",
        "body": "İslam dünyasının ilk üniversitelerinden biri olarak kabul edilen yapının kalıntıları hâlâ ziyaret edilebiliyor."
      },
      {
        "title": "Sabiilik mirası",
        "body": "Harran, Ay tanrısı Sin'e tapan Sabiilerin 11. yüzyıla kadar varlığını sürdürdüğü bir merkezdi."
      }
    ],
    "visitLocation": "Şanlıurfa, Harran ilçesi",
    "visitNearestCity": "Şanlıurfa merkez (~45 km)",
    "visitDuration": "2-3 saat",
    "visitBestTime": "İlkbahar/sonbahar; yaz çok sıcak olabilir",
    "related": [
      "gobeklitepe",
      "nemrut-dagi"
    ]
  },
  {
    "slug": "diyarbakir",
    "name": "Diyarbakır Surları",
    "region": "Diyarbakır",
    "era": "Roma – Ortaçağ",
    "eraDisplay": "M.Ö. 4. binyıl",
    "eraCaption": "Kesintisiz Yerleşim",
    "translations": {
      "DE": {
        "name": "Mauern von Diyarbakır",
        "eraDisplay": "4. Jahrtausend v. Chr.",
        "eraCaption": "Ununterbrochene Besiedlung",
        "history": [
          "Der historische Kern von Diyarbakır, der Amida-Hügel in der Zitadelle, zeigt, dass die Stadt seit dem 6. Jahrtausend v. Chr. ununterbrochen besiedelt ist. Die ältesten bekannten Verteidigungsbauten wurden im 4. Jahrtausend v. Chr. von den Hurritern errichtet; die Grundlagen der heutigen Stadtmauern wurden unter dem römischen Kaiser Konstantius II. (4. Jahrhundert) gelegt.",
          "In den folgenden Jahrhunderten durchlief die Stadt römische, sassanidische, byzantinische, umayyadische, abbasidische, marwanidische, seldschukische, artukidische, akkoyunlu, safawidische und osmanische Herrschaft — jede hinterließ ihre Spuren an den Mauern und in der Stadt. Die Festung von Diyarbakır und die Hevsel-Gärten wurden 2015 als \"Kulturlandschaft\" in die UNESCO-Welterbeliste aufgenommen."
        ],
        "features": [
          { "title": "5.800 Meter Stadtmauer", "body": "Nach der Chinesischen Mauer gilt sie als eine der längsten erhaltenen Stadtmauern der Welt; sie trägt 82 Türme und Inschriften aus 63 verschiedenen Epochen." },
          { "title": "Hevsel-Gärten", "body": "Rund 700 Hektar landwirtschaftliche und naturbelassene Fläche zwischen Tigris und Stadtmauer; Heimat von mehr als 180 Vogelarten." },
          { "title": "Zehnbogenbrücke", "body": "Die historische Brücke über den Tigris ist mit dem Wasser- und Verkehrssystem der Stadt verbunden." },
          { "title": "Mehrschichtige Architektur", "body": "Innerhalb derselben Stadtmauer stehen Bauten aus römischer, artukidischer, akkoyunlu und osmanischer Zeit nebeneinander." }
        ]
      },
      "EN": {
        "name": "Diyarbakır City Walls",
        "eraDisplay": "4th millennium BCE",
        "eraCaption": "Continuous Settlement",
        "history": [
          "The historic core of Diyarbakır, the Amida Mound within the citadel, shows that the city has been continuously settled since the 6th millennium BCE. The earliest known defensive structures were built by the Hurrians in the 4th millennium BCE; the foundations of today's walls were laid under Roman Emperor Constantius II in the 4th century.",
          "In the following centuries the city passed through Roman, Sassanid, Byzantine, Umayyad, Abbasid, Marwanid, Seljuk, Artuqid, Aq Qoyunlu, Safavid, and Ottoman rule — each leaving its mark on the walls and the city. Diyarbakır Fortress and the Hevsel Gardens were inscribed on the UNESCO World Heritage List in 2015 as a \"cultural landscape.\""
        ],
        "features": [
          { "title": "5,800-meter city walls", "body": "Regarded as one of the longest surviving city walls in the world after the Great Wall of China; they bear 82 towers and inscriptions from 63 different periods." },
          { "title": "Hevsel Gardens", "body": "About 700 hectares of agricultural and natural land between the Tigris and the walls; home to more than 180 bird species." },
          { "title": "Ten-Eyed Bridge", "body": "The historic bridge over the Tigris is linked to the city's water and transport systems." },
          { "title": "Multi-layered architecture", "body": "Roman, Artuqid, Aq Qoyunlu, and Ottoman-era structures stand side by side within the same walls." }
        ]
      },
      "KU": {
        "name": "Sûrên Amedê",
        "region": "Amed",
        "eraDisplay": "Hezareya 4. BZ",
        "eraCaption": "Niştecihbûna Bêrawestan",
        "history": [
          "Bingeha dîrokî ya Amedê, Girê Amîda yê di kelehê de, nîşan dide ku bajêr ji hezareya 6. BZ ve bêrawestan niştecih bûye. Avahiyên parastinê yên herî kevn ên naskirî ji hêla Hurriyan ve di hezareya 4. BZ de hatine avakirin; bingehên sûrên îro ku em dibînin di serdema Împeratorê Romayê II. Konstantînûs de (sedsala 4.) hatin danîn.",
          "Di sedsalên pêş de bajêr bi rêzê di bin serweriya Romayê, Sasaniyan, Bîzansê, Emewiyan, Abasiyan, Merwaniyan, Selçûqiyan, Artûqiyan, Akqoyûnliyan, Safewiyan û Osmaniyan re derbas bû — her yek şopa xwe li ser sûran û bajêr hişt. Kela Amedê û Baxên Hevselê di sala 2015an de wek \"herêma peyzajê ya çandî\" ket Lîsteya Mîrateya Cîhanê ya UNESCOyê."
        ],
        "features": [
          { "title": "Xeta sûran a 5.800 metre", "body": "Piştî Sûra Çînê wek yek ji sûrên herî dirêj ên li ser lingan mayî yên cîhanê tê zanîn; li ser wê 82 kulle û nivîsên ji 63 serdemên cuda hene." },
          { "title": "Baxên Hevselê", "body": "Navbera Çemê Dîcle û sûr, qadeke çandiniyê/xwezayî ya ~700 hektaran; xaniyê zêdetirî 180 celebên çûkan e." },
          { "title": "Pira Deh Çavan", "body": "Pira dîrokî ya li ser Dîcleyê, bi pergala avê û veguhastinê ya bajêr ve girêdayî ye." },
          { "title": "Mîmariya pirqat", "body": "Di heman sûr de avahiyên serdema Romayê, Artûqî, Akqoyûnlî û Osmanî li kêleka hev radiwestin." }
        ]
      },
      "CKB": {
        "history": [
          "بنەمای مێژووی ئامەد، گردی ئامیدا لەناو قەڵادا، پیشان دەدات کە شارەکە لە هەزارەی شەشەمی پێش زایینەوە بەردەوام نیشتەجێ بووە. کۆنترین بیناکانی پاراستنی ناسراو لەلایەن هوریەکانەوە لە هەزارەی چوارەمی پێش زایین دروستکراون؛ بنەمای شوورەکانی ئێستا لە سەردەمی کۆنستانتیۆسی دووەمی ئیمپراتۆری ڕۆما (سەدەی چوار) دانرا.",
          "لە سەدەکانی دواتردا شارەکە بە زنجیرەیی لەژێر دەسەڵاتی ڕۆما، ساسانی، بیزەنتی، ئومەوی، عەباسی، مەروانی، سەلجووقی، ئارتووقی، ئاق قویونلوو، سەفەوی و عوسمانیدا تێپەڕی — هەریەکەیان شوێنپێی خۆیان لەسەر شوورەکان و شارەکە بەجێهێشت. قەڵای ئامەد و باخچەکانی حەڤسەل لە ساڵی ٢٠١٥دا وەک \"دیمەنی کەلتووری\" خرایە لیستی میراتی جیهانی یۆنیسکۆ."
        ],
        "features": [
          { "title": "شوورەی ٥٨٠٠ مەتری", "body": "دوای شووری چین وەک یەکێک لە درێژترین شوورە مانگاکانی جیهان ناسراوە؛ ٨٢ قوللە و نووسینی سەردەمی جیاواز (٦٣ سەردەم) لەسەری هەیە." },
          { "title": "باخچەکانی حەڤسەل", "body": "نزیکەی ٧٠٠ هەکتار زەوی کشتوکاڵی و سروشتی لەنێوان ڕووباری دیجلە و شوورەکە؛ ماڵی زیاتر لە ١٨٠ جۆری باڵندە." },
          { "title": "پردی دە چاوی", "body": "پردە مێژووییەکەی سەر ڕووباری دیجلە، بە سیستەمی ئاو و گواستنەوەی شارەکەوە بەستراوەتەوە." },
          { "title": "تەلارسازیی فرەچین", "body": "لەناو یەک شوورەدا بیناکانی سەردەمی ڕۆما، ئارتووقی، ئاق قویونلوو و عوسمانی لەتەنیشت یەکترەوە ڕاوەستاون." }
        ]
      }
    },
    "unesco": true,
    "tags": [
      "Mimari"
    ],
    "imageUrl": "/images/destinations/diyarbakir.jpg",
    "rating": 4.7,
    "reviews": 158,
    "history": [
      "Diyarbakır'ın tarihi çekirdeği İçkale'deki Amida Höyük, kentte kesintisiz yerleşimin M.Ö. 6. binyıla kadar uzandığını gösteriyor. Bilinen en eski savunma yapıları M.Ö. 4. binyılda Hurriler tarafından inşa edilmiş; bugün gördüğümüz surların temelleri ise Roma İmparatoru II. Konstantinus döneminde (4. yüzyıl) atıldı.",
      "Sonraki yüzyıllarda kent sırasıyla Roma, Sasani, Bizans, Emevi, Abbasi, Mervani, Selçuklu, Artuklu, Akkoyunlu, Safevi ve Osmanlı hakimiyetlerinden geçti — her biri surlara ve şehre kendi izini bıraktı. Diyarbakır Kalesi ve Hevsel Bahçeleri, 2015'te UNESCO Dünya Mirası Listesi'ne \"kültürel peyzaj alanı\" olarak kaydedildi."
    ],
    "features": [
      {
        "title": "5.800 metrelik sur hattı",
        "body": "Çin Seddi'nden sonra dünyanın en uzun ayakta kalan surlarından biri olarak anılıyor; üzerinde 82 burç ve 63 farklı döneme ait yazıt bulunuyor."
      },
      {
        "title": "Hevsel Bahçeleri",
        "body": "Dicle Nehri ile sur arasında ~700 hektarlık tarımsal/doğal alan; 180'den fazla kuş türüne ev sahipliği yapıyor."
      },
      {
        "title": "On Gözlü Köprü",
        "body": "Dicle üzerindeki tarihi köprü, kentin su ve ulaşım sistemine bağlı."
      },
      {
        "title": "Çok katmanlı mimari",
        "body": "Aynı sur içinde Roma, Artuklu, Akkoyunlu ve Osmanlı dönemi yapıları yan yana duruyor."
      }
    ],
    "visitLocation": "Diyarbakır, Sur ilçesi (Suriçi)",
    "visitNearestCity": "Diyarbakır merkez (şehrin kendisi)",
    "visitDuration": "Yarım gün (3-4 saat)",
    "visitBestTime": "İlkbahar/sonbahar; gün batımı sur üzerinden izlenebilir",
    "related": [
      "mardin",
      "hasankeyf",
      "nemrut-dagi"
    ]
  },
  {
    "slug": "mardin",
    "name": "Mardin",
    "region": "Mardin",
    "era": "M.Ö. 4. yy – Ortaçağ",
    "eraDisplay": "M.S. 4. yy",
    "eraCaption": "İlk Kayıt",
    "translations": {
      "DE": {
        "eraDisplay": "4. Jh. n. Chr.",
        "eraCaption": "Erste Erwähnung",
        "history": [
          "Mardin liegt an den Südhängen der Mardin-Midyat-Schwelle, auf einem strategischen Bergrücken mit Blick auf die mesopotamische Ebene. Obwohl die Stadt erstmals im 4. Jahrhundert erwähnt wird, wurden im südlichen Teil des Hügels auch prähistorische Spuren gefunden. Über die Geschichte hinweg war die Stadt ein Zentrum, in dem verschiedene Religionen und Völker (Muslime, syrisch-orthodoxe Christen, Armenier, Juden) zusammenlebten.",
          "Eines der prächtigsten Bauwerke der Stadt, die Zinciriye-Medrese (Sultan-Isa-Medrese), wurde 1385 vom artukidischen Herrscher Necmeddin İsa fertiggestellt. Das 5 km von Mardin entfernte Kloster Deyrulzafaran wurde im 4. Jahrhundert gegründet und diente zwischen 1293 und 1932 als Patriarchatssitz der syrisch-orthodoxen Kirche."
        ],
        "features": [
          { "title": "Zinciriye-Medrese", "body": "Eines der Meisterwerke artukidischer Architektur; mit Innenhof, Moschee, Mausoleum und gerillten Kuppeln blickt sie auf die Ebene von Mardin." },
          { "title": "Kloster Deyrulzafaran", "body": "Historisches Zentrum der syrisch-orthodoxen Kirche; enthält einen besonderen Bereich, in dem die Gräber von 52 Patriarchen erhalten sind." },
          { "title": "Steinhaus-Architektur", "body": "Aus gelbem Kalkstein erbaute traditionelle Mardiner Häuser mit Bogenfenstern, geführt auf der vorläufigen UNESCO-Welterbeliste." },
          { "title": "Telkari-Silberfiligran", "body": "Die von syrischen Meistern entwickelte feine Silberdraht-Kunst wird bis heute in den Basaren gefertigt." }
        ]
      },
      "EN": {
        "eraDisplay": "4th century CE",
        "eraCaption": "First Record",
        "history": [
          "Mardin sits on the southern slopes of the Mardin-Midyat threshold, on a strategic ridge overlooking the Mesopotamian plain. Although first mentioned by name in the 4th century, prehistoric traces have also been found on the southern part of the hill. Throughout history the city was a center where different religions and peoples (Muslim, Syriac Christian, Armenian, Jewish) lived side by side.",
          "One of the city's most magnificent buildings, the Zinciriye (Sultan Isa) Madrasa, was completed in 1385 by the Artuqid ruler Necmeddin İsa. The Deyrulzafaran Monastery, 5 km from Mardin, was founded in the 4th century and served as the patriarchal seat of the Syriac Orthodox Church between 1293 and 1932."
        ],
        "features": [
          { "title": "Zinciriye Madrasa", "body": "One of the finest examples of Artuqid architecture; with its courtyard, mosque, mausoleum, and fluted domes, it overlooks the Mardin plain." },
          { "title": "Deyrulzafaran Monastery", "body": "The historic seat of the Syriac Orthodox Church; it contains a special section preserving the tombs of 52 patriarchs." },
          { "title": "Stone mansion architecture", "body": "Traditional Mardin houses built of yellow limestone with arched windows, listed on UNESCO's tentative heritage list." },
          { "title": "Telkari silver filigree", "body": "A fine silver-wire craft developed by Syriac artisans, still produced in the bazaars today." }
        ]
      },
      "KU": {
        "name": "Mêrdîn",
        "region": "Mêrdîn",
        "eraDisplay": "Sedsala 4. PZ",
        "eraCaption": "Tomara Yekem",
        "history": [
          "Mêrdîn, li kêleka başûr a eşîkê Mêrdîn-Midyadê, li ser pişteke stratejîk a li dûrminda deşta Mezopotamyayê ye. Her çend navê wê cara yekem di sedsala 4. de tê behskirin jî, li beşê başûr ê girê de şopên berî dîrokê jî hatine dîtin. Bajêr di dirêjahiya dîrokê de bû navendek ku ol û gelên cuda (misilman, mesîhiyên Suryanî, ermenî, cihû) li gel hev jiyan.",
          "Medresa Zinciriyê (Sultan Îsa), yek ji avahiyên herî bedew ên bajêr, di sala 1385an de ji hêla begê Artûqî Necmeddîn Îsa ve hate temam kirin. Dêra Deyrulzeferanê ya 5 km ji Mêrdînê dûr, di sedsala 4. de hate damezrandin û di navbera 1293-1932an de bû navenda patrîkxaneya Dêra Suryanî ya Kevin."
        ],
        "features": [
          { "title": "Medresa Zinciriyê", "body": "Yek ji mînakên herî bilind ên mîmariya Artûqî; bi hewş, mizgeft, tirbe û kombetên xêzkirî li ber deşta Mêrdînê radiweste." },
          { "title": "Dêra Deyrulzeferanê", "body": "Navenda dîrokî ya Dêra Suryanî ya Kevin; beşeke taybet a ku 52 gorên patrîkan tê de hatine parastin dihewîne." },
          { "title": "Mîmariya konaxên kevir", "body": "Xaniyên kevneşopî yên Mêrdînê yên ji kevirê şilûtê yê zer hatine avakirin, bi pace kevirî; di lîsteya mîrateya demkî ya UNESCOyê de cih digirin." },
          { "title": "Zîvkariya telkarî", "body": "Hunera zîvkariya têlên zirav ku ji hêla hunermendên Suryanî ve hatiye pêşxistin, îro jî hê di bazaran de tê çêkirin." }
        ]
      },
      "CKB": {
        "history": [
          "مێردین، لەسەر لاژووری باشووری بازنەی مێردین-میدیاد، لەسەر پشتێکی ستراتیژی کە تەماشای دەشتی مێزۆپۆتامیا دەکات، بنیاتنراوە. هەرچەندە ناوی بۆ یەکەم جار لە سەدەی چوارەمدا باسکراوە، بەڵام لە بەشی باشووری گردەکەشدا شوێنپێی پێش مێژوویش دۆزراوەتەوە. شارەکە بە درێژایی مێژوو بووە ناوەندێک کە ئایین و گەلانی جیاواز (موسڵمان، مەسیحیی سریانی، ئەرمەنی، جولەکە) پێکەوە تێیدا ژیاون.",
          "مەدرەسەی زنجیریە (سوڵتان عیسا)، یەکێک لە شکۆدارترین بیناکانی شار، لە ساڵی ١٣٨٥دا لەلایەن میری ئارتووقی نەجمەدین عیساوە تەواوکرا. دێری دەیرولزەعفەران کە ٥ کیلۆمەتر لە مێردینەوە دوورە، لە سەدەی چواردا دامەزرا و لە نێوان ساڵانی ١٢٩٣-١٩٣٢دا بووە ناوەندی پاتریارکخانەی کڵێسای سریانیی کۆن."
        ],
        "features": [
          { "title": "مەدرەسەی زنجیریە", "body": "یەکێک لە باشترین نموونەکانی تەلارسازیی ئارتووقی؛ بە حەوش، مزگەوت، ئارامگا و گومبەزە یاخۆرەکانیەوە تەماشای دەشتی مێردین دەکات." },
          { "title": "دێری دەیرولزەعفەران", "body": "ناوەندی مێژوویی کڵێسای سریانیی کۆن؛ بەشێکی تایبەتی تێدایە کە گۆڕی ٥٢ پاتریارک تێیدا پارێزراوە." },
          { "title": "تەلارسازیی کۆشکی بەردین", "body": "خانووە نەریتییەکانی مێردین کە لە بەردی چیمەنتۆی زەرد بنیاتنراون، بە پەنجەرەی تاقەوانی؛ لە لیستی میراتی کاتیی یۆنیسکۆدا تۆمارکراون." },
          { "title": "زیوکاریی تەلکاری", "body": "هونەری زیوکاریی تەلی باریک کە لەلایەن هونەرمەندە سریانییەکانەوە پەرەی سەندووە، هێشتا لە بازاڕەکاندا دروست دەکرێت." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Mimari",
      "Kültür"
    ],
    "imageUrl": "/images/destinations/mardin.jpg",
    "rating": 4.8,
    "reviews": 241,
    "history": [
      "Mardin, Mardin-Midyat eşiğinin güney yamaçlarında, Mezopotamya ovasına bakan stratejik bir sırt üzerinde kurulu. Adından ilk kez 4. yüzyılda bahsedilse de, tepenin güney kesiminde tarih öncesi izlere de rastlanmış. Şehir tarih boyunca farklı din ve halkların (Müslüman, Süryani Hristiyan, Ermeni, Yahudi) bir arada yaşadığı bir merkez oldu.",
      "Şehrin en görkemli yapılarından Zinciriye (Sultan İsa) Medresesi, 1385'te Artuklu Beyi Necmeddin İsa tarafından tamamlandı. Mardin'e 5 km uzaklıktaki Deyrulzafaran Manastırı ise 4. yüzyılda kuruldu ve 1293-1932 arasında Süryani Kadim Kilisesi'nin patriklik merkezi olarak hizmet verdi."
    ],
    "features": [
      {
        "title": "Zinciriye Medresesi",
        "body": "Artuklu mimarisinin zirve örneklerinden; avlu, cami, türbe ve dilimli kubbeleriyle Mardin ovasına bakıyor."
      },
      {
        "title": "Deyrulzafaran Manastırı",
        "body": "Süryani Kadim Kilisesi'nin tarihî merkezi; içinde 52 patriğin mezarının korunduğu özel bir bölüm var."
      },
      {
        "title": "Taş konak mimarisi",
        "body": "Sarı kireçtaşından inşa edilmiş, kemerli pencereli geleneksel Mardin evleri, UNESCO'nun geçici mirası listesinde."
      },
      {
        "title": "Telkari gümüş işçiliği",
        "body": "Süryani ustaların geliştirdiği ince tel gümüş işleme sanatı, bugün hâlâ çarşılarda üretiliyor."
      }
    ],
    "visitLocation": "Mardin merkez (eski şehir)",
    "visitNearestCity": "Mardin'in kendisi",
    "visitDuration": "Yarım-tam gün",
    "visitBestTime": "Her sezon; gün batımında ova manzarası özellikle etkileyici",
    "related": [
      "dara",
      "midyat",
      "diyarbakir"
    ]
  },
  {
    "slug": "nemrut-dagi",
    "name": "Nemrut Dağı",
    "region": "Adıyaman",
    "era": "M.Ö. 62",
    "eraDisplay": "M.Ö. 62",
    "eraCaption": "Anıtın İnşası",
    "translations": {
      "DE": {
        "name": "Berg Nemrut",
        "eraDisplay": "62 v. Chr.",
        "eraCaption": "Bau des Monuments",
        "history": [
          "Das Monument auf dem über 2.100 Meter hohen Gipfel des Berges Nemrut wurde von König Antiochos I. von Kommagene (70-31 v. Chr.) als sein eigenes Grab und zugleich als den Göttern geweihte Kultstätte (Hierothesion) errichten lassen. Kommagene war ein Königreich am Schnittpunkt hellenistisch-griechischer und persischer Kultur; deshalb ehrte Antiochos die Götter sowohl mit griechischen als auch mit persischen Namen.",
          "Die gewaltigen Statuen auf dem Gipfel wurden 1881 wiederentdeckt. Das Monument wurde 1987 in die UNESCO-Welterbeliste aufgenommen."
        ],
        "features": [
          { "title": "50 Meter hoher Tumulus", "body": "Ein aus zerkleinertem Kalkstein bestehender künstlicher Hügel, der höchstwahrscheinlich Antiochos' Grab birgt; bei seiner Errichtung war er rund 70 Meter hoch." },
          { "title": "Ost- und Westterrasse", "body": "Auf jeder Terrasse stehen sitzende Götterstatuen (Zeus, Apollon, Herakles, die Göttin von Kommagene) sowie die Statue des Königs selbst; ihre Höhe erreicht 8-9 Meter." },
          { "title": "Löwen- und Adlerstatuen", "body": "An den Rändern der Terrassen als Schutzfiguren aufgestellt." },
          { "title": "Sonnenauf- und -untergang", "body": "Die Köpfe der Statuen sind im Laufe der Zeit von ihren Körpern getrennt worden; besonders beim Sonnenaufgang entsteht ein dramatisches Lichtspiel." }
        ]
      },
      "EN": {
        "name": "Mount Nemrut",
        "eraDisplay": "62 BCE",
        "eraCaption": "Construction of the Monument",
        "history": [
          "The monument atop the more-than-2,100-meter summit of Mount Nemrut was built by King Antiochus I of Commagene (70-31 BCE) as both his own tomb and a sanctuary (hierothesion) dedicated to the gods. Commagene was a kingdom at the crossroads of Hellenistic Greek and Persian cultures, so Antiochus honored the gods with both Greek and Persian names.",
          "The colossal statues on the summit were rediscovered in 1881. The monument was inscribed on the UNESCO World Heritage List in 1987."
        ],
        "features": [
          { "title": "50-meter tumulus", "body": "An artificial mound of crushed limestone, most likely containing Antiochus's tomb; it stood about 70 meters high when first built." },
          { "title": "East and West terraces", "body": "Each terrace holds seated statues of the gods (Zeus, Apollo, Heracles, and the goddess of Commagene) as well as a statue of the king himself, reaching heights of 8-9 meters." },
          { "title": "Lion and eagle statues", "body": "Placed at the edges of the terraces as guardian figures." },
          { "title": "Sunrise/sunset views", "body": "The statues' heads have separated from their bodies over time; sunrise in particular creates dramatic lighting." }
        ]
      },
      "KU": {
        "name": "Çiyayê Nemrûd",
        "region": "Semsûr",
        "eraDisplay": "62 BZ",
        "eraCaption": "Avakirina Bîrdankê",
        "history": [
          "Bîrdanka li ser lûtkeya Çiyayê Nemrûd a ku ji 2.100 metreyan bilindtir e, ji hêla padîşahê Padîşahiya Kommageneyê Antîokhosê I. (70-31 BZ) ve, hem wek gora xwe hem jî wek cihek pîroz (hierothesion) ê ku ji xwedayan re hatiye veqetandin, hatiye avakirin. Kommagene padîşahiyek li xala hevbeşiya çandên Yewnaniya Helenîstîk û Farisan bû; ji ber vê yekê, Antîokhos xweda hem bi navên Yewnanî hem jî bi navên Farisî bi bîr xist.",
          "Peykerên mezin ên li lûtkeyê di sala 1881an de ji nû ve hatin dîtin. Bîrdank di sala 1987an de ket Lîsteya Mîrateya Cîhanê ya UNESCOyê."
        ],
        "features": [
          { "title": "Tûmulûsa 50 metre", "body": "Girê çêkirî yê ji kevirê şilûtê yê hûrkirî, ku bi îhtîmaleke mezin gora Antîokhos vedihewîne; dema cara yekem hatiye avakirin ~70 metre bilind bû." },
          { "title": "Teraszên Rojhilat û Rojava", "body": "Li her terasê, peykerên xwedayên rûniştî (Zeus, Apollon, Herakles, xwedawenda Kommageneyê) û peykera padîşah bi xwe hene; bilindahiya wan digihîje 8-9 metreyan." },
          { "title": "Peykerên şêr û helo", "body": "Li kêleka terasan wek fîgurên parastinê hatine bicihkirin." },
          { "title": "Dîmena rojhilatin/rojava", "body": "Serê peykeran bi demê re ji laşê xwe qetiyane; bi taybetî di rojhilatinê de ronahiyeke dramatîk pêk tê." }
        ]
      },
      "CKB": {
        "history": [
          "بیرداکەی لەسەر لووتکەی چیای نەمروود کە لە ٢١٠٠ مەتر بەرزتر بۆ دەچێت، لەلایەن پاشای شانشینی کۆماگینە ئانتیۆخۆسی یەکەم (٧٠-٣١ی پێش زایین)ەوە، هەم وەک گۆڕی خۆی و هەم وەک شوێنێکی پیرۆز (هیێرۆتێسیۆن) بۆ خواوەندەکان بنیاتنراوە. کۆماگینە شانشینێک بوو لە خاچەڕێی کەلتووری یۆنانی هەلینیستی و فارسی؛ بۆیە ئانتیۆخۆس خواوەندەکانی هەم بە ناوی یۆنانی و هەم بە ناوی فارسی ناودەبرد.",
          "پەیکەرە گەورەکانی سەر لووتکە لە ساڵی ١٨٨١دا دووبارە دۆزرانەوە. بیرداکەکە لە ساڵی ١٩٨٧دا خرایە لیستی میراتی جیهانی یۆنیسکۆ."
        ],
        "features": [
          { "title": "تومۆلووسی ٥٠ مەتری", "body": "گردێکی دەستکرد لە بەردی چیمەنتۆی وردکراو، کە بەگومانی زۆرەوە گۆڕی ئانتیۆخۆسی تێدایە؛ کاتێک یەکەم جار دروستکرا نزیکەی ٧٠ مەتر بەرز بوو." },
          { "title": "تەراسی ڕۆژهەڵات و ڕۆژئاوا", "body": "لە هەر تەراسێکدا، پەیکەری خواوەندە دانیشتووەکان (زیوس، ئەپۆلۆن، هێراکلێس، خواوەندی کۆماگینە) و پەیکەری خودی پاشا هەیە؛ بەرزییان دەگاتە ٨-٩ مەتر." },
          { "title": "پەیکەری شێر و هەڵۆ", "body": "لە قەراغی تەراسەکاندا وەک وێنەی پارێزەر دانراون." },
          { "title": "دیمەنی خۆرهەڵات/خۆرئاوابوون", "body": "سەری پەیکەرەکان بەهۆی کاتەوە لە جەستەیان جیابووەتەوە؛ بەتایبەتی لە خۆرهەڵاتندا ڕووناکییەکی درامی پێکدێت." }
        ]
      }
    },
    "unesco": true,
    "tags": [
      "Arkeoloji"
    ],
    "imageUrl": "/images/destinations/nemrut-dagi.jpg",
    "rating": 4.9,
    "reviews": 204,
    "history": [
      "Nemrut Dağı'nın 2.100 metreyi aşan zirvesindeki anıt, Kommagene Krallığı'nın hükümdarı I. Antiokhos (M.Ö. 70-31) tarafından, hem kendi mezarı hem de tanrılara adanmış bir kutsal alan (hierothesion) olarak inşa ettirildi. Kommagene, Helenistik Yunan ve Pers kültürlerinin kesiştiği bir krallıktı; bu yüzden Antiokhos, tanrıları hem Yunan hem Pers adlarıyla birlikte andırdı.",
      "Zirvedeki devasa heykeller 1881'de yeniden keşfedildi. Anıt 1987'de UNESCO Dünya Mirası Listesi'ne alındı."
    ],
    "features": [
      {
        "title": "50 metrelik tümülüs",
        "body": "Kırma kireçtaşından oluşan, büyük olasılıkla Antiokhos'un mezarını barındıran suni tepe; ilk inşa edildiğinde ~70 metre yükseklikteydi."
      },
      {
        "title": "Doğu ve Batı terasları",
        "body": "Her terasta, oturan tanrı heykelleri (Zeus, Apollon, Herakles, Kommagene tanrıçası) ve kralın kendi heykeli; yükseklikleri 8-9 metreye varıyor."
      },
      {
        "title": "Aslan ve kartal heykelleri",
        "body": "Terasların kenarlarında koruyucu figürler olarak yerleştirilmiş."
      },
      {
        "title": "Gün doğumu/batımı manzarası",
        "body": "Heykellerin başları zamanla gövdelerinden ayrılmış halde duruyor; özellikle gün doğumunda dramatik bir ışık oluşuyor."
      }
    ],
    "visitLocation": "Adıyaman, Kahta ilçesi",
    "visitNearestCity": "Adıyaman merkez (~85 km), Kahta (~50 km)",
    "visitDuration": "Yarım gün (gidiş-dönüş dahil)",
    "visitBestTime": "Gün doğumu (sabah 04:00-05:00 çıkış) veya gün batımı",
    "related": [
      "harran",
      "diyarbakir",
      "gobeklitepe"
    ]
  },
  {
    "slug": "van-kalesi",
    "name": "Van Kalesi",
    "region": "Van",
    "era": "Urartu, M.Ö. 9. yy",
    "eraDisplay": "M.Ö. 9. yy",
    "eraCaption": "Urartu Dönemi",
    "translations": {
      "DE": {
        "name": "Festung Van",
        "eraDisplay": "9. Jh. v. Chr.",
        "eraCaption": "Urartäische Epoche",
        "history": [
          "Die Festung Van ist eine Felsenfestung am Ufer des Vansees aus der Zeit des Königreichs Urartu (etwa 9. Jahrhundert v. Chr.). Die Urartäer nannten sich selbst \"Biainili\" — davon leitet sich auch der Name Van ab. Die Festung birgt mit ihren Keilschrift-Felsinschriften eine der wichtigsten schriftlichen Quellen der urartäischen Epoche.",
          "Die Alte Stadt Van am Fuß der Festung wurde bei den Ereignissen zu Beginn des 20. Jahrhunderts größtenteils zerstört und liegt heute größtenteils in Ruinen."
        ],
        "features": [
          { "title": "Urartäische Felsinschriften", "body": "An verschiedenen Stellen der Festung finden sich monumentale, in Keilschrift verfasste Inschriften." },
          { "title": "Blick auf den Vansee", "body": "Die Festung liegt an einem Punkt, der den größten See der Türkei überblickt; besonders bei Sonnenuntergang bietet sie einen berühmten Ausblick." },
          { "title": "Ruinen der Alten Stadt Van", "body": "Südlich der Festung sind Moschee- und Bauwerksreste der alten Siedlung zu sehen." },
          { "title": "Nähe zur Akdamar-Insel", "body": "Besuche der Festung Van werden häufig mit der per Boot erreichbaren Akdamar-Insel und ihrer armenischen Kirche aus dem 10. Jahrhundert verbunden." }
        ]
      },
      "EN": {
        "name": "Van Castle",
        "eraDisplay": "9th century BCE",
        "eraCaption": "Urartian Period",
        "history": [
          "Van Castle is a rock fortress on the shore of Lake Van, dating from the era of the Kingdom of Urartu (around the 9th century BCE). The Urartians called themselves \"Biainili\" — the name Van derives from this root. The castle holds one of the most important written sources of the Urartian period in its cuneiform rock inscriptions.",
          "Old Van City at the foot of the castle was largely destroyed during the events of the early 20th century and today lies mostly in ruins."
        ],
        "features": [
          { "title": "Urartian rock inscriptions", "body": "Monumental cuneiform inscriptions can be found at various points around the castle." },
          { "title": "Lake Van views", "body": "The castle stands at a point overlooking Turkey's largest lake, offering a famous view at sunset." },
          { "title": "Old Van City ruins", "body": "South of the castle, mosque and building remains from the old settlement can be seen." },
          { "title": "Proximity to Akdamar Island", "body": "Visits to Van Castle are often combined with the 10th-century Armenian church on Akdamar Island, reached by boat." }
        ]
      },
      "KU": {
        "name": "Kela Wanê",
        "region": "Wan",
        "eraDisplay": "Sedsala 9. BZ",
        "eraCaption": "Serdema Ûrartûyan",
        "history": [
          "Kela Wanê, li kêleka Gola Wanê, kelehek zinarî ye ku ji serdema Padîşahiya Ûrartûyan (nêzî sedsala 9. BZ) maye. Ûrartûyan xwe bi navê \"Biainili\" bi nav dikirin — navê Wan jî ji vê rehê tê. Kele, bi kitabeyên zinarî yên bi tîpguhezî ve, yek ji çavkaniyên nivîskî yên herî girîng ên serdema Ûrartûyan vedihewîne.",
          "Bajarê Kevn ê Wanê yê li binê kelehê, di dema bûyerên destpêka sedsala 20. de bi giranî hate hilweşandin û îro piraniya wê xerabe ye."
        ],
        "features": [
          { "title": "Kitabeyên zinarî yên Ûrartûyan", "body": "Li cihên cuda yên kelehê kitabeyên mezin ên bi tîpguhezî hatine nivîsandin, hene." },
          { "title": "Dîmena Gola Wanê", "body": "Kele li xalek e ku li ser gola herî mezin a Tirkiyeyê serwer e; di rojava de dîmeneke navdar pêşkêş dike." },
          { "title": "Kavilên Bajarê Kevn ê Wanê", "body": "Li başûrê kelehê, kavilên mizgeft û avahiyên ji niştecihbûna kevn mane, tên dîtin." },
          { "title": "Nêzîkbûna Girava Akdamarê", "body": "Serdanên Kela Wanê bi gelemperî bi dêra ermenî ya sedsala 10. ya li Girava Akdamarê, ku bi keştiyê tê gihîştin, ve tê girêdan." }
        ]
      },
      "CKB": {
        "history": [
          "قەڵای وان، لە کەناری دەریاچەی وان، قەڵایەکی بەردینە کە لە سەردەمی شانشینی ئوراردودا (نزیکەی سەدەی نۆیەمی پێش زایین) ماوەتەوە. ئوراردوییەکان بە ناوی \"بیائینیلی\" ناویان دەبرد — ناوی وانیش لەم ڕەگەزەوە دێت. قەڵاکە بە نووسینە بەردینەکانی بە خەتی بزماری، یەکێک لە گرنگترین سەرچاوە نووسراوەکانی سەردەمی ئوراردو هەڵدەگرێت.",
          "شاری کۆنی وان کە لەبن قەڵاکەدایە، لە کاتی ڕووداوەکانی سەرەتای سەدەی بیستەمدا بەگشتی ڕووخا و ئەمڕۆ زۆربەی بە کاولی ماوەتەوە."
        ],
        "features": [
          { "title": "نووسینە بەردینەکانی ئوراردو", "body": "لە شوێنی جیاجیای قەڵاکەدا نووسینی گەورە بە خەتی بزماری هەیە." },
          { "title": "دیمەنی دەریاچەی وان", "body": "قەڵاکە لە خاڵێکدایە کە تەماشای گەورەترین دەریاچەی تورکیا دەکات؛ لە کاتی خۆرئاوابووندا دیمەنێکی ناوداری هەیە." },
          { "title": "کاولی شاری کۆنی وان", "body": "لە باشووری قەڵاکە، بەرماوەی مزگەوت و بیناکانی نیشتەجێبوونی کۆن دەبیندرێت." },
          { "title": "نزیکبوونەوە لە دوورگەی ئاقدامار", "body": "سەردانی قەڵای وان زۆرجار لەگەڵ کڵێسای ئەرمەنیی سەدەی دەیەمی دوورگەی ئاقدامار کە بە بەلەم پێی دەگاتەوە، تێکەڵ دەکرێت." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Tarih"
    ],
    "imageUrl": "/images/destinations/van-kalesi.jpg",
    "rating": 4.7,
    "reviews": 186,
    "history": [
      "Van Kalesi, Van Gölü kıyısında, Urartu Krallığı (M.Ö. 9. yüzyıl civarı) döneminden kalma bir kayalık kale. Urartular kendilerini \"Biaineli\" olarak anıyordu — Van adı da bu kökten geliyor. Kale, çivi yazılı kaya kitabeleriyle Urartu döneminin önemli yazılı kaynaklarından birini barındırıyor.",
      "Kalenin eteğindeki Eski Van Şehri, 20. yüzyıl başındaki olaylar sırasında büyük ölçüde tahrip oldu ve bugün büyük kısmı harabe halinde."
    ],
    "features": [
      {
        "title": "Urartu kaya kitabeleri",
        "body": "Kalenin çeşitli noktalarında çivi yazısıyla yazılmış anıtsal yazıtlar bulunuyor."
      },
      {
        "title": "Van Gölü manzarası",
        "body": "Kale, Türkiye'nin en büyük gölüne hakim bir noktada; gün batımında ünlü bir manzara sunuyor."
      },
      {
        "title": "Eski Van Şehri kalıntıları",
        "body": "Kalenin güneyinde, eski yerleşimden kalan cami ve yapı kalıntıları görülebiliyor."
      },
      {
        "title": "Akdamar Adası'na yakınlık",
        "body": "Van Kalesi ziyaretleri genellikle tekneyle ulaşılan Akdamar Adası'ndaki 10. yüzyıl Ermeni kilisesiyle birleştiriliyor."
      }
    ],
    "visitLocation": "Van merkez",
    "visitNearestCity": "Van'ın kendisi",
    "visitDuration": "2 saat",
    "visitBestTime": "Gün batımına yakın saatler",
    "related": [
      "tatvan",
      "hakkari",
      "agri-dagi"
    ]
  },
  {
    "slug": "hasankeyf",
    "name": "Hasankeyf",
    "region": "Batman",
    "era": "10.000+ yıl",
    "eraDisplay": "M.Ö. 10.000",
    "eraCaption": "İlk İnsan İzleri",
    "translations": {
      "DE": {
        "eraDisplay": "10.000 v. Chr.",
        "eraCaption": "Früheste Spuren",
        "history": [
          "Hasankeyf ist eine uralte Siedlung am Ufer des Tigris, erbaut an einem felsigen Hang. Die frühesten menschlichen Spuren sollen bis in die neolithische Zeit, sogar bis ins Jahr 10.000 v. Chr. zurückreichen; Tausende natürliche Höhlen in der Region dienten über Jahrhunderte als Wohnraum.",
          "Die Stadt durchlief die römische, sassanidische, umayyadische, abbasidische, artukidische, ayyubidische und osmanische Epoche; besonders die artukidische und ayyubidische Zeit (12.-14. Jahrhundert) gilt als goldenes Zeitalter Hasankeyfs — damals war die Stadt mit ihren Brücken, Palästen und Medresen ein bedeutendes regionales Zentrum. Wegen des Ilısu-Staudamms steht ein Großteil des historischen Kerns seit 2019 teilweise unter Wasser; einige Denkmäler wurden an einen neuen Standort verlegt."
        ],
        "features": [
          { "title": "Tausende Höhlenwohnungen", "body": "Natürliche und von Menschenhand geschaffene Höhlen in den Felshängen; einige wurden bis ins 20. Jahrhundert als Wohnraum genutzt." },
          { "title": "Überreste der Hasankeyf-Brücke", "body": "Die Pfeiler dieser als eine der größten Brücken des Mittelalters geltenden Konstruktion stehen noch heute im Tigris." },
          { "title": "Zeynel-Bey-Mausoleum", "body": "Vom akkoyunlu Herrscher Uzun Hasan für seinen Sohn errichtetes, durch seine zylindrische Form auffallendes Mausoleum (eines der versetzten Denkmäler)." },
          { "title": "Er-Rızk-Moschee und Minarett", "body": "Auf das frühe 15. Jahrhundert datierte ayyubidische Moschee, bekannt für ihr noch erhaltenes Minarett." }
        ]
      },
      "EN": {
        "eraDisplay": "10,000 BCE",
        "eraCaption": "Earliest Traces",
        "history": [
          "Hasankeyf is an ancient settlement built on a rocky slope along the banks of the Tigris. The earliest human traces are believed to date back to the Neolithic period, possibly as far as 10,000 BCE; thousands of natural caves in the area served as dwellings for centuries.",
          "The city passed through Roman, Sassanid, Umayyad, Abbasid, Artuqid, Ayyubid, and Ottoman periods; the Artuqid and Ayyubid periods (12th-14th centuries) in particular are considered Hasankeyf's golden age — the city was then an important regional center with its bridges, palaces, and madrasas. Because of the Ilısu Dam, much of the historic core has been partially underwater since 2019; some monuments were relocated to a new site."
        ],
        "features": [
          { "title": "Thousands of cave dwellings", "body": "Natural and man-made caves in the rocky slopes; some were used as dwellings until the 20th century." },
          { "title": "Remains of Hasankeyf Bridge", "body": "The piers of what is considered one of the largest bridges of the Middle Ages still stand in the Tigris." },
          { "title": "Zeynel Bey Mausoleum", "body": "A mausoleum built by the Aq Qoyunlu ruler Uzun Hasan for his son, notable for its cylindrical form (one of the relocated monuments)." },
          { "title": "Er-Rızk Mosque and minaret", "body": "An Ayyubid-era mosque dating to the early 15th century, known for its still-standing minaret." }
        ]
      },
      "KU": {
        "name": "Heskîf",
        "region": "Elih",
        "eraDisplay": "10.000 BZ",
        "eraCaption": "Şopên Yekem",
        "history": [
          "Heskîf, li kêleka Çemê Dîcle, li ser gelîkî zinarî hatiye avakirin, niştecihbûneke kevnar e. Tê texmînkirin ku şopên yekem ên mirovan heta serdema Neolîtîk, heta 10.000 BZ dirêj dibin; bi hezaran şikeftên xwezayî yên herêmê, bi sedsalan wek war hatine bikaranîn.",
          "Bajêr ji serdemên Romayê, Sasaniyan, Emewiyan, Abasiyan, Artûqiyan, Eyûbiyan û Osmaniyan derbas bû; bi taybetî serdemên Artûqî û Eyûbî (sedsalên 12-14.) wek serdema zêrîn a Heskîfê tê pejirandin — di wê serdemê de bajêr bi pir, qesr û medreseyên xwe navendeke girîng a herêmê bû. Ji ber Bendava Ilisûyê, beşeke mezin a bingeha dîrokî ji sala 2019an ve nîvî di bin avê de ye; hin bîrdank vegoheztin cihek nû."
        ],
        "features": [
          { "title": "Bi hezaran şikeftxaniyan", "body": "Şikeftên xwezayî û çêkirî yên li gelîyên zinarî; hinek heta sedsala 20. wek war hatine bikaranîn." },
          { "title": "Kavilên Pira Heskîfê", "body": "Piyên avahiya ku wek yek ji pirên herî mezin ên serdema navîn tê zanîn, hê jî li ser Dîcleyê radiwestin." },
          { "title": "Tirba Zeynel Begê", "body": "Tirba ku ji hêla hukumdarê Akqoyûnlî Uzun Hesen ve ji bo kurê xwe hatiye çêkirin, bi forma xwe ya slîndirîk balê dikişîne (yek ji bîrdankên vegohastî)." },
          { "title": "Mizgefta Er-Rizq û minare", "body": "Mizgefta serdema Eyûbî ya ku heta destpêka sedsala 15. tê dîtin, bi minareya xwe ya hê li ser lingan tê naskirin." }
        ]
      },
      "CKB": {
        "history": [
          "حەسەنکێف، لە کەناری ڕووباری دیجلە، لەسەر لاژوورێکی بەردین بنیاتنراوە، شوێنی نیشتەجێبوونێکی کۆنە. پێدەچێت کۆنترین شوێنپێی مرۆڤ بگاتەوە سەردەمی نیۆلیتیک، تەنانەت ساڵی ١٠٠٠٠ی پێش زایین؛ هەزاران ئەشکەوتی سروشتیی ناوچەکە، بۆ سەدەها ساڵ وەک شوێنی نیشتەجێبوون بەکارهاتووە.",
          "شارەکە لە سەردەمی ڕۆما، ساسانی، ئومەوی، عەباسی، ئارتووقی، ئەیووبی و عوسمانیدا تێپەڕی؛ بەتایبەتی سەردەمی ئارتووقی و ئەیووبی (سەدەکانی ١٢-١٤) وەک سەردەمی زێڕینی حەسەنکێف دادەنرێت — لەو سەردەمەدا شارەکە بە پرد، کۆشک و مەدرەسەکانییەوە ناوەندێکی گرنگی هەرێمی بوو. لەبەر بەنداوی ئیلیسوو، بەشێکی گەورەی ناوەندی مێژووی لە ساڵی ٢٠١٩ەوە بەشێوەیەکی نیوەکی لەژێر ئاودایە؛ هەندێک بیرداک بۆ شوێنێکی نوێ گوازراونەتەوە."
        ],
        "features": [
          { "title": "هەزاران ماڵی ئەشکەوتی", "body": "ئەشکەوتی سروشتی و دەستکرد لە لاژوورە بەردینەکاندا؛ هەندێکیان هەتا سەدەی بیستەم وەک شوێنی ژیان بەکارهاتوون." },
          { "title": "کاولی پردی حەسەنکێف", "body": "پایەکانی ئەو بینایەی کە وەک یەکێک لە گەورەترین پردەکانی سەردەمی ناوەڕاست دادەنرێت، هێشتا لەسەر ڕووباری دیجلە ڕاوەستاون." },
          { "title": "ئارامگای زەینەل بەگ", "body": "ئارامگایەک کە لەلایەن فەرمانڕەوای ئاق قویونلوو ئوزون حەسەنەوە بۆ کوڕەکەی دروستکراوە، بە شێوەی سیلندریی سەرنجڕاکێشە (یەکێک لە بیرداکە گوازراوەکان)." },
          { "title": "مزگەوتی ئێر-ڕزق و منارە", "body": "مزگەوتی سەردەمی ئەیووبی کە دەگاتەوە سەرەتای سەدەی ١٥، بە منارەکەی کە هێشتا ڕاوەستاوە ناسراوە." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Tarih"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Hasankeyf, Dicle Nehri kıyısında, kayalık bir yamaçta kurulu kadim bir yerleşim. İlk insan izlerinin Neolitik döneme, hatta M.Ö. 10.000'lere kadar uzandığı düşünülüyor; bölgedeki binlerce doğal mağara, yüzyıllar boyunca konut olarak kullanıldı.",
      "Şehir Roma, Sasani, Emevi, Abbasi, Artuklu, Eyyubi ve Osmanlı dönemlerinden geçti; özellikle Artuklu ve Eyyubi dönemleri (12-14. yüzyıllar) Hasankeyf'in altın çağı olarak kabul ediliyor — o dönemde şehir köprüleri, sarayları ve medreseleriyle bölgenin önemli bir merkeziydi. Ilısu Barajı nedeniyle tarihi çekirdeğin büyük kısmı 2019'dan beri kısmen sular altında; bazı anıtlar yeni bir alana taşındı."
    ],
    "features": [
      {
        "title": "Binlerce mağara konut",
        "body": "Kayalık yamaçlarda doğal ve insan yapımı mağaralar; bazıları 20. yüzyıla kadar yaşam alanı olarak kullanıldı."
      },
      {
        "title": "Hasankeyf Köprüsü kalıntıları",
        "body": "Ortaçağın en büyük köprülerinden biri olarak kabul edilen yapının ayakları hâlâ Dicle üzerinde duruyor."
      },
      {
        "title": "Zeynel Bey Türbesi",
        "body": "Akkoyunlu hükümdarı Uzun Hasan'ın oğlu için yaptırdığı, silindirik formuyla dikkat çeken türbe (taşınan anıtlardan biri)."
      },
      {
        "title": "Er-Rızk Camii ve minare",
        "body": "15. yüzyıl başına tarihlenen, hâlâ ayakta olan minaresiyle tanınan Eyyubi dönemi camisi."
      }
    ],
    "visitLocation": "Batman, Hasankeyf ilçesi",
    "visitNearestCity": "Batman merkez (~40 km)",
    "visitDuration": "2-3 saat",
    "visitBestTime": "Sabah erken saatler (ışık ve sıcaklık için ideal)",
    "related": [
      "diyarbakir",
      "mardin",
      "dara"
    ]
  },
  {
    "slug": "dara",
    "name": "Dara Antik Kenti",
    "region": "Mardin",
    "era": "Roma, M.S. 5. yy",
    "eraDisplay": "M.S. 505",
    "eraCaption": "Kuruluş",
    "translations": {
      "DE": {
        "name": "Antike Stadt Dara",
        "eraDisplay": "505 n. Chr.",
        "eraCaption": "Gründung",
        "history": [
          "Dara (antiker Name: Anastasiopolis) wurde vom oströmischen Kaiser Anastasius I. in den Jahren 505-507 n. Chr. als Garnisonsstadt errichtet, um die Ostgrenze des Reiches gegen das Sassanidenreich zu schützen. Es wurde rasch zum Verwaltungs- und Militärzentrum Obermesopotamiens; unter Kaiser Justinian I. wurden die Mauern verstärkt und gewaltige Zisternen hinzugefügt.",
          "Die Stadt war 530 auch Schauplatz des Sieges des byzantinischen Generals Belisar über die Sassaniden. In den folgenden Jahrhunderten wechselte sie zwischen sassanidischer, byzantinischer, umayyadischer, abbasidischer, seldschukischer und osmanischer Herrschaft. Heute liegt nur etwa 10 % der Stadt an der Oberfläche, der Großteil noch unter der Erde."
        ],
        "features": [
          { "title": "Gewaltige Wasserzisternen", "body": "Eine der in Fels gehauenen Zisternen (im Volksmund \"Verlies\" genannt) fasst rund 10.000 m³ Wasser — tiefer als die Yerebatan-Zisterne in Istanbul." },
          { "title": "Wasser als Verteidigungswaffe", "body": "Die römische Garnison nutzte das Wasser der Zisternen, um Belagerungen lange standzuhalten; die Sassaniden versuchten wiederum, den Flusslauf umzuleiten, um die Stadt trockenzulegen." },
          { "title": "4 km langes Mauersystem", "body": "Eine zweischichtige, 28-türmige Verteidigungslinie aus innerer und äußerer Mauer." },
          { "title": "Galeriegräber (Nekropole)", "body": "In Fels gehauene, mehrstöckige Grabanlagen mit den Knochenresten von Tausenden Menschen." }
        ]
      },
      "EN": {
        "name": "Ancient City of Dara",
        "eraDisplay": "505 CE",
        "eraCaption": "Founding",
        "history": [
          "Dara (ancient name Anastasiopolis) was built by the Eastern Roman Emperor Anastasius I in 505-507 CE as a garrison city to protect the empire's eastern border against the Sassanid Empire. It quickly became the administrative and military center of Upper Mesopotamia; under Emperor Justinian I the walls were strengthened and massive cisterns were added.",
          "The city was also the site of Byzantine general Belisarius's victory over the Sassanids in 530. In later centuries it changed hands between Sassanid, Byzantine, Umayyad, Abbasid, Seljuk, and Ottoman rule. Today only about 10% of the city is above ground; most of it still lies buried."
        ],
        "features": [
          { "title": "Massive water cisterns", "body": "One of the rock-cut cisterns (known locally as the \"dungeon\") has a capacity of about 10,000 m³ — deeper than Istanbul's Basilica Cistern." },
          { "title": "Water as a weapon of defense", "body": "The Roman garrison used the water in the cisterns to withstand long sieges; the Sassanids, in turn, tried to divert the river's flow to leave the city without water." },
          { "title": "4-km wall system", "body": "A two-layered defensive line of inner and outer walls with 28 towers." },
          { "title": "Gallery graves (necropolis)", "body": "Multi-story, rock-cut tomb structures holding the skeletal remains of thousands of people." }
        ]
      },
      "KU": {
        "name": "Bajarê Kevnar ê Dara",
        "region": "Mêrdîn",
        "eraDisplay": "505 PZ",
        "eraCaption": "Damezrandin",
        "history": [
          "Dara (bi navê xwe yê kevn Anastasiopolis) ji hêla Împeratorê Romaya Rojhilat Anastasiûsê I. ve di navbera salên 505-507an PZ de, wek bajarekî garnîzonê ji bo parastina sînorê rojhilat ê împeratoriyê li dijî Împeratoriya Sasaniyan hate avakirin. Di demeke kurt de bû navenda îdarî û leşkerî ya Mezopotamyaya Jorîn; di serdema Împeratorê Justînianosê I. de sûr hatin xurtkirin û sarincên mezin hatin zêdekirin.",
          "Bajar di sala 530î de jî bû dîmena serkeftina generalê Bîzansê Belîsarîûs li dijî Sasaniyan. Di sedsalên pêş de di navbera serweriya Sasaniyan, Bîzansê, Emewiyan, Abasiyan, Selçûqiyan û Osmaniyan de dest guherî. Îro tenê nêzî %10ê bajêr li rûerdê ye, piraniya wê hê jî di bin axê de ye."
        ],
        "features": [
          { "title": "Sarincên mezin ên avê", "body": "Yek ji sarincên di zinaran de hatine kolan (di nav gel de wek \"zîndan\" tê zanîn) kapasîteya ~10.000 m³ avê hilgire; ev ji Sarinca Yerebatanê ya li Stenbolê kûrtir e." },
          { "title": "Av wek çeka parastinê", "body": "Garnîzona Romayê, di dema dorpêçê de ava sarincan ji bo berxwedana dirêj bi kar anî; Sasaniyan jî bi guherandina herikîna çem hewl da bajêr bêav bihêlin." },
          { "title": "Pergala sûr a 4 km", "body": "Xeteke parastinê ya du-qatî, bi 28 kulle, ku ji sûrê hundir û derve pêk tê." },
          { "title": "Goristana galerî (nekropol)", "body": "Avahiyên gorê yên pirqat, di zinaran de hatine kolan; bermahiyên hestiyan ên bi hezaran kesan vedihewîne." }
        ]
      },
      "CKB": {
        "history": [
          "دارا (بە ناوی کۆنی ئاناستاسیۆپۆلیس) لەلایەن ئیمپراتۆری ڕۆمای ڕۆژهەڵات ئاناستاسیۆسی یەکەمەوە لە نێوان ساڵانی ٥٠٥-٥٠٧ی زایین، وەک شاری گارنیزۆن بۆ پاراستنی سنووری ڕۆژهەڵاتی ئیمپراتۆرەتی بەرامبەر ئیمپراتۆریەتی ساسانی بنیادنرا. بە زووی بووە ناوەندی بەڕێوەبردن و سەربازیی مێزۆپۆتامیای سەرەوە؛ لە سەردەمی ئیمپراتۆر یوستینیانۆسی یەکەمدا شوورەکان بەهێزکران و ئاوگیرە گەورەکان زیادکران.",
          "شارەکە هەروەها لە ساڵی ٥٣٠دا بووە شوێنی سەرکەوتنی جێنێرالی بیزەنتی بێلیساریۆس بەسەر ساسانییەکاندا. لە سەدەکانی دواتردا لەنێوان دەسەڵاتی ساسانی، بیزەنتی، ئومەوی، عەباسی، سەلجووقی و عوسمانیدا دەستی گۆڕی. ئەمڕۆ تەنها نزیکەی %١٠ی شارەکە لەسەر ڕووی زەوییە، زۆربەی هێشتا لەژێر خاکدایە."
        ],
        "features": [
          { "title": "ئاوگیرە گەورەکانی ئاو", "body": "یەکێک لە ئاوگیرە بەردکۆڵراوەکان (لەنێو خەڵکدا بە ناوی \"زیندان\" ناسراوە) بۆشاییەکی نزیکەی ١٠٠٠٠ م³ ئاوی هەیە؛ ئەمە قووڵترە لە ئاوگیری یەرەباتانی ئیستەنبوڵ." },
          { "title": "ئاو وەک چەکی پاراستن", "body": "گارنیزۆنی ڕۆما، لە کاتی گەمارۆدا ئاوی ئاوگیرەکانی بەکارهێنا بۆ خۆڕاگری درێژخایەن؛ ساسانییەکانیش هەوڵیان دا بە گۆڕینی ئاڕاستەی ڕووبار شارەکە بێ ئاو بهێڵنەوە." },
          { "title": "سیستەمی شووری ٤ کیلۆمەتری", "body": "هێڵێکی پاراستنی دوو چینە، بە ٢٨ قوللە، لە شووری ناوەوە و دەرەوە پێکهاتووە." },
          { "title": "گۆڕی گالەری (گۆڕستان)", "body": "بیناکانی گۆڕی فرەچین کە لە بەرددا کۆڵراون؛ بەرماوەی ئێسقانی هەزاران کەسیان تێدایە." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Arkeoloji"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Dara (antik adıyla Anastasiopolis), Doğu Roma İmparatoru I. Anastasius tarafından M.S. 505-507 yıllarında, imparatorluğun doğu sınırını Sasani İmparatorluğu'na karşı korumak amacıyla bir garnizon kenti olarak inşa edildi. Kısa sürede Yukarı Mezopotamya'nın idari ve askeri merkezi haline geldi; İmparator I. Justinianus döneminde surlar güçlendirildi ve devasa sarnıçlar eklendi.",
      "Kent, 530'da Bizans generali Belisarius'un Sasanilere karşı kazandığı zaferin de sahnesi oldu. Sonraki yüzyıllarda Sasani, Bizans, Emevi, Abbasi, Selçuklu ve Osmanlı hakimiyetleri arasında el değiştirdi. Bugün kentin yalnızca yaklaşık %10'u yüzeyde, büyük kısmı hâlâ toprak altında."
    ],
    "features": [
      {
        "title": "Dev su sarnıçları",
        "body": "Kayaya oyulmuş sarnıçlardan biri (halk arasında \"zindan\" olarak bilinir) ~10.000 m³ su kapasitesine sahip; bu, İstanbul'daki Yerebatan Sarnıcı'ndan daha derin."
      },
      {
        "title": "Su, savunma silahı olarak",
        "body": "Roma garnizonu, kuşatma sırasında sarnıçlardaki suyu uzun süre dayanmak için kullandı; Sasaniler ise nehrin akışını değiştirerek kenti susuz bırakmaya çalıştı."
      },
      {
        "title": "4 km'lik sur sistemi",
        "body": "İç ve dış sur olmak üzere iki katmanlı, 28 kuleli bir savunma hattı."
      },
      {
        "title": "Galeri mezar (nekropol)",
        "body": "Kayaya oyulmuş, çok katlı mezar yapıları; binlerce kişiye ait kemik kalıntısı barındırıyor."
      }
    ],
    "visitLocation": "Mardin, Oğuz Köyü (Artuklu ilçesi)",
    "visitNearestCity": "Mardin merkez (~30 km)",
    "visitDuration": "1.5-2 saat",
    "visitBestTime": "İlkbahar/sonbahar; köy çocukları gönüllü rehberlik edebiliyor",
    "related": [
      "mardin",
      "midyat",
      "hasankeyf"
    ]
  },
  {
    "slug": "midyat",
    "name": "Midyat",
    "region": "Mardin",
    "era": "Geç Antik – Ortaçağ",
    "eraDisplay": "M.Ö. 9. yy",
    "eraCaption": "Asur Kaydı",
    "translations": {
      "DE": {
        "eraDisplay": "9. Jh. v. Chr.",
        "eraCaption": "Assyrische Aufzeichnung",
        "history": [
          "Midyat ist ein Landkreis von Mardin auf dem Tur-Abdin-Plateau; sein Name soll vom assyrischen Wort \"Matiate\" stammen, was \"Stadt der Höhlen\" bedeutet — es erscheint unter diesem Namen in assyrischen Inschriften des 9. Jahrhunderts v. Chr. Tur Abdin (syrisch für \"Berg der Diener\") gilt seit Jahrhunderten als Herz der syrisch-christlichen Kultur.",
          "Midyat trägt ein multikulturelles Gefüge, in dem Syrer, Türken, Araber und eine lokale Gemeinschaft namens \"Mahalmi\" zusammenleben. Das 397 gegründete Kloster Mor Gabriel ist eines der ältesten noch aktiven syrisch-orthodoxen Klöster der Welt."
        ],
        "features": [
          { "title": "Telkari-Silberschmiedekunst", "body": "Ein jahrhundertealtes Handwerk, bei dem haarfeine Silberdrähte ohne Lötung von Hand gebogen und verbunden werden; seine Geschichte reicht bis etwa 3000 v. Chr. zurück." },
          { "title": "Kloster Mor Gabriel", "body": "397 gegründeter Klosterkomplex aus zahlreichen Kirchen und Kapellen, in dem noch heute Gottesdienst und Unterricht stattfinden." },
          { "title": "Steinhäuser", "body": "Die Straßen des alten Midyat erinnern mit ihren Bogengängen und steinernen Ornamenten an eine mittelalterliche Stadt." },
          { "title": "Syrisch (Turoyo)", "body": "Ein noch in der Region gesprochener lebendiger Zweig des Aramäischen, der Sprache Jesu." }
        ]
      },
      "EN": {
        "eraDisplay": "9th century BCE",
        "eraCaption": "Assyrian Record",
        "history": [
          "Midyat is a district of Mardin on the Tur Abdin plateau; its name is thought to derive from the Assyrian word \"Matiate,\" meaning \"City of Caves\" — it appears under this name in 9th-century BCE Assyrian inscriptions. Tur Abdin (Syriac for \"Mountain of the Servants\") has been known for centuries as the heart of Syriac Christian culture.",
          "Midyat carries a multicultural fabric in which Syriacs, Turks, Arabs, and a local community known as the \"Mahalmi\" live side by side. The Mor Gabriel Monastery, founded in 397, is one of the oldest still-active Syriac Orthodox monasteries in the world."
        ],
        "features": [
          { "title": "Telkari silver craftsmanship", "body": "A centuries-old craft in which hair-thin silver wires are bent and joined by hand without soldering; its history reaches back to around 3000 BCE." },
          { "title": "Mor Gabriel Monastery", "body": "Founded in 397, a monastery complex of numerous churches and chapels where worship and teaching still continue." },
          { "title": "Stone mansions", "body": "The streets of old Midyat, with their arched passages and carved stone ornamentation, evoke a medieval town." },
          { "title": "Syriac (Turoyo)", "body": "A living branch of Aramaic, the language of Jesus, still spoken in the region." }
        ]
      },
      "KU": {
        "name": "Midyad",
        "region": "Mêrdîn",
        "eraDisplay": "Sedsala 9. BZ",
        "eraCaption": "Tomara Asûrî",
        "history": [
          "Midyad, navçeya Mêrdînê ya li ser platoya Tûr Abdînê ye; tê texmînkirin ku navê wê ji peyva Asûrî \"Matiate\" tê, ku wateya wê \"Bajarê Şikeftan\" e — di kitabeyên Asûrî yên sedsala 9. BZ de bi vî navî derbas dibe. Tûr Abdîn (bi Suryanî \"Çiyayê Xulaman\") bi sedsalan wek dilê çanda Xiristiyanên Suryanî tê zanîn.",
          "Midyad, tevneke pirçandî ya ku Suryanî, Tirk, Ereb û civakek herêmî ya bi navê \"Mahalmî\" li gel hev dijîn hildigire. Dêra Mor Gabrîel, ku di sala 397an de hatiye damezrandin, yek ji dêrên Suryanî yên Ortodoks ên herî kevn e ku hê jî çalak in li cîhanê."
        ],
        "features": [
          { "title": "Zîvkariya telkarî", "body": "Huneriek bi sedsalan e ku têlên zîv ên bi qelindahiya porê bêyî çareserkirinê bi destan têne xemilandin û bihevre têne girêdan; dîroka wê heta 3000 BZ dirêj dibe." },
          { "title": "Dêra Mor Gabrîel", "body": "Komplekseke dêrê ya di sala 397an de hatiye damezrandin, ku ji gelek dêr û şapelan pêk tê û îbadet û perwerde hê jî lê didome." },
          { "title": "Konaxên kevir", "body": "Kolanên Midyada kevn, bi derbazgehên xwe yên kevirî û xemilandinên kevirî yên oyakirî, bajarekî serdema navîn bi bîr tîne." },
          { "title": "Suryanî (Turoyo)", "body": "Şaxek zindî yê Aramî, zimanê Hz. Îsa, ku hê jî li herêmê tê axaftin." }
        ]
      },
      "CKB": {
        "history": [
          "میدیاد، ناوچەیەکی مێردینە لەسەر پلاتۆی تور عەبدین؛ پێدەچێت ناوی لە وشەی ئاشووری \"ماتیاتێ\"ەوە هاتبێت، کە مانای \"شاری ئەشکەوتەکان\" دەگەیەنێت — لە نووسینە ئاشوورییەکانی سەدەی نۆیەمی پێش زایین بەم ناوە هاتووە. تور عەبدین (بە سریانی \"چیای کۆیلەکان\") بۆ سەدەها ساڵە وەک دڵی کەلتووری مەسیحیی سریانی ناسراوە.",
          "میدیاد چێشتێکی فرەکەلتووری هەڵدەگرێت کە تێیدا سریانی، تورک، عەرەب و کۆمەڵگایەکی ناوخۆیی بەناوی \"مەحەلمی\" پێکەوە دەژین. دێری مۆر گابرییل کە لە ساڵی ٣٩٧دا دامەزراوە، یەکێکە لە کۆنترین دێرە ئۆرسۆدۆکسە سریانییەکانی هێشتا چالاکی جیهان."
        ],
        "features": [
          { "title": "زیوکاریی تەلکاری", "body": "پیشەیەکی سەدەها ساڵە کە تێیدا تەلی زیوی وەک تەنکایی مووی سەر بەبێ لەحیم بەدەست چەماوە و بەیەکەوە بەستراوە؛ مێژووی دەگاتەوە نزیکەی ٣٠٠٠ی پێش زایین." },
          { "title": "دێری مۆر گابرییل", "body": "کۆمپلێکسێکی دێری کە لە ساڵی ٣٩٧دا دامەزراوە، لە چەندین کڵێسا و پەرستگای بچووکەوە پێکهاتووە، هێشتا لێی خواپەرستی و فێرکردن بەردەوامە." },
          { "title": "کۆشکی بەردین", "body": "شەقامەکانی میدیادی کۆن، بە تاقەوانەکانی و ڕازاندنەوەی بەردی تاشراوی، شارێکی سەردەمی ناوەڕاست بەبیر دەهێننەوە." },
          { "title": "سریانی (تۆرۆیۆ)", "body": "لقێکی زیندووی ئارامی، زمانی عیسای مەسیح، کە هێشتا لە ناوچەکەدا قسەی پێدەکرێت." }
        ]
      }
    },
    "unesco": false,
    "tags": [
      "Kültür",
      "Mimari"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Midyat, Mardin'in Tur Abdin platosundaki ilçesi; adının \"Mağaralar Kenti\" anlamına gelen Asurca \"Matiate\" kelimesinden geldiği düşünülüyor — M.Ö. 9. yüzyıl Asur yazıtlarında bu isimle geçiyor. Tur Abdin (Süryanice \"kulların dağı\"), yüzyıllardır Süryani Hristiyan kültürünün kalbi olarak biliniyor.",
      "Midyat, Süryaniler, Türkler, Araplar ve \"Mahalmi\" denen yerel bir topluluğun bir arada yaşadığı çok kültürlü bir doku taşıyor. 397 yılında kurulan Mor Gabriel Manastırı, dünyanın hâlâ faal olan en eski Süryani Ortodoks manastırlarından biri."
    ],
    "features": [
      {
        "title": "Telkari gümüş işçiliği",
        "body": "Saç teli inceliğindeki gümüş tellerin kaynak kullanılmadan elle bükülüp birleştirilmesiyle yapılan, yüzyıllardır süren bir zanaat; M.Ö. 3000'lere kadar uzanan bir geçmişi var."
      },
      {
        "title": "Mor Gabriel Manastırı",
        "body": "397 yılında kurulan, hâlâ ibadet ve eğitimin sürdüğü, çok sayıda kilise ve şapelden oluşan bir manastır kompleksi."
      },
      {
        "title": "Taş konaklar",
        "body": "Eski Midyat'ın sokakları, kemerli geçitleri ve oyma taş süslemeli konaklarıyla bir ortaçağ kentini andırıyor."
      },
      {
        "title": "Süryanice (Turoyo)",
        "body": "Bölgede hâlâ konuşulan, Hz. İsa'nın dilinin bir lehçesi olan Aramice'nin yaşayan bir kolu."
      }
    ],
    "visitLocation": "Mardin, Midyat ilçesi",
    "visitNearestCity": "Mardin merkez (~60 km)",
    "visitDuration": "Yarım gün",
    "visitBestTime": "Her sezon; gümüşçüler çarşısı hafta içi daha sakin",
    "related": [
      "mardin",
      "dara",
      "diyarbakir"
    ]
  },
  {
    "slug": "ani",
    "name": "Ani Harabeleri",
    "region": "Kars",
    "era": "Ortaçağ, 10.–11. yy",
    "eraDisplay": "10.–11. yy",
    "eraCaption": "Altın Çağ",
    "translations": {
      "DE": {
        "name": "Ruinen von Ani",
        "eraDisplay": "10.-11. Jh.",
        "eraCaption": "Goldenes Zeitalter"
      },
      "EN": {
        "name": "Ruins of Ani",
        "eraDisplay": "10th-11th century",
        "eraCaption": "Golden Age"
      },
      "KU": {
        "name": "Kavilên Aniyê",
        "region": "Qers",
        "eraDisplay": "Sedsala 10-11.",
        "eraCaption": "Serdema Zêrîn"
      }
    },
    "unesco": true,
    "tags": [
      "Mimari",
      "Tarih"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Ani, Kars'ın güneydoğusunda, Arpaçay Nehri vadisinde kurulu bir Orta Çağ kentidir. Bagratuni Ermeni Krallığı'nın başkenti olarak en parlak dönemini 10-11. yüzyıllarda yaşadı; İpek Yolu üzerindeki konumu sayesinde dönemin Konstantinopolis, Bağdat ve Kahire'siyle rekabet edebilecek bir ticaret ve kültür merkezine dönüştü. Nüfusunun zirvede 100.000'i aştığı tahmin ediliyor.",
      "Şehir, sayısız kilise ve şapeli nedeniyle \"1001 Kilise Şehri\" olarak anıldı. 1064'te Selçuklu Sultanı Alparslan tarafından fethedildi; büyük katedral o dönemde camiye çevrilerek \"Fethiye Camii\" adını aldı. Moğol istilaları ve depremler sonucu kent giderek terk edildi. Ani Arkeolojik Alanı 2016'da UNESCO Dünya Mirası Listesi'ne kaydedildi."
    ],
    "features": [
      {
        "title": "Büyük Katedral (Fethiye Camii)",
        "body": "Mimar Trdat tarafından inşa edilen, kırmızı tüf taşından yapılmış katedral; Trdat aynı zamanda İstanbul'daki Ayasofya'nın da onarımını yapmıştı."
      },
      {
        "title": "Tigran Honents Kilisesi",
        "body": "1215'te yaptırılan, İncil sahneleri ve Aziz Grigor'un hayatını anlatan zengin fresklerle bezeli, en iyi korunmuş yapılardan biri."
      },
      {
        "title": "Menuçehr Camii",
        "body": "1072'de inşa edilen, Anadolu'daki ilk Türk camilerinden biri olarak kabul ediliyor."
      },
      {
        "title": "Çok kültürlü mimari",
        "body": "Aynı kentte Ermeni kiliseleri, Selçuklu camisi ve bir Zerdüşt ateşgedesi yan yana duruyor."
      }
    ],
    "visitLocation": "Kars merkeze ~45 km, Türkiye-Ermenistan sınırı",
    "visitNearestCity": "Kars merkez",
    "visitDuration": "3-4 saat",
    "visitBestTime": "Yaz (yeşil plato) veya kış (karla kaplı dramatik manzara)",
    "related": [
      "kars",
      "agri-dagi"
    ]
  },
  {
    "slug": "kars",
    "name": "Kars",
    "region": "Kars",
    "era": "Ortaçağ – 19. yy",
    "eraDisplay": "1152",
    "eraCaption": "Kale İnşası",
    "translations": {
      "DE": {
        "eraDisplay": "1152",
        "eraCaption": "Bau der Festung"
      },
      "EN": {
        "eraCaption": "Fortress Construction"
      },
      "KU": {
        "region": "Qers",
        "eraCaption": "Avakirina Kelê"
      }
    },
    "unesco": false,
    "tags": [
      "Kültür",
      "Mimari"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Kars Kalesi, güney sur duvarındaki kitabeye göre 1152'de Saltuklu Sultanı Melik İzzeddin'in emriyle inşa edildi. Şehir, 1877-78 Osmanlı-Rus Savaşı sonrası 40 yıl süren Rus işgalinde önemli ölçüde tahribat gördü — bu dönemden kalan Baltık tarzı bina mirası, şehrin mimari dokusunda hâlâ görülüyor.",
      "Kale içinde Selçuklu döneminden kalma, Anadolu'nun en eski hastanelerinden biri olan \"Ejderha Kulesi\" ile 12. yüzyıldan Celal Baba Türbesi bulunuyor."
    ],
    "features": [
      {
        "title": "Kars Kalesi",
        "body": "Şehre ve Kars Çayı'na hakim, 12. yüzyıldan kalma savunma yapısı."
      },
      {
        "title": "Rus dönemi mimarisi",
        "body": "1878-1918 Rus idaresinden kalan, Anadolu'da benzeri görülmeyen ızgara planlı sokaklar ve taş binalar."
      },
      {
        "title": "Ani'ye açılan kapı",
        "body": "Kars, Ani Harabeleri'ne giden yolun başlangıç noktası ve konaklama merkezi."
      },
      {
        "title": "Çıldır Gölü yakınlığı",
        "body": "Kıştan tamamen donan, kızak ve buz balıkçılığı yapılabilen gölete ~70 km uzaklıkta."
      }
    ],
    "visitLocation": "Kars merkez",
    "visitNearestCity": "Kars'ın kendisi",
    "visitDuration": "Yarım gün",
    "visitBestTime": "Kış (kar manzarası + Doğu Ekspresi deneyimi) veya yaz",
    "related": [
      "ani",
      "agri-dagi"
    ]
  },
  {
    "slug": "agri-dagi",
    "name": "Ağrı Dağı",
    "region": "Ağrı",
    "era": "Jeolojik – Mitolojik",
    "eraDisplay": "5.137 m",
    "eraCaption": "Zirve Yüksekliği",
    "translations": {
      "DE": {
        "name": "Berg Ararat",
        "region": "Ağrı",
        "eraCaption": "Gipfelhöhe"
      },
      "EN": {
        "name": "Mount Ararat",
        "eraCaption": "Summit Elevation"
      },
      "KU": {
        "name": "Çiyayê Agirî",
        "region": "Agirî",
        "eraCaption": "Bilindahiya Lotikê"
      }
    },
    "unesco": false,
    "tags": [
      "Doğa"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Ağrı Dağı (Batı dillerinde Ararat), 5.137 metreyle Türkiye'nin en yüksek zirvesi olan, biri büyük biri küçük iki sönmüş yanardağ konisinden oluşan bir dağ kütlesidir. Urartu Krallığı'nın (M.Ö. 9-6. yüzyıllar) topraklarında yer alması nedeniyle \"Ararat\" adının Urartu kelimesinden geldiği düşünülüyor.",
      "Dağ, Tevrat'taki Nuh Tufanı anlatısında geminin karaya oturduğu \"Ararat dağları\" ile ilişkilendiriliyor — bu yüzden Yahudi ve Hristiyan gelenekleri için sembolik bir önem taşıyor. Zirveye ilk bilinen tırmanış 1829'da Alman doktor Friedrich Parrot tarafından yapıldı."
    ],
    "features": [
      {
        "title": "12 km²'lik buzul",
        "body": "Zirvedeki buzul, Türkiye'nin sahip olduğu en büyük buzul alanı."
      },
      {
        "title": "İkiz koni yapısı",
        "body": "Büyük ve Küçük Ağrı, 2.700 metre yükseklikteki Serdarbulak beliyle birbirine bağlanıyor."
      },
      {
        "title": "Çok dilli/kültürlü adlandırma",
        "body": "Kürtçe Çiyayê Agirî, Ermenice Masis, Farsça Kûh-i Nûh gibi pek çok dilde farklı isimlerle anılıyor; her biri farklı bir efsaneye işaret ediyor."
      },
      {
        "title": "Doğubayazıt ve İshak Paşa Sarayı",
        "body": "Dağın eteğindeki ilçe, 18. yüzyıl Osmanlı saray mimarisinin önemli örneklerinden birine ev sahipliği yapıyor."
      }
    ],
    "visitLocation": "Ağrı, Doğubayazıt ilçesi",
    "visitNearestCity": "Doğubayazıt",
    "visitDuration": "Manzara için yarım gün; zirve için 3-5 gün (rehber gerekir)",
    "visitBestTime": "Temmuz-Eylül (tırmanış); manzara her sezon",
    "related": [
      "van-kalesi",
      "kars",
      "ani"
    ]
  },
  {
    "slug": "tatvan",
    "name": "Tatvan & Nemrut Krater Gölü",
    "region": "Bitlis",
    "era": "Jeolojik",
    "eraDisplay": "Volkanik",
    "eraCaption": "Jeolojik Köken",
    "translations": {
      "DE": {
        "name": "Tatvan & Nemrut-Kratersee",
        "region": "Bitlis",
        "eraDisplay": "Vulkanisch",
        "eraCaption": "Geologischer Ursprung"
      },
      "EN": {
        "name": "Tatvan & Nemrut Crater Lake",
        "eraDisplay": "Volcanic",
        "eraCaption": "Geological Origin"
      },
      "KU": {
        "region": "Bidlîs",
        "eraDisplay": "Volkanîk",
        "eraCaption": "Eslê Jeolojîk"
      }
    },
    "unesco": false,
    "tags": [
      "Doğa"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Tatvan, Van Gölü'nün batı kıyısında, Bitlis iline bağlı bir ilçedir. Yakınındaki Nemrut Dağı (Adıyaman'daki Kommagene Nemrut'uyla aynı adı taşıyan ama farklı bir volkanik dağ), kraterinde dünyanın en büyük krater göllerinden biri olan Nemrut Krater Gölü'nü barındırıyor. Göl, volkanik patlamalar sonucu oluşan çöküntü alanının suyla dolmasıyla meydana geldi.",
      "Bölge, Selçuklu dönemine ait Ahlat mezarlığı gibi tarihi izlerle de çevrili; Van Gölü'nün oluşumu da bu volkanik bölgenin lavlarının vadiyi tıkamasına bağlanıyor."
    ],
    "features": [
      {
        "title": "Krater gölü",
        "body": "Volkanik kraterin içinde oluşan, manzarası ve sıcak su kaynaklarıyla bilinen göl."
      },
      {
        "title": "Van Gölü kıyısı",
        "body": "Tatvan, Türkiye'nin en büyük gölünün batı ucunda; göl manzaralı uzun bir sahil şeridine sahip."
      },
      {
        "title": "Volkanik jeoloji",
        "body": "Bölge, Doğu Anadolu'nun en etkileyici volkanik peyzajlarından birini sunuyor."
      },
      {
        "title": "Ahlat Selçuklu mezarlığı yakınlığı",
        "body": "Bölgesel gezilerde sık sık Tatvan-Ahlat-Van rotası birlikte yapılıyor."
      }
    ],
    "visitLocation": "Bitlis, Tatvan ilçesi",
    "visitNearestCity": "Tatvan'ın kendisi; Van'a ~150 km",
    "visitDuration": "Yarım gün",
    "visitBestTime": "Yaz ayları (yol koşulları için)",
    "related": [
      "van-kalesi",
      "hakkari",
      "agri-dagi"
    ]
  },
  {
    "slug": "hakkari",
    "name": "Hakkari",
    "region": "Hakkari",
    "era": "Tarih öncesi – Ortaçağ",
    "eraDisplay": "20.000 yıl",
    "eraCaption": "Buzul Yaşı",
    "translations": {
      "DE": {
        "eraDisplay": "20.000 Jahre",
        "eraCaption": "Eiszeitalter"
      },
      "EN": {
        "eraDisplay": "20,000 years",
        "eraCaption": "Ice Age"
      },
      "KU": {
        "name": "Colemêrg",
        "region": "Colemêrg",
        "eraDisplay": "20.000 sal",
        "eraCaption": "Serdema Qeşayê"
      }
    },
    "unesco": false,
    "tags": [
      "Doğa",
      "Kültür"
    ],
    "imageUrl": null,
    "rating": null,
    "reviews": null,
    "history": [
      "Hakkari, Türkiye'nin en sarp ve dağlık illerinden biri; Cilo ve Sat dağları, ülkenin güneydoğusundaki en yüksek ve en vahşi doğa parçalarından birini oluşturuyor. Bölgede M.Ö. 2. binyıla tarihlenen geyik figürlü stel (dikilitaş) mezarları bulunuyor — bu steller, Doğu Anadolu'nun yayla kültürlerine ait önemli arkeolojik bulgular arasında.",
      "Cilo Dağı'ndaki buzullar, yaklaşık 20.000 yıllık olduğu düşünülen, Türkiye'nin en etkileyici buzul sistemlerinden birini oluşturuyor."
    ],
    "features": [
      {
        "title": "Cilo-Sat buzulları",
        "body": "20.000 yıllık olduğu tahmin edilen buzullar, Sat Gölleri'nin turkuaz sularıyla birlikte dramatik bir yüksek dağ manzarası sunuyor."
      },
      {
        "title": "Geyik figürlü steller",
        "body": "Tunç Çağı'na tarihlenen, geyik motifli dikilitaşlar, bölgenin yayla kültürünün en eski izlerinden."
      },
      {
        "title": "Cennet-Cehennem Vadisi",
        "body": "Çukurca yakınında, adını zıt manzaralarından alan vadi."
      },
      {
        "title": "Yüksek dağ kültürü",
        "body": "Bölge, Anadolu'nun en az bilinen ama en sarp doğa parçalarından birini ve buna bağlı özgün bir yayla yaşam kültürünü barındırıyor."
      }
    ],
    "visitLocation": "Hakkari merkez, Çukurca ve Yüksekova ilçeleri",
    "visitNearestCity": "Van'a ~200 km, Hakkari merkez",
    "visitDuration": "2-3 gün (Cilo-Sat turu için)",
    "visitBestTime": "Temmuz-Eylül (kar erimesi sonrası)",
    "related": [
      "van-kalesi",
      "tatvan",
      "agri-dagi"
    ]
  }
];

export const SEED_BUNDLES: SeedBundle[] = [
  {
    "slug": "dogu-anadolu-miras-rotasi",
    "title": "Doğu Anadolu Miras Rotası",
    "imageUrl": "/images/destinations/gobeklitepe.webp",
    "description": "Göbeklitepe, Harran, Mardin, Dara ve Van Kalesi. Beş antik şehir, bir küratörlü güzergah.",
    "nights": 7,
    "destinations": [
      "Göbeklitepe",
      "Harran",
      "Mardin",
      "Van"
    ],
    "price": 18400,
    "originalPrice": 22000,
    "includes": [
      "4★ Otel",
      "Transfer",
      "Rehber",
      "Kahvaltı"
    ],
    "badge": "Çok Satan",
    "translations": {
      "DE": {
        "title": "Ostanatolische Erbe-Route",
        "description": "Göbeklitepe, Harran, Mardin, Dara und die Festung Van. Fünf antike Städte, eine kuratierte Route.",
        "includes": [
          "4★ Hotel",
          "Transfer",
          "Reiseleiter",
          "Frühstück"
        ],
        "badge": "Bestseller"
      },
      "EN": {
        "title": "Eastern Anatolia Heritage Route",
        "description": "Göbeklitepe, Harran, Mardin, Dara, and Van Castle. Five ancient cities, one curated route.",
        "includes": [
          "4★ Hotel",
          "Transfer",
          "Guide",
          "Breakfast"
        ],
        "badge": "Best Seller"
      },
      "KU": {
        "title": "Rêça Mîrata Anatolya Rojhilat",
        "description": "Girê Mirazan, Harran, Mêrdîn, Dara û Kela Wanê. Pênc bajarên kevnar, rêçek serpereştkirî.",
        "includes": [
          "Otêl 4★",
          "Veguhastin",
          "Rêber",
          "Taştê"
        ],
        "badge": "Herî Firotî"
      }
    }
  },
  {
    "slug": "mezopotamya-derin-dalis",
    "title": "Mezopotamya Derin Dalış",
    "imageUrl": "/images/destinations/diyarbakir.jpg",
    "description": "Diyarbakır surlarından Hasankeyf'e, Dicle boyunca antik medeniyetlerin izinde.",
    "nights": 5,
    "destinations": [
      "Diyarbakır",
      "Hasankeyf",
      "Midyat"
    ],
    "price": 12800,
    "originalPrice": null,
    "includes": [
      "Butik Otel",
      "Transfer",
      "Rehber"
    ],
    "badge": null,
    "translations": {
      "DE": {
        "title": "Mesopotamien Tiefentauchgang",
        "description": "Von den Stadtmauern Diyarbakırs bis Hasankeyf, auf den Spuren antiker Zivilisationen entlang des Tigris.",
        "includes": [
          "Boutique-Hotel",
          "Transfer",
          "Reiseleiter"
        ]
      },
      "EN": {
        "title": "Mesopotamia Deep Dive",
        "description": "From the walls of Diyarbakır to Hasankeyf, tracing ancient civilizations along the Tigris.",
        "includes": [
          "Boutique Hotel",
          "Transfer",
          "Guide"
        ]
      },
      "KU": {
        "title": "Kûrbûna Mezopotamyayê",
        "description": "Ji sûrên Amedê heta Heskîfê, li ser şopa şaristaniyên kevnar li kêleka Dîcleyê.",
        "includes": [
          "Otêla Botîk",
          "Veguhastin",
          "Rêber"
        ]
      }
    }
  },
  {
    "slug": "nemrut-kommagene-kralligi",
    "title": "Nemrut & Kommagene Krallığı",
    "imageUrl": "/images/destinations/nemrut-dagi.jpg",
    "description": "Dağın zirvesindeki dev taş kafalar ve gizemli Kommagene tapınakları.",
    "nights": 4,
    "destinations": [
      "Nemrut Dağı",
      "Adıyaman",
      "Kahta"
    ],
    "price": 9600,
    "originalPrice": 11200,
    "includes": [
      "3★ Otel",
      "Transfer",
      "Rehber"
    ],
    "badge": "Yeni",
    "translations": {
      "DE": {
        "title": "Nemrut & Königreich Kommagene",
        "description": "Die riesigen Steinköpfe auf dem Gipfel und die geheimnisvollen Kommagene-Tempel.",
        "includes": [
          "3★ Hotel",
          "Transfer",
          "Reiseleiter"
        ],
        "badge": "Neu"
      },
      "EN": {
        "title": "Nemrut & the Kingdom of Commagene",
        "description": "The giant stone heads atop the mountain and the mysterious Commagene temples.",
        "includes": [
          "3★ Hotel",
          "Transfer",
          "Guide"
        ],
        "badge": "New"
      },
      "KU": {
        "title": "Nemrût & Padîşahiya Kommagene",
        "description": "Serên kevir ên mezin li lotikê çiya û perestgehên nepenî yên Kommagene.",
        "includes": [
          "Otêl 3★",
          "Veguhastin",
          "Rêber"
        ],
        "badge": "Nû"
      }
    }
  }
];
