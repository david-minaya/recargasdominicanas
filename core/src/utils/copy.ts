export async function copy<T>(text: T) {
  await navigator.clipboard.writeText(`${text}`);
}
