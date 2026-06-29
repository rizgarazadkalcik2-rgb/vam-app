# VAM Platform — Cache Sorunu + Küçük Tutarsızlık Düzeltmeleri

## Kurulum
1. Zip'i indir, çıkar.
2. `src/` ve `next.config.ts`'i repo köküne **birleştir** (üzerine yazsın).
3. GitHub Desktop'ta commit + push.
4. Vercel otomatik deploy edecek.

## Düzeltmeler

### 1. (Kritik) CDN önbellek sorunu
`/platform`, `/experiences`, `/about` sayfalarına `Cache-Control: public,
max-age=0, must-revalidate` header'ı eklendi. Bu, her istekte tarayıcı/CDN'in
orijin sunucuyla doğrulama yapmasını zorunlu kılıyor — bir önceki deploy'un
bozuk/eski hâli artık asla takılı kalmıyor. Bir önceki CSP düzeltmesinde
yaşadığımız "bazı ziyaretçiler eski sürümü görüyor" sorununun kök nedeni
buydu.

### 2. `/bundles` sayfasında yarı İngilizce eyebrow
"— Bundle Paketleri" → "— Paket Koleksiyonu" olarak Türkçeleştirildi.

### 3. Footer'da eksik linkler
Yeni Destinasyonlar/Bundle'lar/Deneyimler sayfalarının footer'ına "Rehberler"
ve "Değerlendirmeler" linkleri geri eklendi (eski statik sayfalarda vardı,
yeni bileşene taşınırken atlanmıştı). Şu an `#` placeholder — gerçek
sayfaları hazır olduğunda hedefi güncelleyebiliriz.

## Test Edildi
- `npx tsc --noEmit` → hatasız
- `npx next build` → başarılı, tüm route'lar doğru derlendi

## Değiştirilen Dosyalar
- `next.config.ts`
- `src/app/bundles/page.tsx`
- `src/app/components/VamFooter.tsx`
