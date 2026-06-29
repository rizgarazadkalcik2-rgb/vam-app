# VAM Platform — Destinasyonlar & Bundle'lar Admin Panelinden Yönetilebilir Hale Getirildi

## Kurulum
1. Bu zip'i indir, çıkar.
2. İçindeki `src/`, `public/` klasörlerini ve `next.config.ts` dosyasını repo
   klasörünün üzerine **birleştir** (mevcut dosyaların üzerine yazılacak,
   yeni dosyalar eklenecek).
3. GitHub Desktop'ta commit + push yap.
4. Vercel otomatik deploy edecek.

İlk istek geldiğinde veritabanı şeması otomatik güncellenir: `destinations`
ve `bundles` tabloları oluşturulur ve **mevcut 15 destinasyon + 3 bundle
içeriğiyle otomatik doldurulur** (tablo boşsa bir kerelik). Elle bir şey
yapmana gerek yok — sitenin görünümü deploy sonrası aynı kalacak, sadece
artık arka planda admin panelinden yönetilebilir.

---

## Ne Değişti — Mimari

Önceden `/destinations` ve `/bundles` tamamen statik HTML dosyalarıydı;
içerik kodun içine gömülüydü, değiştirmek için her seferinde benimle kod
düzenlemesi + yeni deploy gerekiyordu.

Şimdi:
- **Gerçek Next.js sayfaları** (`/destinations`, `/destinations/[slug]`,
  `/bundles`, `/bundles/[slug]`) — Postgres'ten canlı veri okuyor
- **Admin panelinde 2 yeni sekme**: "Destinasyonlar" ve "Bundle'lar"
- Admin panelinden ekleme/düzenleme/silme/pasifleştirme yaptığında, **anında**
  hem ilgili sayfada hem de ana sayfadaki "Her Şey Dahil Rotalar" kartlarında
  yansıyor — kod değişikliği veya yeni deploy gerekmiyor.

## Admin Panelinde Neler Var

### "Destinasyonlar" sekmesi
Her destinasyon için: isim, bölge, dönem bilgisi, UNESCO rozeti, etiketler,
görsel URL, puan/değerlendirme, tarihçe paragrafları, öne çıkan özellikler,
ziyaret bilgileri (konum, en yakın şehir, süre, en iyi zaman) ve ilgili
destinasyonlar — hepsi formdan düzenlenebiliyor. "Pasifleştir" ile bir
destinasyonu siteden geçici olarak gizleyebilirsin (silmeden).

### "Bundle'lar" sekmesi
Her paket için: başlık, görsel, açıklama, gece sayısı, güzergahtaki
destinasyonlar, fiyat (+ eski fiyat ile indirim gösterimi), pakete dahil
olanlar, rozet (Çok Satan / Yeni vb.) ve durum.

## Görsel Ekleme Hakkında Not
Form'daki "Görsel URL" alanına şu an için bir Vercel Blob linki veya
`/images/destinations/dosya-adi.jpg` gibi bir yol yazman gerekiyor — admin
panelinden doğrudan dosya yükleme henüz bu ekrana bağlanmadı (paket
yönetiminde olduğu gibi). İstersen bunu da bir sonraki adımda ekleyebiliriz.

## Eski Statik Dosyalar Hakkında
`public/static-pages/destinations/` ve `public/static-pages/bundles/`
altındaki eski dosyalar artık **kullanılmıyor** (next.config.ts'teki ilgili
yönlendirmeler kaldırıldı). Onları repodan silmen gerekmiyor — zararsız,
sadece yer kaplıyorlar. İstersen ileride temizlik için kaldırabilirsin.

## Değiştirilen / Eklenen Dosyalar
**Yeni:**
- `src/lib/seedData.ts`, `src/lib/destinations.ts`, `src/lib/bundles.ts`
- `src/app/api/destinations/**`, `src/app/api/bundles/**`
- `src/app/destinations/**`, `src/app/bundles/**` (gerçek sayfalar)
- `src/app/components/VamNavbar.tsx`, `VamFooter.tsx`, `src/app/vam-content.css`
- `src/app/admin/destinasyonlar/**`, `src/app/admin/bundles/**`

**Güncellenen:**
- `src/lib/schema.ts` — yeni tablolar + seed mantığı
- `src/app/layout.tsx` — marka fontları eklendi
- `src/app/admin/AdminNav.tsx` — 2 yeni sekme
- `next.config.ts` — eski statik rewrite'lar kaldırıldı
- `public/static-pages/platform/index.html` — ana sayfadaki bundle kartları
  artık `/api/bundles/public`'ten canlı veri çekiyor

## Test Edildi
- `npx tsc --noEmit` → hatasız
- `npx next build` → başarılı, tüm yeni route'lar doğru şekilde dinamik
  (server-rendered on demand) olarak derlendi
