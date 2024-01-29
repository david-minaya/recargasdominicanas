import React, { ChangeEvent, useEffect, useRef } from 'react';
import { FieldError, Icon } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './file-field.module.css';
import { Field, validators } from '@recargas-dominicanas/core/utils';
import clsx from 'clsx';

interface Props {
  className?: Style;
  placeholder?: string;
  required?: boolean;
  filename?: string;
  field?: Field<File | undefined>;
}

export function FileField(props: Props) {

  const {
    className,
    placeholder,
    required = false,
    field
  } = props;

  const style = mergeStyle(className);
  const inputRef = useRef<HTMLInputElement>(null);
  const filename = props.filename || field?.value?.name;

  useEffect(() => {
    if (required) field?.addValidators([validators.required]);
  }, [required]);

  useEffect(() => {
    return () => field?.addValidators([]);
  }, []);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    field?.update(event.target.files?.[0]);
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Aplicacion</div>
      <div 
        className={style.field}
        onClick={handleClick}>
        <div 
          className={clsx(style.value, filename && style.active)}
          title={filename}>
          {filename || placeholder}
        </div>
        <Icon
          className={style.icon} 
          icon='file_upload'/>
        <input
          className={style.input}
          ref={inputRef}
          type='file'
          accept='.apk'
          onChange={handleChange}/>
      </div>
      {!field?.isValid &&
        <FieldError message='Campo requerido'/> 
      }
    </div>
  );
}
