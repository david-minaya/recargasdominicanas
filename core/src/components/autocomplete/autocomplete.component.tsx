import React, { cloneElement, ReactElement, useMemo, useState, MouseEvent, useRef, useEffect } from 'react';
import { Field, validators } from '../../utils';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { FieldError } from '../field-error/field-error.component';
import { Style, mergeStyle } from './autocomplete.module.css';
import { Menu } from '../menu/menu.component';

interface Props<T> {
  icon?: string;
  value?: string[],
  placeholder?: string,
  formField?: Field<T> | Field<undefined>,
  required?: boolean,
  children?: ReactElement[],
  style?: Style,
  label?: string,
  hint?: string,
  type?: string,
  autofocus?: boolean,
  onChange?: (value?: T) => void,
  onSearch?: (value?: string) => void,
  onEnter?: () => void
}

export function Autocomplete<T>(props: Props<T>) {

  const {
    icon = 'search',
    label,
    placeholder,
    children = [],
    formField: field,
    required = false,
    hint,
    autofocus,
    value: initValue,
    style: customStyle,
    onChange,
    onSearch
  } = props;

  const style = mergeStyle(customStyle);
  const value = field ? field.value : initValue;
  const ref = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (required) {
      field?.addValidators([validators.required]);
    }
  }, [required]);

  useEffect(() => {
    field?.onClear(() => clear());
    return () => {
      field?.onClear(undefined);
      field?.addValidators([]);
    };
  }, []);

  const delaySearch = useMemo(() => {
    let timeout: NodeJS.Timeout;
    let lastValue: string | undefined;
    return (value?: string) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (value !== lastValue) {
          onSearch?.(value);
          lastValue = value;
        }
      }, 100);
    };
  }, []);

  function handleClick() {
    setOpenPopup(state => !state);
    onSearch?.(displayValue);
  }

  function handleClear(event?: MouseEvent<HTMLDivElement>) {
    clear();
    field?.clear();
    event?.stopPropagation();
  }

  function handleBlur() {
    setOpenPopup(false);
    field?.validate();
  }

  function handleOptionClick(value: any, label: string) {
    setOpenPopup(false);
    setDisplayValue(label);
    onChange?.(value);
    onSearch?.(label);
    field?.update(value);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayValue(event.target.value);
    delaySearch(event.target.value);
  }

  function clear() {
    setOpenPopup(false);
    setDisplayValue('');
    onSearch?.('');
    onChange?.(undefined);
  }

  return (
    <div 
      className={style.container}
      tabIndex={0}
      onBlur={handleBlur}>
      {label && 
        <label className={style.label}>{label}</label>
      }
      <div 
        className={style.content}
        ref={ref} 
        onClick={handleClick}>
        <Icon className={style.icon} icon={icon}/>
        <input 
          className={style.input} 
          value={displayValue}
          type='text'
          placeholder={placeholder}
          autoFocus={autofocus}
          onChange={handleChange}/>
        {displayValue !== '' && 
          <Icon 
            className={style.clear} 
            icon='clear'
            onClick={handleClear}/>
        }
      </div>
      <FieldError message={field?.error}/>
      {hint && <Text className={style.hint} text={hint}/>}
      <Menu
        open={openPopup && children?.length !== 0}
        anchor={ref} 
        top={8}
        autoWith={true}
        autofocus={false}
        style={{ container: style.popup }}>
        {
          children?.map((child, index) => (
            cloneElement(child, { 
              key: index,
              showClearIcon: false,
              selected: JSON.stringify(child.props.value) === JSON.stringify(value),
              onClick: handleOptionClick
            })
          ))
        }
      </Menu>
    </div>
  );
}
