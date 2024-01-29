import React, { useEffect } from 'react';
import { Field } from '../../utils';
import { FieldError } from '../field-error/field-error.component';
import { Text } from '../text/text.component';
import { mergeStyle, Style } from './text-area.module.css';
import { IValidator } from '../../types';

interface Props {
  label?: string;
  value?: string;
  formField?: Field<string>;
  placeholder?: string;
  hint?: string;
  autofocus?: boolean;
  validators?: IValidator[];
  style?: Style;
  onChange?: (value: string) => void;
  onEnter?: () => void;
}

export function TextArea(props: Props) {

  const { 
    label, 
    value: initValue, 
    formField: field,
    placeholder,
    hint,
    autofocus,
    validators = [],
    style: customStyle,
    onChange,
    onEnter
  } = props;
  
  const style = mergeStyle(customStyle);
  const value = field ? field.value : initValue;

  useEffect(() => {
    field?.addValidators(validators);
  }, [JSON.stringify(validators)]);

  useEffect(() => {
    return () => field?.addValidators([]);
  }, []);

  function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.focus();
  }

  function handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.blur();
    field?.validate();
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    field?.update(event.target.value);
    if (onChange) onChange(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter') {
      onEnter?.();
    }
  }

  return (
    <div className={style.container}>
      {label && <label className={style.label}>{label}</label>}
      <textarea
        className={style.input} 
        value={value}
        placeholder={placeholder}
        autoFocus={autofocus}
        onChange={handleChange} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}/>
      <FieldError message={field?.error}/>
      {hint && <Text className={style.hint} text={hint}/>}
    </div>
  );
}
