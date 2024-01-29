export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-DO').format(amount) + ' RD$';
}
