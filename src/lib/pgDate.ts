// Postgres DATE kolonları @vercel/postgres üzerinden bir JS Date nesnesi
// olarak dönüyor ve bu Date, sürücü tarafından YEREL saat dilimine göre
// (new Date(year, month, day) ile, UTC değil) kuruluyor. Bu nesneyi
// toISOString() ile metne çevirmek UTC'ye dönüştürür — pozitif UTC ofsetli
// saat dilimlerinde (Europe/Istanbul +3, Europe/Berlin +1/+2 gibi) tarih bir
// gün geriye kayar. Bunun yerine Date'in YEREL bileşenlerini (getFullYear/
// getMonth/getDate) okuyoruz — sürücünün kurduğu değeri hiç dönüştürmeden
// aynen geri veriyoruz.
export function normalizePgDate(value: unknown): string | null {
  if (value == null) return null;
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  return String(value).slice(0, 10);
}
