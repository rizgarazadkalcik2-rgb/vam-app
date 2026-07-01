import Iyzipay from 'iyzipay'

let _iyzipay: any = null

export function getIyzipay(): any {
  if (!_iyzipay) {
    if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
      console.warn('[iyzico] IYZICO_API_KEY / IYZICO_SECRET_KEY tanimli degil.')
    }
    _iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'not-configured',
      secretKey: process.env.IYZICO_SECRET_KEY || 'not-configured',
      uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
    })
  }
  return _iyzipay
}
