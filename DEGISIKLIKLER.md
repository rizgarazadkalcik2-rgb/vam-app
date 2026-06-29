# VAM Platform — info@visitvam.com Sitede Görünür/Aktif Hale Getirildi

## Kurulum
1. Zip'i indir, çıkar.
2. `src/` ve `public/`'i repo köküne **birleştir** (üzerine yazsın).
3. GitHub Desktop'ta commit + push.
4. Vercel otomatik deploy edecek.

## Nereye Eklendi

### 1. Yasal sayfalardaki `[e-posta adresi]` placeholder'ları dolduruldu
Bu 4 sayfada zaten doldurulmayı bekleyen boş alanlar vardı — artık gerçek,
tıklanabilir `info@visitvam.com` linki gösteriyor:
- Gizlilik Politikası
- Mesafeli Satış Sözleşmesi
- İptal/İade Politikası
- Teslimat & Hizmet Şartları

(Not: `[telefon numarası]`, `[açık adres]`, `[VKN]` alanları hâlâ
placeholder — bunlar için bilgi verdiğinde aynı şekilde doldurabilirim.)

### 2. Footer'daki "İletişim" linki artık gerçek
Ana Sayfa, Deneyimler ve Hakkımızda sayfalarının footer'ında "Şirket"
başlığı altındaki "İletişim" linki önceden `#` (hiçbir yere gitmiyordu),
şimdi tıklayınca `info@visitvam.com`'a mail taslağı açıyor.

### 3. Yeni Destinasyonlar/Bundle'lar sayfalarının footer'ına da eklendi
`VamFooter` bileşenindeki "Şirket" bölümüne "İletişim" linki eklendi.

## Zaten Var Olan (Önceki Turlardan)
Şu CTA butonları zaten `info@visitvam.com`'a gidiyordu (artık gerçek bir
adres olduğu için hepsi çalışır durumda):
- Ana sayfa "Rehberle Konuş" butonu
- 3 bundle detay sayfasındaki "Şimdi Rezervasyon Yap" ve "Sorusu Olanlar
  İçin →" butonları

## Test Edildi
- `npx tsc --noEmit` → hatasız

## Değiştirilen Dosyalar
- `src/app/gizlilik-politikasi/page.tsx`
- `src/app/mesafeli-satis-sozlesmesi/page.tsx`
- `src/app/iptal-iade-politikasi/page.tsx`
- `src/app/teslimat-hizmet-sartlari/page.tsx`
- `src/app/components/VamFooter.tsx`
- `public/static-pages/platform/index.html`
- `public/static-pages/experiences/index.html`
- `public/static-pages/about/index.html`
