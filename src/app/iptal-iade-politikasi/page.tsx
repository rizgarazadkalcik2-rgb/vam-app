import LegalLayout from "../components/LegalLayout";

export default function IptalIadePolitikasiPage() {
  return (
    <LegalLayout title="İptal ve İade Politikası" updatedDate="28 Haziran 2026">
      <p>
        Bu sayfa, VAM (Visit Anatolia and Mesopotamia) üzerinden satın
        alınan paket ve hizmetlerin iptal ve iade koşullarını açıklar.
        Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler
        Yönetmeliği kapsamındaki haklarınız bu politika ile birlikte
        geçerlidir.
      </p>

      <h2>1. Genel İptal Süreleri</h2>
      <p>
        Standart koşullar altında, rezervasyon tarihinden{" "}
        <strong>en az 7 gün önce</strong> yapılan iptal talepleri için ödenen
        tutarın tamamı iade edilir.
      </p>
      <p>
        <strong>Önemli:</strong> Bazı paketler (örneğin sınırlı kontenjanlı
        turlar, özel rehberli deneyimler veya üçüncü taraf tesislerle
        anlaşmalı konaklamalar) için farklı iptal süreleri ve koşulları
        uygulanabilir. Geçerli olan özel şartlar, ilgili paketin satın alma
        sayfasında ve rezervasyon onay e-postasında ayrıca belirtilir. Satın
        alma öncesinde paket detaylarındaki iptal koşullarını incelemenizi
        rica ederiz.
      </p>

      <h2>2. Geç İptal ve Katılmama (No-Show) Durumu</h2>
      <p>
        Belirtilen iptal süresi geçtikten sonra yapılan iptal talepleri ile
        rezervasyon tarihinde hizmete katılmama (no-show) durumlarında{" "}
        <strong>ödenen tutar iade edilmez</strong>. Bu kural; rehber, ulaşım,
        konaklama ve diğer hizmet sağlayıcılarla yapılan bağlayıcı
        anlaşmalardan kaynaklanan maliyetler nedeniyle uygulanmaktadır.
      </p>

      <h2>3. İptal Talebi Nasıl Yapılır</h2>
      <p>İptal talebinizi aşağıdaki yollardan birini kullanarak iletebilirsiniz:</p>
      <ul>
        <li>
          E-posta: <span className="placeholder">[e-posta adresi]</span>
        </li>
        <li>
          Telefon: <span className="placeholder">[telefon numarası]</span>
        </li>
      </ul>
      <p>
        Talebinizde rezervasyon numaranızı, paket adını ve iptal sebebinizi
        belirtmeniz işlemin hızlanmasını sağlar.
      </p>

      <h2>4. İade Süreci</h2>
      <p>
        Onaylanan iadeler, ödemenin yapıldığı kredi kartına veya banka
        hesabına, talebin onaylanmasından itibaren ortalama{" "}
        <strong>7-14 iş günü</strong> içinde yansıtılır. Bu süre, bankanızın
        veya ödeme kuruluşunun işlem sürelerine bağlı olarak değişebilik
        gösterebilir.
      </p>

      <h2>5. VAM Tarafından İptal Edilen Turlar</h2>
      <p>
        Yetersiz katılım, hava koşulları, güvenlik gerekçeleri veya
        öngörülemeyen mücbir sebepler nedeniyle bir turun VAM tarafından
        iptal edilmesi halinde, ödenen tutarın tamamı iade edilir veya
        talebiniz halinde başka bir tarihe/pakete aktarılır.
      </p>

      <h2>6. Değişiklik Talepleri</h2>
      <p>
        Rezervasyon tarihi veya katılımcı sayısı değişikliği talepleri,
        müsaitlik durumuna bağlı olarak değerlendirilir. Değişiklik talepleri
        de iptal süreleriyle aynı zaman çizelgesine tabidir.
      </p>

      <h2>7. Mesafeli Sözleşmeler Yönetmeliği Kapsamındaki Haklarınız</h2>
      <p>
        Türk hukuku kapsamında, hizmetin ifasına başlanmamış olması
        koşuluyla cayma hakkınız bulunabilir. Cayma hakkına ilişkin detaylar{" "}
        <a href="/mesafeli-satis-sozlesmesi">Mesafeli Satış Sözleşmesi</a>{" "}
        sayfamızda yer almaktadır.
      </p>
    </LegalLayout>
  );
}
