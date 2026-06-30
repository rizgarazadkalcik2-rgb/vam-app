# VAM Platform — Gerçek Çalışan Arama Barı

## Kurulum
1. Zip'i indir, çıkar.
2. `src/` ve `public/`'i repo köküne **birleştir**.
3. GitHub Desktop'ta commit + push.
4. Vercel otomatik deploy edecek.

## Ne Değişti

### Ana Sayfa — Arama Barı Artık Gerçek Çalışıyor

Önceden tamamen dekoratifti. Şimdi:

**Destinasyon alanı:**
- Tıklayınca açılır dropdown çıkıyor
- Liste `/api/destinations/public`'ten canlı çekiliyor
  (admin panelinden yeni destinasyon eklenince otomatik listede görünür)

**Tarih alanı:**
- Tıklayınca ay seçici çıkıyor
- Temmuz-Ekim arası hızlı seçim butonları + genel takvim

**Kişi Sayısı:**
- +/− butonlarıyla 1-20 arası seçim
- 20+ kişi için iletişim notu

**Deneyim:**
- Arkeoloji, Tarih, Doğa, Kültür, Gastronomi arasından seçim

**KEŞFET butonu:**
- Seçimleri query string olarak `/bundles` sayfasına taşıyor
  örn: `/bundles?dest=Mardin&exp=Kültür&guests=4&date=2026-08`

### `/bundles` Sayfası — Filtreleme Paneli Eklendi

Ana sayfadan gelen parametreler otomatik uygulanıyor.
Sayfada ek filtre şeridi var: destinasyon ve deneyim bazlı anlık filtreleme.
Sonuç bulunamazsa "Tüm Paketleri Göster" butonu çıkıyor.

## Test Edildi
- `npx tsc --noEmit` → hatasız
- `npx next build` → başarılı

## Değiştirilen Dosyalar
- `public/static-pages/platform/index.html`
- `src/app/bundles/page.tsx`
- `src/app/bundles/BundlesClient.tsx` (yeni)
