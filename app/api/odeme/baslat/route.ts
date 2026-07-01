// app/api/odeme/baslat/route.ts
//
// Bu route, rezervasyon sayfasından "Ödemeye Geç" denince çağrılır.
// İyzico'ya "bu tutar ve bu müşteri bilgileriyle bir Checkout Form
// oluştur" der, dönen checkoutFormContent'i (HTML/script içeren bir
// string) frontend'e geri verir. Frontend bunu bir div'e basar.
//
// ÖNEMLİ: Tutarı (price) ASLA client'tan gelen veriyle almayın —
// aksi halde biri kendi tarayıcısından "1 TL" diye tutar gönderip
// paketi 1 TL'ye rezerve edebilir. Tutarı, DB'deki packageId/bundleId
// kaydından SİZ hesaplayın (aşağıda örneklendi).

import { NextRequest, NextResponse } from 'next/server'
import { iyzipay } from '@/lib/iyzico'
import { randomUUID } from 'crypto'
// Kendi DB erişim katmanınıza göre uyarlayın:
// import { getBundleOrPackageById } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packageId, guestCount, customer } = body
    // customer: { name, surname, email, phone, address, city, country }

    if (!packageId || !customer?.email) {
      return NextResponse.json(
        { error: 'Eksik bilgi: packageId ve müşteri e-postası zorunlu.' },
        { status: 400 }
      )
    }

    // --- 1) Fiyatı SUNUCUDA, DB'den hesaplayın ---
    // const pkg = await getBundleOrPackageById(packageId)
    // if (!pkg) return NextResponse.json({ error: 'Paket bulunamadı' }, { status: 404 })
    // const totalPrice = (pkg.pricePerPerson * (guestCount || 1)).toFixed(2)
    const pkg = { id: packageId, name: 'Örnek Paket', pricePerPerson: 9600 } // ÖRNEK — SİLİN
    const totalPrice = (pkg.pricePerPerson * (guestCount || 1)).toFixed(2)

    // --- 2) Kendi tarafınızda benzersiz bir sipariş/rezervasyon id'si üretin ---
    // Bu id'yi DB'de "pending" (ödeme bekliyor) durumunda bir kayıt olarak
    // saklamanız gerekiyor ki callback geldiğinde eşleştirebilesiniz.
    const conversationId = randomUUID()

    // await createPendingReservation({
    //   conversationId,
    //   packageId,
    //   guestCount,
    //   customerEmail: customer.email,
    //   totalPrice,
    //   status: 'pending',
    // })

    // --- 3) İyzico Checkout Form isteği ---
    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: totalPrice, // sepet toplamı (ürünlerin toplamı)
      paidPrice: totalPrice, // müşterinin ödediği nihai tutar (indirim vs. yoksa aynı)
      currency: Iyzipay.CURRENCY.TRY,
      basketId: `VAM-${conversationId}`,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/odeme/callback`,

      buyer: {
        id: `buyer-${conversationId}`,
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        gsmNumber: customer.phone,
        identityNumber: '11111111111', // TC kimlik zorunlu alan — yabancı müşteri için İyzico'nun "identityNumber" alternatifine bakın
        registrationAddress: customer.address || 'Belirtilmedi',
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        ip: req.headers.get('x-forwarded-for') || '85.34.78.112',
      },

      shippingAddress: {
        contactName: `${customer.name} ${customer.surname}`,
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        address: customer.address || 'Belirtilmedi',
      },
      billingAddress: {
        contactName: `${customer.name} ${customer.surname}`,
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        address: customer.address || 'Belirtilmedi',
      },

      // Sepetteki her kalem (sizde genelde tek kalem: paket/bundle)
      basketItems: [
        {
          id: pkg.id,
          name: pkg.name,
          category1: 'Tur Paketi',
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: totalPrice,
        },
      ],
    }

    const result: any = await new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(request, (err: any, res: any) => {
        if (err) reject(err)
        else resolve(res)
      })
    })

    if (result.status !== 'success') {
      console.error('[iyzico] initialize hata:', result.errorMessage)
      return NextResponse.json(
        { error: result.errorMessage || 'Ödeme başlatılamadı' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      checkoutFormContent: result.checkoutFormContent, // frontend bunu bir div'e basacak
      token: result.token,
      conversationId,
    })
  } catch (err: any) {
    console.error('[iyzico] baslat hata:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
