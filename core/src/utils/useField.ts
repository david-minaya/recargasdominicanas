import { useState } from 'react';
import { IValidator } from '../types';

export type Field<T> = {
  value: T;
  isValid: boolean;
  error?: string;
  update: (value: T) => void;
  clear: () => void;
  validate: () => boolean;
  onClear: (cb?: () => void) => void;
  addValidators: (validators: IValidator[]) => void;
}

export function useField<T>(initialValue: T): Field<T> {

  const [value, setValue] = useState<T>(initialValue);
  const [validators, setValidators] = useState<IValidator[]>([]);
  const [error, setError] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const [clearCb, setClearCb] = useState<() => void>();
  
  function update(value: T) {
    setValue(value);
    setIsValid(true);
    setError(undefined);
  }

  function addValidators(validators: IValidator[]) {
    setValidators(validators);
  }

  function validate(): boolean {

    for (const validator of validators) {
      if (!validator.validate(value as unknown as string)) {
        setIsValid(false);
        setError(validator.message);
        return false;
      }
    }

    setIsValid(true);
    setError(undefined);

    return true;
  }

  function clear() {
    setValue(initialValue);
    setIsValid(true);
    setError(undefined);
    clearCb?.();
  }

  function onClear(cb?: () => void) {
    setClearCb(() => cb);
  }

  return {
    value,
    isValid,
    error,
    update,
    addValidators,
    validate,
    clear,
    onClear
  };
}
