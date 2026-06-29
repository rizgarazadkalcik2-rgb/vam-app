# ACİL DÜZELTME: Boş Sayfa / "[bundle] error" Hatası

## Sebep
Önceki güvenlik düzeltmesinde eklenen Content-Security-Policy (CSP) header'ı,
statik sayfaların (platform, experiences, about) kullandığı `blob:` script
yükleme yöntemini engelliyordu. Bu yüzden React/Babel/uygulama kodu hiç
yüklenemiyor, sayfa bomboş kalıyor ve "[bundle] error" 4 kere görünüyordu.

## Düzeltme
`next.config.ts` içindeki Content-Security-Policy satırına `blob:` eklendi
(script-src ve worker-src'e). Tek değişen dosya bu.

## Kurulum
1. Bu zip'i indir, çıkar.
2. İçindeki `next.config.ts` dosyasını repo köküne kopyala (üzerine yaz).
3. GitHub Desktop'ta commit + push yap ("CSP fix: blob: script-src'e eklendi"
   gibi bir mesajla).
4. Vercel otomatik deploy edecek, 1-2 dakika sonra site normale dönecek.
