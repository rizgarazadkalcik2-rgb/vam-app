# VAM Platform — 3 Düzeltme: Hero Görsel, Favicon, Admin İçerik Görünmeme Sorunu

## Kurulum
1. Zip'i indir, çıkar.
2. `src/` ve `public/`'i repo köküne **birleştir** (üzerine yazsın).
3. GitHub Desktop'ta commit + push.
4. Vercel otomatik deploy edecek.

## Düzeltmeler

### 1. Ana sayfadaki destinasyon filtre çipleri artık hero görselini de değiştiriyor
Daha önce sadece aşağıdaki "Öne Çıkan Deneyimler" filtresini etkiliyordu;
şimdi bir destinasyon çipine (Göbeklitepe, Van Kalesi, Mardin vb.) tıklayınca
üstteki büyük hero arka plan görseli de o destinasyona ait fotoğrafa
değişiyor — fotoğraf şeridindeki (alt galeri) davranışla tutarlı hale
getirildi.

### 2. Favicon artık VAM'ın kendi logosu
Önceden tarayıcı sekmesinde Vercel'in varsayılan siyah daire/üçgen ikonu
görünüyordu (proje hiç özel favicon ayarlamamıştı). Artık `public/logo/`
altındaki gerçek VAM logosundan (güneş motifi + VAM yazısı, koyu zemin
üzerinde) üretilmiş, 16×16/32×32/48×48 boyutlarını içeren çok-boyutlu bir
`favicon.ico` kullanılıyor.

### 3. (Kritik) Admin panelinden eklenen içerik ana sayfada/sitede görünmüyordu
**Kök sebep:** `/api/packages/public`, `/api/bundles/public`,
`/api/destinations/public` endpoint'lerinin hiçbiri "dinamik" olarak
işaretlenmemişti. Bu üç route içinde oturum/cookie kontrolü gibi
Next.js'in otomatik olarak "bu sayfa her istekte değişebilir" anlayacağı
bir şey olmadığı için, **Next.js bu API'lerin yanıtını build (deploy) anında
statik olarak dondurup önbelleğe alıyordu.** Sonuç: admin panelinden yeni
bir paket/bundle/destinasyon eklesen veya bir şeyi pasifleştirsen bile,
veritabanı güncelleniyor ama public sayfalar yeni deploy yapılana kadar
**hep eski/deploy-anı verisini** gösteriyordu.

**Çözüm:** Her üç route'a `export const dynamic = "force-dynamic";` eklendi
— bu, Next.js'e "bu endpoint'i asla önbelleğe alma, her istekte
veritabanından taze oku" talimatı veriyor. `npx next build` çıktısında bu
üç route artık `ƒ` (dinamik/server-rendered on demand) olarak işaretleniyor
— önceden bu işaret eksikti.

Admin panelindeki listeleme route'ları (`/api/destinations`,
`/api/bundles`, `/api/packages` — GET) zaten oturum kontrolü (cookie
okuma) yaptığı için bu sorunu hiç yaşamıyordu, sadece **herkese açık**
(`/public`) endpoint'ler etkilenmişti.

## Test Edildi
- `npx tsc --noEmit` → hatasız
- `npx next build` → başarılı; `/api/packages/public`, `/api/bundles/public`,
  `/api/destinations/public` artık `ƒ` (dinamik) olarak listeleniyor

## Değiştirilen Dosyalar
- `src/app/favicon.ico` (yeni VAM logosu)
- `src/app/api/packages/public/route.ts`
- `src/app/api/bundles/public/route.ts`
- `src/app/api/destinations/public/route.ts`
- `public/static-pages/platform/index.html`
