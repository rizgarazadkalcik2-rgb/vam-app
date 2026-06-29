# VAM Platform — Güvenlik Düzeltmeleri

## Kurulum
1. Bu zip'i indir, çıkar.
2. İçindeki `src/` klasörünü ve `next.config.ts` dosyasını repo klasörünün
   üzerine kopyala (**Birleştir** — mevcut dosyaların üzerine yazılacak).
3. GitHub Desktop'ta commit + push yap.
4. Vercel otomatik deploy edecek.

İlk deploy sonrası veritabanı şeması otomatik güncellenir (yeni `failed_attempts`
ve `locked_until` kolonları `users` tablosuna eklenir) — elle bir şey yapmana
gerek yok.

---

## Yapılan Düzeltmeler

### 1. Hesap Bazlı Kilitleme (Brute-Force Koruması)
Bir kullanıcı adı için **5 başarısız giriş denemesinden sonra** o hesap
**15 dakika** kilitleniyor. Doğru şifre girilse bile bu süre boyunca giriş
engellenir. Başarılı bir girişte sayaç sıfırlanır.

### 2. IP Bazlı Hız Sınırlama
Aynı IP adresinden **5 dakikada en fazla 10 giriş denemesi** yapılabiliyor —
bu, farklı kullanıcı adlarıyla otomatik deneme yapan saldırılara karşı ek bir
katman. (Not: Bu sınırlama sunucu belleğinde tutuluyor; Vercel'in sunucusuz
yapısı nedeniyle %100 garantili değil ama hızlı/otomatik saldırıları önemli
ölçüde yavaşlatır. İleride kalıcı bir çözüm için Vercel KV/Upstash Redis
eklenmesi önerilir.)

### 3. Güvenlik HTTP Header'ları (next.config.ts)
Tüm sayfalara şu header'lar eklendi:
- `X-Frame-Options: DENY` — sitenin başka bir sitede iframe içinde
  gösterilmesini (clickjacking) engeller
- `X-Content-Type-Options: nosniff` — tarayıcının dosya tipini "tahmin
  etmesini" engeller
- `Strict-Transport-Security` — tarayıcıyı her zaman HTTPS kullanmaya zorlar
- `Referrer-Policy` — başka sitelere geçişte URL bilgisinin sızmasını azaltır
- `Permissions-Policy` — kamera/mikrofon/konum gibi izinleri varsayılan
  olarak kapatır
- `Content-Security-Policy` — sitenin sadece kendi kaynaklarından script/stil
  yükleyebilmesini sağlar (not: statik sayfalardaki tarayıcı-içi JSX
  dönüşümü nedeniyle `unsafe-inline`/`unsafe-eval` zorunlu olarak açık
  bırakıldı — bu olmadan site çalışmaz)

## Değiştirilen Dosyalar
- `next.config.ts` — güvenlik header'ları eklendi
- `src/lib/schema.ts` — `users` tablosuna kilitleme kolonları eklendi
- `src/lib/users.ts` — kilitleme/deneme sayacı fonksiyonları eklendi
- `src/lib/rateLimit.ts` — **yeni dosya**, IP bazlı hız sınırlayıcı
- `src/app/api/auth/login/route.ts` — kilitleme ve hız sınırlama mantığı eklendi

## Test Edildi
- `npx tsc --noEmit` ile tip kontrolü hatasız geçti.

## Henüz Yapılmayanlar (İleride Değerlendirilebilir)
- Kalıcı/dağıtık hız sınırlama (Upstash Redis / Vercel KV)
- Admin paneli için iki faktörlü doğrulama (2FA)
- Otomatik güvenlik açığı taraması (Dependabot / `npm audit` periyodik kontrol)
