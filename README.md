# VAM — Denetim Düzeltmeleri (Haziran 2026 denetimi için)

Bu zip, canlı sitede tespit edilen 5 bulgu için hazırlanmış dosyaları
içeriyor. Kaynak kodunuza erişimim olmadığı için bunlar **doğrudan
projenize elle eklemeniz/uyarlamanız gereken** dosyalardır — "drop-in"
olanlar var, "şablon/rehber" olanlar var. Aşağıda hangisi hangisi net.

## 1) robots.txt + sitemap.xml + manifest.json (404 hatası) → DROP-IN
- `app/robots.ts` → projenizin `app/` klasörüne kopyalayın.
- `app/sitemap.ts` → projenizin `app/` klasörüne kopyalayın. **Ama içindeki
  `getDestinationSlugs`/`getBundleSlugs` fonksiyonlarındaki DB bağlantı
  satırını (`import { neon } from '@neondatabase/serverless'`) kendi
  mevcut Postgres bağlantı dosyanıza göre güncelleyin** — muhtemelen
  zaten bir `lib/db.ts` benzeri dosyanız var, aynı client'ı kullanın.
- `app/manifest.ts` → projenizin `app/` klasörüne kopyalayın. İçindeki
  `icons` yollarını gerçek logo dosya adlarınızla güncelleyin (192x192
  ve 512x512 PNG önerilir, yoksa oluşturmanız gerekir).

Not: Eğer projenizde zaten `app/robots.ts` veya `app/sitemap.ts` varsa
(notlarınızda "mevcut" yazıyordu), yeni deploy'da bunların gerçekten
repo'ya dahil olup olmadığını ve `vercel.json`/`.vercelignore` gibi bir
dosyanın bunları dışlamadığını kontrol edin — 404 almanızın sebebi
muhtemelen "kod var ama deploy'a girmemiş".

## 2) Meta description / Open Graph / canonical eksikliği → KISMEN DROP-IN
- `app/metadata-templates.ts` → Next.js sayfaları (`/destinations`,
  `/destinations/[slug]`, `/bundles`, `/bundles/[slug]`) için hazır
  `generateMetadata` şablonu. İçindeki yorum satırlarını takip ederek
  ilgili `page.tsx` dosyalarınıza taşıyın.
- `static-pages-head-snippet.html` → `/platform`, `/experiences`,
  `/about` statik bundler sayfalarınız Next.js metadata sistemini
  kullanmadığı için bu üçü **düz HTML `<head>` bloğu** olarak veriliyor.
  İlgili `public/static-pages/*/index.html` dosyalarının `</head>`
  etiketinden hemen önce yapıştırın.
- Görsel yolları (`og:image`) şu an placeholder — gerçek 1200x630
  boyutunda OG görselleri hazırlayıp `public/og/` klasörüne eklemeniz
  gerekiyor. Yoksa Google/WhatsApp önizlemesinde görsel boş kalır.

## 3) Tekrarlayan React render hatası + gereksiz network trafiği → REHBER
- `REACT-DOUBLE-ROOT-FIX.md` — bu, hazır kod değil çünkü sorun sizin
  özel tarayıcı-içi Babel/bundler sisteminizin içinde ve o kodu
  görmüyorum. Dosyada tam olarak ne arayacağınızı, hatalı ve doğru
  kod örüntüsünü ve neden olduğunu adım adım anlattım.

## 4) Sticky header içerik üst binmesi → DROP-IN (class isimleri hariç)
- `styles/sticky-header-fix.css` → `globals.css`'inize ekleyin.
  `--header-height` değerini DevTools'tan ölçtüğünüz gerçek header
  yüksekliğiyle, `.bundles-section-heading` gibi class isimlerini de
  kendi component'lerinizdeki gerçek class adlarıyla değiştirin.

## 5) Footer'da güven unsurları eksik → ŞABLON (linkler placeholder)
- `components/FooterTrustBlock.tsx` → mevcut Footer component'inize
  entegre edin. İçindeki WhatsApp numarası, Instagram/Facebook linkleri
  **placeholder** — gerçek hesap/numaralarınızla değiştirmeden
  yayınlamayın (boş link kötü izlenim bırakır).
- Eğer footer, statik bundler sayfalarının (`/platform` vb.) içindeyse,
  aynı not `REACT-DOUBLE-ROOT-FIX.md`'de olduğu gibi geçerli: JSX'i
  Python ile JSON-encode edip o sayfalara elle taşımanız gerekecek.

## Önerilen sıra
1. robots/sitemap/manifest (en hızlı, riski en düşük, hemen deploy edilebilir)
2. Sticky header CSS düzeltmesi (düşük risk)
3. Meta/OG etiketleri (OG görselleri hazırlamanız gerektiği için biraz
   zaman alır ama SEO/paylaşım etkisi yüksek)
4. Footer güven unsurları (gerçek linkleri toplamanız gerekiyor)
5. React double-root hatası (en çok kod okuması gerektiren, ama
   performans açısından en önemlisi — mobil kullanıcılarda fark yaratır)

Her değişiklikten sonra `visitvam.com/robots.txt`, `/sitemap.xml`,
`/manifest.webmanifest` adreslerini tarayıcıdan elle kontrol edip 200
döndüğünden emin olun.
