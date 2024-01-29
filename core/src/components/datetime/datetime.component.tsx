import clsx from 'clsx';
import React, { useState, MouseEvent, useEffect } from 'react';
import { Field, validators } from '../../utils';
import { FieldError } from '../field-error/field-error.component';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './datetime.module.css';

interface Props {
  value?: string;
  min?: string;
  max?: string;
  formField?: Field<string | undefined>;
  required?: boolean;
  label?: string;
  placeholder?: string;
  type?: 'date' | 'datetime-local';
  style?: Style;
  onChange?: (value?: string) => void;
}

export function DateTime(props: Props) {

  const {
    value: initialValue = '',
    min,
    max,
    formField: field,
    required,
    label,
    placeholder,
    type = 'datetime-local',
    style: customStyle,
    onChange
  } = props;

  const style = mergeStyle(customStyle);
  const [input, setInput] = useState<HTMLInputElement | null>(null);
  const [value, setValue] = useState(field?.value || initialValue);

  useEffect(() => {
    if (required) field?.addValidators([validators.required]);
  }, [required]);

  useEffect(() => {
    field?.onClear(clear);
  }, [input]);

  useEffect(() => {
    return () => {
      field?.onClear(undefined);
      field?.addValidators([]);
    };
  }, []);

  useEffect(() => {

    if (input) {

      input.onchange = (event) => {
        const value = (event.target as HTMLInputElement).value;
        field?.update(value);
        setValue(value);
        onChange?.(value);
      };

      if (type === 'datetime-local') {
        input.oninput = (event: any) => {
          field?.update(event.target.value);
          setValue(event.target.value);
        };
      }
    }
  }, [type, input, onChange]);

  function handleClick() {
    //@ts-ignore
    input?.showPicker();
  }

  function handleBlur() {
    field?.validate();
  }

  function handleClear(event?: MouseEvent<HTMLDivElement>) {
    field?.clear();
    if (!field) clear();
    event?.stopPropagation();
  }

  function clear() {
    if (input) input.value = '';
    setValue('');
    onChange?.(undefined);
  }

  function formatDate(date: string) {

    if (type === 'datetime-local') {
      return new Intl.DateTimeFormat('es-DO', {  
        month: '2-digit',
        year: 'numeric',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(date));
    }

    return new Intl.DateTimeFormat(undefined, {  
      month: '2-digit',
      year: 'numeric',
      day: '2-digit'
    }).format(new Date(date));
  }

  return (
    <div className={style.container}>
      <input 
        className={style.hiddenInput}
        type={type}
        defaultValue={value}
        min={min}
        max={max}
        ref={setInput}/>
      {label && 
        <label className={style.label}>{label}</label>
      }
      <div 
        className={clsx(style.input, value && style.active)}
        tabIndex={0}
        onClick={handleClick}
        onBlur={handleBlur}>
        <Icon 
          className={clsx(style.icon, value && style.activeIcon)} 
          icon='event'/>
        <span 
          className={style.value}>
          {value ? formatDate(value) : placeholder}
        </span>
        {value &&
          <Icon
            className={clsx(style.clearIcon, value && style.activeIcon)}
            icon='clear'
            onClick={handleClear}/>
        }
        {!value &&
          <Icon 
            className={style.expandMoreIcon} 
            icon={'expand_more'}/>
        }
      </div>
      <FieldError message={field?.error}/>
    </div>
  );
}
