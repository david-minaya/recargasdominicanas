import React, { cloneElement, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Field, validators } from '../../utils';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './select.module.css';
import { FieldError } from '../field-error/field-error.component';
import { Menu } from '../menu/menu.component';
import { SelectOption } from '../select-option/select-option.component';

interface Props<T> {
  icon?: string;
  value?: T;
  valueTitle?: string;
  label?: string;
  placeholder?: string;
  formField?: Field<T> | Field<undefined>;
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode | ReactNode[];
  style?: Style;
  onChange?: (value?: T) => void;
}

export function Select<T>(props: Props<T>) {

  const {
    icon,
    placeholder,
    children: _children,
    formField: field,
    required = false,
    disabled = false,
    label,
    value: initValue,
    valueTitle: initialValueTitle,
    style: customStyle,
    onChange
  } = props;

  const style = mergeStyle(customStyle);
  const value = field ? field.value : initValue;
  const ref = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [valueTitle, setValueTitle] = useState(initialValueTitle || placeholder);

  const children = Array.isArray(_children) ? _children : [_children];

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

  useEffect(() => {
    setValueTitle(initialValueTitle || placeholder);
  }, [initialValueTitle, placeholder]);

  function handleClick() {
    if (disabled) return;
    setOpenPopup(state => !state);
  }

  function handleClear() {
    field?.clear();
    clear();
  }

  function handleClose() {
    setOpenPopup(false);
    field?.validate();
  }

  function handleOptionClick(value: any, label: string) {
    field?.validate();
    setOpenPopup(false);
    setValueTitle(label);
    field?.update(value);
    if (onChange) onChange(value);
  }

  function clear() {
    setOpenPopup(false);
    setValueTitle(initialValueTitle || placeholder);
    field?.clear();
    if (onChange) onChange(undefined);
  }

  return (
    <div 
      className={style.container}
      tabIndex={0}
      onBlur={handleClose}>
      {label && 
        <label className={style.label}>{label}</label>
      }
      <div 
        ref={ref} 
        className={clsx(style.input, {
          [style.active]: value && !disabled,
          [style.disabled]: disabled
        })}
        onClick={handleClick}>
        {icon && <Icon className={style.icon} icon={icon}/>}
        <span className={style.value}>{valueTitle}</span>
        <Icon className={style.expandMoreIcon} icon='expand_more'/>
      </div>
      <FieldError message={field?.error}/>
      <Menu 
        open={openPopup} 
        anchor={ref} 
        top={8}
        autoWith={true}
        autofocus={false}
        style={{ container: style.popup }}>
        {
          children?.map((child: any) => {

            const children = Array.isArray(child) ? child : [child];

            return children.map((child, index) => {

              if (child && typeof child === 'object' && child?.type === SelectOption) {
                return cloneElement(child, {
                  key: index,
                  selected: JSON.stringify(child.props.value) === JSON.stringify(value),
                  onClick: handleOptionClick,
                  onClear: handleClear
                });
              }
  
              return child;
            });
          })
        }
      </Menu>
    </div>
  );
}
