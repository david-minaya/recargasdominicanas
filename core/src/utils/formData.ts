export function formData(data: { [key: string]: string | File | undefined }) {

  const formData = new FormData();

  for (const key in data) {
    const value = data[key];
    if (value !== undefined) {
      formData.append(key, value);
    }
  }

  return formData;
}
