import Iyzipay from 'iyzipay'

if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
    console.warn('[iyzico] IYZICO_API_KEY / IYZICO_SECRET_KEY tanimli degil.')
}

export const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || '',
    secretKey: process.env.IYZICO_SECRET_KEY || '',
    uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
})
