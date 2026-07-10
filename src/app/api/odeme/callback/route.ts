import { NextRequest, NextResponse } from 'next/server'
import Iyzipay from 'iyzipay'
import { getIyzipay } from '@/lib/iyzico'

// iyzipay'in .d.ts'i başarı/hata sonuçlarını ayrı modellemiyor (errorMessage
// sadece hata durumunda gelir) — bu yüzden kodun gerçekten okuduğu alanları
// burada minimal bir arayüzle tanımlıyoruz.
interface CheckoutFormRetrieveResult {
  status: string
  errorMessage?: string
  conversationId?: string
  paymentStatus?: string
  paymentId?: string
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const token = formData.get('token') as string

  if (!token) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/rezervasyon/hata?reason=no-token')
  }

  const result = await new Promise<CheckoutFormRetrieveResult>((resolve, reject) => {
    getIyzipay().checkoutForm.retrieve({ locale: Iyzipay.LOCALE.TR, token }, (err: Error | null, res: CheckoutFormRetrieveResult) => {
      if (err) reject(err)
      else resolve(res)
    })
  })

  const conversationId = result.conversationId

  if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
    console.log('[iyzico] odeme basarili:', conversationId, result.paymentId)
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/rezervasyon/basarili?ref=' + conversationId)
  }

  console.warn('[iyzico] odeme basarisiz:', conversationId, result.errorMessage)
  return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/rezervasyon/hata?ref=' + conversationId)
}
