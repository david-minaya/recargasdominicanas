import { validator } from './validator';
import { formatCurrency } from './formatCurrency';

export const required = validator({
  message: 'Este campo es requerido',
  validate: (value: any) => (
    typeof value === 'string' 
      ? value !== undefined && value.trim() !== ''
      : value !== undefined
  )
});

export const phone = validator({
  message: 'Número de teléfono invalido',
  validate: (value: string) => /^\d{10,}$/.test(value)
});

export const email = validator({
  message: 'Correo electrónico invalido',
  validate: (value: string) => (
    value !== ''
      ? /^[\d\w-]{2,}@[\d\w]{2,}\.[\d\w]{2,}$/.test(value)
      : true
  )
});

export const min = (min: number) => validator({
  deps: min,
  message: `Monto mínimo ${formatCurrency(min)}`,
  validate: (value: string) => parseInt(value) >= min
});

export const max = (max: number) => validator({
  deps: max,
  message: `Monto máximo ${formatCurrency(max)}`,
  validate: (value: string) => parseInt(value) <= max
});

export const length = (length: number, message: string) => validator({
  deps: length,
  message,
  validate: (value: string) => value.length >= length
});

export const equal = (text: string, message?: string) => validator({
  deps: text,
  message: message || 'Los valores no son iguales',
  validate(value: string) {
    return value === text;
  }
});

export const regex = (regex: RegExp, message?: string) => validator({
  deps: regex,
  message: message || 'Valor invalido',
  validate: (value: string) => regex.test(value)
});
