import React, { useEffect } from 'react';
import { Field } from '../../utils';
import { FieldError } from '../field-error/field-error.component';
import { Text } from '../text/text.component';
import { mergeStyle, Style } from './text-field.module.css';
import { IValidator } from '../../types';

interface Props {
  label?: string;
  value?: string;
  formField?: Field<string>;
  placeholder?: string;
  hint?: string;
  type?: string;
  autofocus?: boolean;
  disabled?: boolean;
  validators?: IValidator[];
  style?: Style;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function TextField(props: Props) {

  const { 
    label, 
    value: initValue, 
    formField: field,
    placeholder,
    hint,
    type,
    autofocus,
    disabled = false,
    validators = [],
    style: customStyle,
    onClick,
    onChange,
    onEnter,
    onFocus,
    onBlur
  } = props;
  
  const style = mergeStyle(customStyle);
  const value = field ? field.value : initValue;

  useEffect(() => {
    field?.addValidators(validators);
  }, [JSON.stringify(validators)]);

  useEffect(() => {
    return () => field?.addValidators([]);
  }, []);

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    event.target.focus();
    onFocus?.();
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    event.target.blur();
    field?.validate();
    onBlur?.(event);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    field?.update(event.target.value);
    if (onChange) onChange(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnter?.();
    }
  }

  return (
    <div 
      className={style.container}
      onClick={onClick}>
      {label && 
        <label className={style.label}>{label}</label>
      }
      <input 
        className={style.input} 
        value={value}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        disabled={disabled}
        onChange={handleChange} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}/>
      <FieldError message={field?.error}/>
      {hint && <Text className={style.hint} text={hint}/>}
    </div>
  );
}
