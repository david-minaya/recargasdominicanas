export function formatPhone(phone?: number | string) {
  if (!phone) return '';
  return phone.toString().replace(
    /(\d{3})(\d{3})(\d{4})/, 
    '($1) $2-$3'
  );
}
