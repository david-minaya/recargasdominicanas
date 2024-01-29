import { Field, useField } from './useField';

export function useForm<T>(defaultValue: T) {

  const fields = {} as { [K in keyof T]: Field<T[K]> };
  const value = {} as T;

  for (const key in defaultValue) {
    fields[key] = useField(defaultValue[key]);
  }

  for (const key in fields) {
    value[key] = `${fields[key].value}` !== '' ? fields[key].value : undefined as unknown as T[typeof key];
  }
 
  function clear() {
    for (const key in fields) {
      fields[key].clear();
    }
  }

  function isValid() {

    let isValid = true;
    
    for (const key in fields) {
      if (!fields[key].validate()) isValid = false;
    }

    return isValid;
  }

  return {
    fields,
    value,
    isValid,
    clear
  };
}
