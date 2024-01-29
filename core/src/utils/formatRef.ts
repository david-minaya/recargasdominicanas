export function formatRef(ref: number) {
  return ref
    .toString()
    .padStart(9, '0')
    .replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
}
