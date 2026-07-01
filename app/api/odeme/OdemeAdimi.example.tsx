// ÖRNEK: rezervasyon sayfanızda "Ödemeye Geç" adımı
// (app/rezervasyon/[packageId]/OdemeAdimi.tsx gibi bir client component)
//
// Mantık: /api/odeme/baslat'a istek atarsınız, dönen
// checkoutFormContent'i bir div'in innerHTML'ine basarsınız.
// İyzico'nun formu (kart bilgisi girme ekranı) o div'in içinde açılır.
// Kullanıcı ödemeyi tamamlayınca İyzico onu otomatik olarak
// callbackUrl'e (route.ts'teki /api/odeme/callback) yönlendirir.

'use client'

import { useState } from 'react'

export function OdemeAdimi({
  packageId,
  guestCount,
}: {
  packageId: string
  guestCount: number
}) {
  const [loading, setLoading] = useState(false)
  const [formContent, setFormContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleOdemeyeGec(customer: {
    name: string
    surname: string
    email: string
    phone: string
    address: string
    city: string
    country: string
  }) {
    setLoading(true)
    setError(null)

    const res = await fetch('/api/odeme/baslat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ packageId, guestCount, customer }),
    })

    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || 'Ödeme başlatılamadı, lütfen tekrar deneyin.')
      return
    }

    setFormContent(data.checkoutFormContent)
  }

  // NOT: Gerçek formda customer bilgilerini bir form'dan toplayıp
  // handleOdemeyeGec'e verin. Burada sadece iskelet gösteriliyor.

  return (
    <div>
      {!formContent && (
        <button
          disabled={loading}
          onClick={() =>
            handleOdemeyeGec({
              name: 'Ad',
              surname: 'Soyad',
              email: 'ornek@mail.com',
              phone: '+905551112233',
              address: 'Adres',
              city: 'İstanbul',
              country: 'Turkey',
            })
          }
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {loading ? 'Yükleniyor...' : 'Ödemeye Geç'}
        </button>
      )}

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* İyzico formu bu div'in içine kendi script'iyle birlikte basılır */}
      {formContent && (
        <div
          id="iyzico-checkout-form"
          dangerouslySetInnerHTML={{ __html: formContent }}
        />
      )}
    </div>
  )
}
