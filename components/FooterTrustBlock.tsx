// FOOTER GÜVEN UNSURLARI — eklenecek blok
// -----------------------------------------------------------------
// Mevcut Footer component'inizin içine (muhtemelen components/Footer.tsx
// veya static-pages'teki footer JSX'i içine) aşağıdaki bloğu ekleyin.
// Bu, "PLATFORM / ŞİRKET / DESTEK" sütunlarının yanına 4. bir
// "İLETİŞİM" sütunu ve sosyal medya ikonları ekler.
//
// TAILWIND class'ları kullanıldı — kendi projenizde farklı bir
// class sisteminiz varsa (CSS modules, styled-components vb.)
// mantığı koruyup class isimlerini kendinize göre uyarlayın.

export function FooterTrustBlock() {
  return (
    <div className="footer-contact-column">
      <h4 className="text-xs tracking-widest uppercase text-neutral-400 mb-4">
        İletişim
      </h4>

      <ul className="space-y-2 text-sm text-neutral-300">
        <li>
          <a href="mailto:info@visitvam.com" className="hover:text-white transition">
            info@visitvam.com
          </a>
        </li>
        <li>
          {/* Gerçek WhatsApp/telefon numaranızla değiştirin */}
          <a href="https://wa.me/905XXXXXXXXX" className="hover:text-white transition">
            WhatsApp Destek
          </a>
        </li>
      </ul>

      {/* Sosyal medya ikonları — gerçek hesap linklerinizle değiştirin */}
      <div className="flex gap-4 mt-5">
        <a
          href="https://instagram.com/visitvam"
          aria-label="VAM Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition"
        >
          {/* Instagram ikonu - lucide-react veya kendi ikon setiniz */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a
          href="https://facebook.com/visitvam"
          aria-label="VAM Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-white transition"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      {/* Güven rozetleri — SSL/güvenli ödeme. Şimdilik ödeme entegrasyonu
          olmadığı için (İyzico bekleniyor) sadece SSL/güvenli site
          vurgusu yeterli; ödeme rozetleri İyzico entegre olunca eklenir. */}
      <div className="flex items-center gap-2 mt-5 text-xs text-neutral-500">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <span>Güvenli bağlantı (SSL)</span>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------
   Eğer footer, /platform, /experiences, /about gibi statik bundler
   sayfalarında JSON-encode edilmiş JSX içindeyse: bu component'i
   doğrudan oraya import edemezsiniz. Onun yerine yukarıdaki JSX'in
   İÇERİĞİNİ, o sayfaların bundler template'i içindeki footer JSX'ine
   manuel olarak (Python json.dumps ile paketleme adımınızda) taşımanız
   gerekir — üç sayfada da AYNI footer'ı kullandığınızı varsayıyorum.
--------------------------------------------------------------- */
