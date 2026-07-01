# VAM — İyzico Ödeme Entegrasyonu Kurulum Rehberi

## 1) Paket kurulumu
```
npm install iyzipay
```

## 2) Hesap
- **Test için hemen:** https://sandbox-merchant.iyzipay.com — kayıt olun,
  API key + secret key alın. Onay beklemeden çalışmaya başlayabilirsiniz.
- **Canlıya çıkmadan önce:** https://merchant.iyzipay.com üzerinden gerçek
  işyeri başvurusu yapın (vergi levhası, IBAN vb. istenir, onay birkaç
  gün sürebilir). Onaylanınca `IYZICO_BASE_URL`'i canlı adrese çevirip
  gerçek key'lerle değiştirmeniz yeterli — kod tarafında değişiklik
  gerekmez.

## 3) Ortam değişkenleri (Vercel + .env.local)
```
IYZICO_API_KEY=sandbox-xxxxxxxx
IYZICO_SECRET_KEY=sandbox-xxxxxxxx
IYZICO_BASE_URL=https://sandbox-api.iyzipay.com
NEXT_PUBLIC_BASE_URL=https://visitvam.com
```
Canlıya geçince `IYZICO_BASE_URL=https://api.iyzipay.com` yapın ve
sandbox key'leri gerçek key'lerle değiştirin.

## 4) Dosyaların yerleşimi
```
lib/iyzico.ts                          -> İyzico client kurulumu
app/api/odeme/baslat/route.ts          -> ödeme başlatma (checkout form üretir)
app/api/odeme/callback/route.ts        -> İyzico'dan sonuç dönüşü, doğrulama
app/api/odeme/OdemeAdimi.example.tsx   -> frontend örneği (yeniden adlandırıp kullanın)
```

## 5) DB'de eklemeniz gereken alanlar
`reservations` tablonuza (yoksa) şu kolonları ekleyin:
```sql
ALTER TABLE reservations ADD COLUMN payment_status TEXT DEFAULT 'pending';
-- 'pending' | 'paid' | 'failed'
ALTER TABLE reservations ADD COLUMN iyzico_conversation_id TEXT;
ALTER TABLE reservations ADD COLUMN iyzico_payment_id TEXT;
ALTER TABLE reservations ADD COLUMN paid_price NUMERIC;
```
`baslat/route.ts` içindeki `createPendingReservation` ve `callback/route.ts`
içindeki `markReservationPaid`/`markReservationFailed` fonksiyonlarını
kendi `lib/db` katmanınıza göre yazmanız gerekiyor — yorum satırı olarak
nereye ekleneceğini işaretledim.

## 6) Test kartları (sandbox'ta gerçek para çekilmez)
| Kart No | Sonuç |
|---|---|
| 5528790000000008 | Başarılı |
| 4127111111111114 | Başarılı |
| 5406670000000009 | Yetersiz bakiye (başarısız senaryo testi için) |

Son kullanma tarihi: gelecekteki herhangi bir ay/yıl (örn. 12/30), CVC: 123.
Tam liste: https://docs.iyzico.com/en/testing/test-cards

## 7) Akışı test etme sırası
1. Sandbox key'lerle `/rezervasyon/[packageId]` sayfasına gidin
2. "Ödemeye Geç" → checkoutFormContent görünmeli (İyzico'nun formu)
3. Test kartıyla ödeyin
4. `/rezervasyon/basarili?ref=...` sayfasına yönlendiğinizi doğrulayın
5. DB'de `payment_status = 'paid'` olduğunu kontrol edin
6. Onay maili gittiğini kontrol edin (varsa mevcut mail sisteminizle bağlayın)

## 8) Canlıya çıkmadan önce mutlaka
- [ ] `callback/route.ts`'te gerçek `markReservationPaid`/`markReservationFailed`
      fonksiyonları yazıldı (şu an sadece `console.log`)
- [ ] `baslat/route.ts`'te fiyat gerçekten DB'den hesaplanıyor,
      örnek/placeholder fiyat (9600) silindi
- [ ] `identityNumber` alanı gerçek kullanım senaryonuza göre çözüldü
      (yabancı turist ağırlıklı bir platform olduğunuz için İyzico'nun
      yabancı müşteri/pasaport senaryosuna bakmanız gerekebilir —
      docs.iyzico.com'da "foreigner buyer" bölümü var)
- [ ] Sandbox key'ler canlı key'lerle değiştirildi, `IYZICO_BASE_URL`
      canlı adrese çevrildi
- [ ] Onay maili şablonu gerçek rezervasyon detaylarını (paket adı,
      tarih, kişi sayısı, tutar) içeriyor
- [ ] KVKK/gizlilik metninizde ödeme sağlayıcısı olarak İyzico'nun
      geçtiğinden emin olun (zaten "Mesafeli Satış Sözleşmesi" sayfanız
      var, oraya ödeme yöntemi/iade politikası eklenmeli)

## Neden bu yöntemi seçtim (Checkout Form, non-3D API değil)
Kart numarası hiçbir zaman `visitvam.com`'un sunucusuna ya da
tarayıcısındaki JS'e dokunmuyor — direkt İyzico'nun kendi güvenli
formuna giriliyor. Bu sayede PCI-DSS sertifikasyon yükümlülüğü size
değil İyzico'ya ait oluyor. Tek geliştiriciyle yürüyen bir projede kart
verisiyle doğrudan uğraşmak (Non-3D/API entegrasyonu) hem güvenlik hem
de yasal risk açısından anlamsız bir yük — Checkout Form aynı sonucu çok
daha az riskle veriyor.
