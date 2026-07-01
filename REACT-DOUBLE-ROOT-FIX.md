# React "createRoot çağrısı tekrarlanıyor" Hatası — Teşhis ve Düzeltme Rehberi

## Bu dosyayı neden hazır kod olarak değil, rehber olarak veriyorum
Bu hata `/platform`, `/experiences`, `/about` sayfalarınızın kullandığı
**özel tarayıcı-içi Babel/bundler sistemi**nden kaynaklanıyor. O sistemin
gerçek script kodunu (JSX'i tarayıcıda derleyip DOM'a mount eden kısım)
görmediğim için doğrudan bir dosya olarak "düzeltilmiş hali"ni veremiyorum
— ama neyi arayacağınızı ve nasıl düzelteceğinizi net olarak gösterebilirim.

## Bulgu (canlı sitede gözlemlediğim)
Konsolda tekrar eden şu uyarı var:

```
Warning: You are calling ReactDOMClient.createRoot() on a container that
has already been passed to createRoot() before. Instead, call
root.render() on the existing root instead if you want to update it.
```

Aynı anda, birkaç saniye içinde aynı `blob:` görsel URL'lerine
**70'in üzerinde tekrarlayan istek** (503 ile sonuçlanan) gönderiliyor.
Bu ikisi birlikte şunu gösteriyor: bir bileşen (muhtemelen hero
bölümündeki tıklanabilir chip'ler — "Göbeklitepe / Van Kalesi / Mardin..."
— arka plan görselini değiştiren mekanizma) her tıklamada veya belirli
bir interval'de **yeni bir React root oluşturuyor**, eskisini
temizlemeden.

## Kod tabanınızda arayacağınız şeyler

1. **`public/static-pages/platform/index.html`, `experiences/index.html`,
   `about/index.html`** dosyalarındaki `<script>` bloklarında
   `ReactDOM.createRoot(` veya `ReactDOMClient.createRoot(` geçen yerleri
   arayın.

2. Muhtemel hatalı örüntü:
   ```js
   function renderApp() {
     const container = document.getElementById('root');
     const root = ReactDOM.createRoot(container); // <-- HER ÇAĞRIDA YENİDEN OLUŞTURULUYOR
     root.render(<App />);
   }

   // Hero chip'e tıklanınca veya state değişince tekrar çağrılıyor:
   chipButton.addEventListener('click', () => {
     updateBackgroundImage();
     renderApp(); // <-- BURASI SORUN
   });
   ```

3. **Doğru örüntü** — root'u bir kez oluşturup dışarıda saklamak,
   sonraki güncellemelerde sadece `root.render()` çağırmak:
   ```js
   let cachedRoot = null;

   function renderApp() {
     const container = document.getElementById('root');
     if (!cachedRoot) {
       cachedRoot = ReactDOM.createRoot(container);
     }
     cachedRoot.render(<App />);
   }
   ```

4. Eğer bu bundler sisteminde her JSX güncellemesi (örn. hero chip
   tıklaması) **tüm sayfayı yeniden derleyip yeniden mount ediyorsa**
   (Babel transform'u her seferinde baştan çalıştırıyorsa), bu zaten
   mimari olarak maliyetli bir yöntem. Kısa vadeli çözüm yukarıdaki
   "root cache" düzeltmesi; orta vadeli çözüm ise chip tıklamasında
   sadece ilgili state'i güncelleyip React'in kendi diffing/render
   döngüsüne bırakmak (yani tüm uygulamayı yeniden mount etmemek).

## blob: URL 503 fırtınasıyla bağlantısı
Her `createRoot` + tam re-mount döngüsünde, hero arka plan görseli
muhtemelen `URL.createObjectURL()` ile yeniden oluşturuluyor ama eski
blob URL `URL.revokeObjectURL()` ile temizlenmiyor, üstüne bir de
component her mount'ta görseli tekrar fetch etmeye çalışıyor. Root
double-mount sorunu çözülünce bu istek fırtınası da büyük ölçüde
azalacaktır. Yine de emin olmak için görsel değiştirme fonksiyonunuzda
şu deseni uygulayın:

```js
let currentBlobUrl = null;

function setHeroBackground(newBlob) {
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl); // eskiyi temizle
  }
  currentBlobUrl = URL.createObjectURL(newBlob);
  heroElement.style.backgroundImage = `url(${currentBlobUrl})`;
}
```

## Orta-uzun vadeli önerim
"Bilinen Açık Konular" listenizde zaten şu madde vardı:
> Babel in-browser — platform/experiences/about sayfaları hâlâ
> tarayıcıda JSX derliyor

Bu üç sayfayı gerçek Next.js `page.tsx` dosyalarına taşımanız hem bu
sınıf hataları kökten çözer (React artık kendi lifecycle'ını normal
şekilde yönetir), hem de `metadata-templates.ts`'teki `generateMetadata`
sistemini bu sayfalarda da kullanabilmenizi sağlar (şu an için sadece
HTML `<head>` snippet'iyle idare ediyoruz). Acil değil ama backlog'a
almanızı öneririm.
