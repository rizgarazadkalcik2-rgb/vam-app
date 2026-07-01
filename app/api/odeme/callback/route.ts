// app/api/odeme/callback/route.ts
//
// İyzico, ödeme tamamlandığında (başarılı ya da başarısız) kullanıcıyı
// bu URL'ye bir "token" ile birlikte POST eder. BURADA YAPMANIZ GEREKEN
// TEK ŞEY: gelen token'ı alıp İyzico'ya "bu token'ın gerçek durumu ne"
// diye TEKRAR SORMAK (retrieve). Callback body'sindeki bilgiye asla
// doğrudan güvenmeyin — sahte istek gönderilebilir.

import { NextRequest, NextResponse } from 'next/server'
import { iyzipay } from '@/lib/iyzico'
// import { markReservationPaid, markReservationFailed } from '@/lib/db'
// import { sendReservationConfirmationEmail } from '@/lib/mail'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const token = formData.get('token') as string

  if (!token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon/hata?reason=no-token`
    )
  }

  const result: any = await new Promise((resolve, reject) => {
    iyzipay.checkoutForm.retrieve({ locale: 'tr', token }, (err: any, res: any) => {
      if (err) reject(err)
      else resolve(res)
    })
  })

  const conversationId = result.conversationId

  if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
    // Ödeme gerçekten başarılı — DB'de "pending" olan rezervasyonu
    // "paid" yapın, onay maili gönderin.
    // await markReservationPaid(conversationId, {
    //   iyzicoPaymentId: result.paymentId,
    //   paidPrice: result.paidPrice,
    // })
    // await sendReservationConfirmationEmail(conversationId)

    console.log('[iyzico] ödeme başarılı:', conversationId, result.paymentId)

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon/basarili?ref=${conversationId}`
    )
  }

  // Başarısız / iptal / 3D doğrulama reddedildi vb.
  // await markReservationFailed(conversationId, result.errorMessage)
  console.warn('[iyzico] ödeme başarısız:', conversationId, result.errorMessage)

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/rezervasyon/hata?ref=${conversationId}`
  )
}

// İyzico callback'i her zaman POST (form submit) olarak gönderir,
// GET tanımlamanıza gerek yok. Tarayıcı bu POST sonucunda yukarıdaki
// redirect'lerle /rezervasyon/basarili veya /rezervasyon/hata
// sayfalarına yönlenir.
