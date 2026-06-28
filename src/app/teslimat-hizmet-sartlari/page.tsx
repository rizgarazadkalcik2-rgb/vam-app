import LegalLayout from "../components/LegalLayout";

export default function TeslimatHizmetSartlariPage() {
  return (
    <LegalLayout title="Teslimat ve Hizmet Şartları" updatedDate="28 Haziran 2026">
      <p>
        VAM (Visit Anatolia and Mesopotamia) üzerinden satın alınan ürünler
        fiziksel kargo ile teslim edilen mallar değil, belirli bir tarihte
        ifa edilen <strong>seyahat ve deneyim hizmetleridir</strong>. Bu
        sayfa, hizmetin nasıl ve ne zaman sunulacağına ilişkin koşulları
        açıklar.
      </p>

      <h2>1. Rezervasyon Onayı</h2>
      <p>
        Ödemenin başarıyla tamamlanmasının ardından, rezervasyon detaylarınız
        (tarih, paket içeriği, katılımcı sayısı, iletişim bilgileri) kayıtlı
        e-posta adresinize gönderilir. Bu e-posta, rezervasyonunuzun resmi
        onayı niteliğindedir.
      </p>

      <h2>2. Hizmetin Sunum Şekli</h2>
      <p>Satın aldığınız pakete bağlı olarak hizmet aşağıdaki unsurları içerebilir:</p>
      <ul>
        <li>Rehberli tur ve gezi programı</li>
        <li>Konaklama rezervasyonu (anlaşmalı tesisler aracılığıyla)</li>
        <li>Yerel ulaşım organizasyonu</li>
        <li>Giriş ücretleri ve özel deneyimler (pakette belirtilmişse)</li>
      </ul>
      <p>
        Her paketin tam kapsamı, ilgili paket sayfasında ayrıntılı olarak
        belirtilir.
      </p>

      <h2>3. Hizmet Tarihi ve Süresi</h2>
      <p>
        Hizmetin gerçekleştirileceği tarih, rezervasyon sırasında seçilen
        veya onay e-postasında belirtilen tarihtir. Tarih değişikliği
        talepleri{" "}
        <a href="/iptal-iade-politikasi">İptal ve İade Politikası</a>{" "}
        sayfasında belirtilen koşullara tabidir.
      </p>

      <h2>4. Belge ve Bilgilendirme Teslimi</h2>
      <p>
        Rezervasyonunuza ilişkin voucher, program detayları, buluşma noktası
        ve rehber iletişim bilgileri gibi belgeler, hizmet tarihinden önce
        e-posta yoluyla elektronik olarak iletilir. Bu nedenle rezervasyon
        sırasında verdiğiniz e-posta adresinin doğru ve erişilebilir olması
        önemlidir.
      </p>

      <h2>5. Katılımcı Yükümlülükleri</h2>
      <p>
        Hizmetin sorunsuz ifası için katılımcıların aşağıdaki hususlara
        dikkat etmesi gerekir:
      </p>
      <ul>
        <li>Buluşma noktasına belirtilen saatte hazır bulunmak</li>
        <li>Geçerli kimlik/pasaport belgesini yanında bulundurmak</li>
        <li>
          Sağlık durumu, hareket kısıtlılığı veya özel ihtiyaçların
          rezervasyon öncesinde bildirilmesi
        </li>
      </ul>

      <h2>6. Hizmetin Sağlanamaması</h2>
      <p>
        Mücbir sebepler, hava koşulları, güvenlik gerekçeleri veya yerel
        makamların kararları nedeniyle hizmetin planlanan şekilde
        sunulamaması halinde, Alıcı en kısa sürede bilgilendirilir ve
        alternatif tarih, alternatif program veya iade seçenekleri sunulur.
      </p>

      <h2>7. Üçüncü Taraf Hizmet Sağlayıcılar</h2>
      <p>
        Konaklama, ulaşım ve belirli deneyimler, anlaşmalı yerel hizmet
        sağlayıcılar tarafından sunulabilir. Bu hizmet sağlayıcıların kendi
        hizmet şartları ve politikaları da geçerli olabilir; bu durumlarda
        ilgili bilgilendirme paket sayfasında veya rezervasyon onayında
        belirtilir.
      </p>

      <h2>8. İletişim</h2>
      <p>
        Hizmet süreciyle ilgili sorularınız için:{" "}
        <span className="placeholder">[e-posta adresi]</span> ·{" "}
        <span className="placeholder">[telefon numarası]</span>
      </p>
    </LegalLayout>
  );
}
