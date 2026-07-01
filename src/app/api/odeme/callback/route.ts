import { NextRequest, NextResponse } from 'next/server'
import { getIyzipay } from '@/lib/iyzico'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const token = formData.get('token') as string

  if (!token) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/rezervasyon/hata?reason=no-token')
  }

  const result: any = await new Promise((resolve, reject) => {
    getIyzipay().checkoutForm.retrieve({ locale: 'tr', token }, (err: any, res: any) => {
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
