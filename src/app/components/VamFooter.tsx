export default function VamFooter() {
  return (
    <footer className="vc-footer">
      <div className="vc-footer-inner">
        <div>
          <div className="vc-footer-logo">VAM</div>
          <p style={{ fontSize: 13, color: "var(--ink-400)", lineHeight: 1.6 }}>
            Visit Anatolia and Mesopotamia.
            <br />
            On bin yıllık topraklarda yeni çağın turizmi.
          </p>
        </div>
        <div>
          <h5>Platform</h5>
          <a href="/destinations">Destinasyonlar</a>
          <a href="/bundles">Paketler</a>
          <a href="/experiences">Deneyimler</a>
          <a href="#">Rehberler</a>
          <a href="#">Değerlendirmeler</a>
        </div>
        <div>
          <h5>Şirket</h5>
          <a href="/about">Hakkımızda</a>
          <a href="mailto:info@visitvam.com">İletişim</a>
        </div>
        <div>
          <h5>Destek</h5>
          <a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a>
          <a href="/iptal-iade-politikasi">İptal Politikası</a>
          <a href="/gizlilik-politikasi">Gizlilik</a>
          <a href="/teslimat-hizmet-sartlari">Hizmet Şartları</a>
          <a href="/giris">Acente / Yönetici Girişi</a>
        </div>
      </div>
      <div className="vc-footer-bottom">© 2026 VAM · Visit Anatolia and Mesopotamia</div>
    </footer>
  );
}
