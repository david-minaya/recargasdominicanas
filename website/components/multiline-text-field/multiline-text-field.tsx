import React from 'react';
import { regexps } from '../../constants';
import { mergeStyle, Style } from './multiline-text-field.module.css';

interface props {
  label?: string;
  name?: string;
  value?: string;
  autofocus?: boolean;
  validation?: RegExp;
  showIfIsInvalid?: boolean;
  errorMessage?: string;
  style?: Style;
  onChange?: (name: string, value: string) => void;
  onEnter?: () => void;
}

export function MultilineTextField(props: props) {

  const { 
    label, 
    name, 
    value, 
    validation = regexps.empty,
    errorMessage = 'Este campo no puede estar vacío', 
    autofocus,
    showIfIsInvalid, 
    style: customStyle, 
    onChange, 
    onEnter 
  } = props;

  const style = mergeStyle(customStyle);
  const [isValid, setIsValid] = React.useState(true);

  React.useEffect(() => {
    if (showIfIsInvalid) {
      setIsValid(validation.test(value));
    }
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    
    if (event.keyCode == 13 || event.keyCode == 9) { 

      const isValid = validation.test(value);
      setIsValid(isValid);
    
      if (isValid && onEnter) onEnter();

      event.preventDefault();
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.autofocus = true;
  }

  function handleBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    event.target.autofocus = false;
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (onChange) onChange(name, event.target.value);
  }

  return (
    <div className={style.field}>
      <label className={style.label}>{label}</label>
      <textarea 
        className={style.textArea}
        autoFocus={autofocus}
        value={value}
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}/>
      {!isValid && 
        <div className={style.error}>{errorMessage}</div>
      }
    </div>
  );
}
