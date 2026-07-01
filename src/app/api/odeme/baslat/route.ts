import { NextRequest, NextResponse } from 'next/server'
import Iyzipay from 'iyzipay'
import { iyzipay } from '@/lib/iyzico'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { packageId, guestCount, customer } = body

    if (!packageId || !customer?.email) {
      return NextResponse.json({ error: 'Eksik bilgi.' }, { status: 400 })
    }

    const pkg = { id: packageId, name: 'Ornek Paket', pricePerPerson: 9600 }
    const totalPrice = (pkg.pricePerPerson * (guestCount || 1)).toFixed(2)
    const conversationId = randomUUID()

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId,
      price: totalPrice,
      paidPrice: totalPrice,
      currency: Iyzipay.CURRENCY.TRY,
      basketId: 'VAM-' + conversationId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL + '/api/odeme/callback',
      buyer: {
        id: 'buyer-' + conversationId,
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        gsmNumber: customer.phone,
        identityNumber: '11111111111',
        registrationAddress: customer.address || 'Belirtilmedi',
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        ip: req.headers.get('x-forwarded-for') || '85.34.78.112',
      },
      shippingAddress: {
        contactName: customer.name + ' ' + customer.surname,
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        address: customer.address || 'Belirtilmedi',
      },
      billingAddress: {
        contactName: customer.name + ' ' + customer.surname,
        city: customer.city || 'Belirtilmedi',
        country: customer.country || 'Turkey',
        address: customer.address || 'Belirtilmedi',
      },
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
      return NextResponse.json({ error: result.errorMessage || 'Odeme baslatilamadi' }, { status: 400 })
    }

    return NextResponse.json({
      checkoutFormContent: result.checkoutFormContent,
      token: result.token,
      conversationId,
    })
  } catch (err: any) {
    console.error('[iyzico] baslat hata:', err)
    return NextResponse.json({ error: 'Sunucu hatasi' }, { status: 500 })
  }
}
