# VAM (Visit Anatolia and Mesopotamia) — visitvam.com

Kültürel turizm platformu, Avrupa diasporası pazarını hedefliyor. Bu dosyayı her oturumda oku ve kurallara uy.

## Dil ve iletişim
- Geliştirici (Rizgar) ile Türkçe iletişim kur: açıklamalar, commit mesajı önerileri, plan özetleri Türkçe olsun.
- Kod ve değişken isimleri İngilizce kalabilir (mevcut kod tabanı İngilizce).

## Tech Stack
- **Framework:** Next.js (App Router)
- **Hosting:** Vercel
- **Veritabanı:** Neon PostgreSQL — SADECE `@vercel/postgres` paketi üzerinden erişilir, `POSTGRES_URL` env değişkeni kullanılır.
- **Dosya depolama:** Vercel Blob
- **Deployment:** GitHub Desktop ile commit/push (terminal komutları kullanılmıyor). Deploy Vercel'in GitHub entegrasyonu üzerinden otomatik tetiklenir.

## KRİTİK — Asla yapılmaması gerekenler

### 1. Yanlış veritabanı importu
`@neondatabase/serverless` proje içinde mevcut ama **geçerli bir env değişkenine bağlı değil** ve **sessizce başarısız olur** (hata fırlatmaz, sadece çalışmaz). Her zaman `@vercel/postgres` kullan. Eğer bir dosyada `@neondatabase/serverless` importu görürsen bunu bir hata olarak işaretle, düzeltmeden geçme.

### 2. Statik sayfa mimarisi (/platform, /experiences, /about)
Bu üç sayfa normal Next.js sayfası **DEĞİL**. `public/static-pages/` altında double-JSON-encoded JSX olarak saklanıyor ve tarayıcıda Babel Standalone ile derleniyor.
- Bu dosyaları **asla doğrudan düz metin editörü mantığıyla düzenleme.**
- Düzenleme öncesi decode, düzenleme sonrası re-encode gerekiyor (Python pipeline).
- Re-encode sırasında **forward-slash escaping zorunlu** — atlanırsa sayfa production'da bozulur.
- Bu sayfalarda değişiklik istendiğinde önce mevcut decode/encode scriptini proje içinde ara (yoksa oluşturmadan önce Rizgar'a sor).

### 3. Geri dönüşü olmayan işlemler
- `git push`, force push, branch silme gibi geri dönüşü zor işlemler öncesi her zaman onay iste.
- Production veritabanında DELETE/UPDATE öncesi mutlaka onay iste ve etkilenen satır sayısını önce SELECT ile göster.

## Proje yapısı — bilinmesi gerekenler

**i18n (TR/DE):**
`src/lib/dictionary.ts` + `src/lib/i18n.ts` + `vam_lang` cookie ile yönetiliyor. Yeni metin eklerken her iki dile de karşılık gelen key eklenmeli.

**Admin CMS:**
Block tabanlı sayfa düzenleme sistemi — `platform_stats`, `page_sections`, `announcement` tabloları üzerinden çalışır. Sidebar bileşeni: `AdminShell`.

**Match Weekends verticali:**
Şu anki takımlar: Amedspor, Vanspor FK, Batman Petrol Spor, Mardin 1969 Spor, Iğdır FK. Maç verileri `match_events` tablosu üzerinden CRUD panelinden yönetiliyor.

**Diğer önemli özellikler:** Bundle rezervasyon sistemi, agency profil alanları, sitemap (24 URL).

## Çalışma tercihleri
- Rizgar dosya teslimini genelde zip-extract ile proje klasörüne yapıyordu; artık Claude Code doğrudan klasörde çalıştığı için buna gerek yok, ama eski zip'lerden kalan klasör çakışmaları görürsen (Finder'ın klasörü birleştirmek yerine değiştirmesinden kaynaklanan silinmiş dosyalar) şüphelen ve kontrol et.
- Karmaşık veya çok dosyalı değişikliklerde önce Plan modunda yaklaşımı özetle, onay aldıktan sonra uygula.
- Değişiklik sonrası mümkünse local'de önizleme yap (dev server + embedded browser) ve kendi değişikliğini doğrula.

## VAM Skill Library
Ayrıca `/mnt/skills/user/vam-skill-library/` altında (Claude.ai tarafında) ödeme, SEO, sosyal medya, operasyon konularını kapsayan modüler skill dosyaları var (Skill 12–23). Bu dosya o kütüphanenin yerini tutmaz — teknik/mimari kurallara odaklanır.
