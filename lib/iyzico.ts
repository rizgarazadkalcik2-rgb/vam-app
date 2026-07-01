// lib/iyzico.ts
//
// Kurulum: npm install iyzipay
//
// Vercel ortam değişkenleri (Project Settings > Environment Variables):
//   IYZICO_API_KEY      -> merchant panelinden alınan API key
//   IYZICO_SECRET_KEY   -> merchant panelinden alınan secret key
//   IYZICO_BASE_URL     -> test: https://sandbox-api.iyzipay.com
//                           canlı: https://api.iyzipay.com
//
// ÖNEMLİ: secret key'i asla client tarafına (tarayıcıya) göndermeyin,
// asla NEXT_PUBLIC_ öneki ile tanımlamayın. Sadece server-side (API
// route'lar) içinde kullanılmalı.

import Iyzipay from 'iyzipay'

if (!process.env.IYZICO_API_KEY || !process.env.IYZICO_SECRET_KEY) {
  console.warn(
    '[iyzico] IYZICO_API_KEY / IYZICO_SECRET_KEY tanımlı değil — .env.local veya Vercel env kontrol edin.'
  )
}

export const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || '',
  secretKey: process.env.IYZICO_SECRET_KEY || '',
  uri: process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com',
})
