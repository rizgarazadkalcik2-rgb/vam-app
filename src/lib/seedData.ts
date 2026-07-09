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
        "eraCaption": "Geschätztes Datum"
      },
      "EN": {
        "region": "Şanlıurfa",
        "eraDisplay": "9600 BCE",
        "eraCaption": "Estimated Date"
      },
      "KU": {
        "region": "Riha",
        "eraDisplay": "9600 BZ",
        "eraCaption": "Dîroka Texmînî"
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
        "eraCaption": "Geschätztes Datum"
      },
      "EN": {
        "eraDisplay": "7400 BCE",
        "eraCaption": "Estimated Date"
      },
      "KU": {
        "eraDisplay": "7400 BZ",
        "eraCaption": "Dîroka Texmînî"
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
        "eraCaption": "Frühe Besiedlung"
      },
      "EN": {
        "eraDisplay": "6th century BCE",
        "eraCaption": "Early Settlement"
      },
      "KU": {
        "region": "Riha",
        "eraDisplay": "Sedsala 6. BZ",
        "eraCaption": "Niştecihbûna Destpêkê"
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
        "eraCaption": "Ununterbrochene Besiedlung"
      },
      "EN": {
        "name": "Diyarbakır City Walls",
        "eraDisplay": "4th millennium BCE",
        "eraCaption": "Continuous Settlement"
      },
      "KU": {
        "name": "Sûrên Amedê",
        "region": "Amed",
        "eraDisplay": "Hezareya 4. BZ",
        "eraCaption": "Niştecihbûna Bêrawestan"
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
        "eraCaption": "Erste Erwähnung"
      },
      "EN": {
        "eraDisplay": "4th century CE",
        "eraCaption": "First Record"
      },
      "KU": {
        "name": "Mêrdîn",
        "region": "Mêrdîn",
        "eraDisplay": "Sedsala 4. PZ",
        "eraCaption": "Tomara Yekem"
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
        "eraCaption": "Bau des Monuments"
      },
      "EN": {
        "name": "Mount Nemrut",
        "eraDisplay": "62 BCE",
        "eraCaption": "Construction of the Monument"
      },
      "KU": {
        "name": "Çiyayê Nemrûd",
        "region": "Semsûr",
        "eraDisplay": "62 BZ",
        "eraCaption": "Avakirina Bîrdankê"
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
        "eraCaption": "Urartäische Epoche"
      },
      "EN": {
        "name": "Van Castle",
        "eraDisplay": "9th century BCE",
        "eraCaption": "Urartian Period"
      },
      "KU": {
        "name": "Kela Wanê",
        "region": "Wan",
        "eraDisplay": "Sedsala 9. BZ",
        "eraCaption": "Serdema Ûrartûyan"
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
        "eraCaption": "Früheste Spuren"
      },
      "EN": {
        "eraDisplay": "10,000 BCE",
        "eraCaption": "Earliest Traces"
      },
      "KU": {
        "name": "Heskîf",
        "region": "Elih",
        "eraDisplay": "10.000 BZ",
        "eraCaption": "Şopên Yekem"
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
        "eraCaption": "Gründung"
      },
      "EN": {
        "name": "Ancient City of Dara",
        "eraDisplay": "505 CE",
        "eraCaption": "Founding"
      },
      "KU": {
        "name": "Bajarê Kevnar ê Dara",
        "region": "Mêrdîn",
        "eraDisplay": "505 PZ",
        "eraCaption": "Damezrandin"
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
        "eraCaption": "Assyrische Aufzeichnung"
      },
      "EN": {
        "eraDisplay": "9th century BCE",
        "eraCaption": "Assyrian Record"
      },
      "KU": {
        "name": "Midyad",
        "region": "Mêrdîn",
        "eraDisplay": "Sedsala 9. BZ",
        "eraCaption": "Tomara Asûrî"
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
