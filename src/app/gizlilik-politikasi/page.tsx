import LegalLayout from "../components/LegalLayout";

export default function GizlilikPolitikasiPage() {
  return (
    <LegalLayout title="Gizlilik Politikası" updatedDate="28 Haziran 2026">
      <p>
        VAM (Visit Anatolia and Mesopotamia) olarak kişisel verilerinizin
        güvenliğine önem veriyoruz. Bu Gizlilik Politikası, web sitemiz
        üzerinden topladığımız kişisel verilerin hangi amaçlarla işlendiğini,
        kimlerle paylaşıldığını ve veri sahibi olarak haklarınızı açıklar.
      </p>

      <h2>1. Veri Sorumlusu</h2>
      <p>
        Bu platform, <span className="placeholder">Narin Kalçık</span> şahıs
        işletmesi tarafından, Tuşba/Van, Türkiye adresinde işletilmektedir.
        Veri sorumlusu sıfatıyla kişisel verilerinizi 6698 sayılı Kişisel
        Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili Avrupa Birliği
        Genel Veri Koruma Tüzüğü (&quot;GDPR&quot;) hükümlerine uygun olarak
        işliyoruz.
      </p>
      <p>
        İletişim: <span className="placeholder">[e-posta adresi]</span> ·{" "}
        <span className="placeholder">[telefon numarası]</span>
      </p>

      <h2>2. Toplanan Kişisel Veriler</h2>
      <p>Web sitemizi ve hizmetlerimizi kullanırken aşağıdaki veriler toplanabilir:</p>
      <ul>
        <li>Ad, soyad, e-posta adresi, telefon numarası</li>
        <li>Fatura/teslimat adresi bilgileri</li>
        <li>Rezervasyon ve seyahat tercihleri (destinasyon, tarih, kişi sayısı)</li>
        <li>Ödeme işlemine ilişkin sınırlı veriler (kart bilgilerinin tamamı bizde saklanmaz, ödeme kuruluşu tarafından işlenir)</li>
        <li>Site kullanım verileri (IP adresi, tarayıcı bilgisi, çerezler)</li>
      </ul>

      <h2>3. Verilerin İşlenme Amaçları</h2>
      <ul>
        <li>Rezervasyon ve paket satın alma işlemlerinin gerçekleştirilmesi</li>
        <li>Müşteri hizmetleri ve destek taleplerinin yanıtlanması</li>
        <li>Yasal yükümlülüklerin (fatura düzenleme, muhasebe kayıtları) yerine getirilmesi</li>
        <li>Hizmet kalitesinin artırılması ve site performansının analiz edilmesi</li>
        <li>Açık rızanız bulunması halinde pazarlama ve bilgilendirme iletişimleri</li>
      </ul>

      <h2>4. Verilerin Paylaşıldığı Taraflar</h2>
      <p>Kişisel verileriniz, hizmetin sunulması için gerekli olduğu ölçüde aşağıdaki taraflarla paylaşılabilir:</p>
      <ul>
        <li>Ödeme işlemlerini gerçekleştiren ödeme kuruluşu (iyzico ve ilgili bankalar)</li>
        <li>Rezervasyonun gerçekleştirileceği yerel tur operatörleri, rehberler ve konaklama tesisleri</li>
        <li>Yasal zorunluluk halinde yetkili kamu kurum ve kuruluşları</li>
      </ul>
      <p>
        Verileriniz, yukarıda belirtilenler dışında üçüncü taraflarla
        ticari amaçla paylaşılmaz veya satılmaz.
      </p>

      <h2>5. Veri Saklama Süresi</h2>
      <p>
        Kişisel verileriniz, işleme amacının gerektirdiği süre ve yasal
        saklama yükümlülükleri (örneğin Vergi Usul Kanunu kapsamındaki
        belgeler için 5 yıl) boyunca saklanır. Süre sonunda veriler silinir,
        yok edilir veya anonim hale getirilir.
      </p>

      <h2>6. Çerezler (Cookies)</h2>
      <p>
        Sitemiz, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz
        etmek amacıyla çerezler kullanmaktadır. Tarayıcı ayarlarınızdan
        çerezleri devre dışı bırakabilirsiniz; ancak bu durumda sitenin bazı
        özellikleri düzgün çalışmayabilir.
      </p>

      <h2>7. Veri Sahibinin Hakları</h2>
      <p>KVKK madde 11 ve GDPR madde 15-22 kapsamında aşağıdaki haklara sahipsiniz:</p>
      <ul>
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenen verilere ilişkin bilgi talep etme</li>
        <li>Verilerin düzeltilmesini veya silinmesini talep etme</li>
        <li>İşlemeye itiraz etme ve rıza geri çekme</li>
        <li>Verilerinizin başka bir veri sorumlusuna aktarılmasını talep etme (veri taşınabilirliği)</li>
      </ul>
      <p>
        Bu haklarınızı kullanmak için{" "}
        <span className="placeholder">[e-posta adresi]</span> üzerinden
        bizimle iletişime geçebilirsiniz.
      </p>

      <h2>8. Veri Güvenliği</h2>
      <p>
        Kişisel verilerinizin güvenliğini sağlamak için uygun teknik ve
        idari tedbirler alınmaktadır. Ödeme bilgileriniz doğrudan tarafımızca
        saklanmaz; PCI-DSS uyumlu ödeme kuruluşu altyapısı üzerinden işlenir.
      </p>

      <h2>9. Politika Değişiklikleri</h2>
      <p>
        Bu Gizlilik Politikası zaman zaman güncellenebilir. Güncel sürüm her
        zaman bu sayfada yayınlanır.
      </p>
    </LegalLayout>
  );
}
