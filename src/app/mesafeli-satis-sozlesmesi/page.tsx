import LegalLayout from "../components/LegalLayout";

export default function MesafeliSatisSozlesmesiPage() {
  return (
    <LegalLayout title="Mesafeli Satış Sözleşmesi" updatedDate="28 Haziran 2026">
      <p>
        Bu sözleşme, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
        Mesafeli Sözleşmeler Yönetmeliği hükümleri çerçevesinde, VAM (Visit
        Anatolia and Mesopotamia) platformu üzerinden gerçekleştirilen
        satışlara ilişkin tarafların hak ve yükümlülüklerini düzenler.
      </p>

      <h2>1. Taraflar</h2>
      <h3>Satıcı</h3>
      <p>
        Unvan: <span className="placeholder">Narin Kalçık</span> (şahıs
        işletmesi)
        <br />
        Adres: Tuşba/Van, Türkiye —{" "}
        <span className="placeholder">[açık adres]</span>
        <br />
        Vergi Dairesi / VKN: <span className="placeholder">[bilgi]</span>
        <br />
        E-posta: <span className="placeholder">[e-posta adresi]</span>
        <br />
        Telefon: <span className="placeholder">[telefon numarası]</span>
      </p>

      <h3>Alıcı</h3>
      <p>
        Web sitesi üzerinden rezervasyon/satın alma işlemi gerçekleştiren
        gerçek veya tüzel kişi (&quot;Alıcı&quot;).
      </p>

      <h2>2. Sözleşmenin Konusu</h2>
      <p>
        Bu sözleşmenin konusu, Alıcı&apos;nın VAM web sitesi üzerinden
        elektronik ortamda sipariş verdiği seyahat paketi/hizmetinin
        (&quot;Hizmet&quot;) satışı ve ifasına ilişkin tarafların hak ve
        yükümlülüklerinin belirlenmesidir. Hizmetin türü, kapsamı, süresi ve
        bedeli, ilgili paket sayfasında ve sipariş onayında belirtilen
        bilgilerle birlikte bu sözleşmenin ayrılmaz parçasıdır.
      </p>

      <h2>3. Hizmetin Niteliği</h2>
      <p>
        Satılan hizmet, Doğu Anadolu ve Mezopotamya bölgesinde kültürel
        turizm kapsamında sunulan rehberli tur, konaklama, ulaşım ve/veya
        deneyim paketlerinden oluşur. Hizmet detayları (tarih, süre, dahil
        olan kalemler) ilgili paket sayfasında belirtilir.
      </p>

      <h2>4. Bedel ve Ödeme</h2>
      <p>
        Hizmet bedeli, sipariş sırasında Alıcı&apos;ya açıkça gösterilen
        tutardır ve vergiler dahildir. Ödeme, web sitesi üzerinden entegre
        ödeme kuruluşu (iyzico) aracılığıyla kredi/banka kartı ile
        gerçekleştirilir.
      </p>

      <h2>5. Cayma Hakkı</h2>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesi uyarınca,{" "}
        <strong>belirli bir tarihte veya dönemde yapılması gereken
        konaklama, eşya taşıma, araç kiralama, yiyecek-içecek tedariki ve
        boş zamanın değerlendirilmesine ilişkin sözleşmelerde</strong>{" "}
        Alıcı, cayma hakkını kullanamaz. Bu kapsamda, belirli bir tarihe
        bağlı seyahat paketlerinde yasal cayma hakkı istisnası uygulanabilir.
      </p>
      <p>
        Bununla birlikte, iptal ve iade talepleriniz{" "}
        <a href="/iptal-iade-politikasi">İptal ve İade Politikası</a>{" "}
        sayfamızda belirtilen ticari koşullar çerçevesinde değerlendirilir.
      </p>

      <h2>6. Hizmetin İfası</h2>
      <p>
        Hizmet, sipariş onayında belirtilen tarih ve koşullarda ifa edilir.
        Mücbir sebepler (doğal afet, hava koşulları, resmi makam kararları
        vb.) nedeniyle hizmetin ifa edilememesi halinde Alıcı bilgilendirilir
        ve alternatif tarih veya iade seçenekleri sunulur.
      </p>

      <h2>7. Alıcının Beyanı</h2>
      <p>
        Alıcı, sipariş öncesinde paket içeriği, fiyatı, ödeme şekli, ifa
        koşulları ile iptal/iade şartları hakkında ön bilgilendirme aldığını,
        bu bilgileri elektronik ortamda teyit ettiğini ve sözleşmeyi
        kurduğunu kabul eder.
      </p>

      <h2>8. Kişisel Verilerin Korunması</h2>
      <p>
        Alıcı&apos;nın paylaştığı kişisel veriler{" "}
        <a href="/gizlilik-politikasi">Gizlilik Politikası</a> kapsamında
        işlenir.
      </p>

      <h2>9. Uyuşmazlıkların Çözümü</h2>
      <p>
        Bu sözleşmeden kaynaklanan uyuşmazlıklarda, Alıcı&apos;nın
        ikametgâhının bulunduğu yerdeki Tüketici Hakem Heyetleri ve Tüketici
        Mahkemeleri yetkilidir.
      </p>

      <h2>10. Yürürlük</h2>
      <p>
        Bu sözleşme, Alıcı&apos;nın sipariş onayı sırasında elektronik olarak
        kabul etmesiyle yürürlüğe girer.
      </p>
    </LegalLayout>
  );
}
