# VAM Platform — Düzeltme Notları

Bu zip, GitHub Desktop iş akışınla aynı şekilde repo köküne kopyalanabilir
(klasör yapısı `public/static-pages/...` ve `src/app/api/...` ile eşleşiyor).

## Yapılan 6 Düzeltme

1. **"Test Acente 1" sızıntısı** — Ana Sayfa ve Experiences kartlarından
   acente/partner adı tamamen kaldırıldı. Ayrıca `route.ts` içine, "Test"
   ile başlayan acente adı/paket başlığı taşıyan kayıtları public API'den
   otomatik filtreleyen bir SQL koşulu eklendi (veritabanı temizlenmeden
   önce bile görünmez).
   → **Ayrıca yapman gereken:** Admin panelden gerçek "Test Acente 1"
   kaydını/paketini sil veya pasifleştir — bu kod düzeltmesi sadece görünürlüğü
   kapatıyor, veritabanındaki kaydı silmiyor.

2. **Admin-vari "Bir destinasyon seçin · kapak fotoğrafı olarak ayarlansın"
   metni** — ziyaretçi diline çevrildi: "Bir görsele tıklayarak hero
   görselini değiştirebilirsiniz." Buton etiketleri de güncellendi
   ("Kapak Yap" → "Bu Görseli Seç").

3. **Navbar dil tutarsızlığı (TR/EN karışık)** — 5 sayfanın tamamında
   (Platform, Destinations, Bundles, Experiences, About) navbar ve footer
   linkleri Türkçeleştirildi: Destinasyonlar, Paketler, Deneyimler,
   Hakkımızda, Rehberler, Değerlendirmeler.

4. **Boş "Öne Çıkan Deneyimler" alanı** — kart grid'i artık sabit genişlikte
   ve sola hizalı (`auto-fill, minmax(230px,260px)` + `justify-content:start`),
   tek kart kaldığında devasa boşluk oluşmuyor. Ayrıca 1-3 paket varken
   "Daha fazla deneyim yakında eklenecek" şeklinde kesikli çerçeveli bir
   dolgu kartı ekleniyor.

5. **Hero'da "Diyarbakır" varsayılan seçili görünmesi** — incelemede bunun
   gerçek bir bug olmadığı görüldü; `.dest-chip:hover` ve `.dest-chip.active`
   aynı turuncu stili paylaşıyor, ekran görüntüsü alınırken imleç o
   butonun üzerindeydi. Kodda gerçek varsayılan değer doğru şekilde
   "Tümü". Düzeltme gerekmedi.

6. **"Revenue Share" kartı** — turist gözünden anlamsız duran madde,
   ziyaretçiye hitap eden dile çevrildi: "Doğrudan Etki — Yaptığın her
   rezervasyon, ziyaret ettiğin bölgenin yerel ekonomisine doğrudan katkı
   sağlar."

## Değiştirilen Dosyalar
- public/static-pages/platform/index.html
- public/static-pages/experiences/index.html
- public/static-pages/bundles/index.html
- public/static-pages/destinations/index.html
- public/static-pages/about/index.html
- src/app/api/packages/public/route.ts

## Kurulum
1. Bu zip'i indir, çıkar.
2. İçindeki `public/` ve `src/` klasörlerini repo klasörünün üzerine kopyala
   (mevcut dosyaların üzerine yazılacak).
3. GitHub Desktop'ta değişiklikleri gözden geçir, commit + push yap.
4. Vercel otomatik deploy edecek.
