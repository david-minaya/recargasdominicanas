import React from 'react';
import clsx from 'clsx';
import { mergeStyle } from './button.module.css';

interface props {
  id?: string;
  text?: string;
  style?: { base?: string, disabled?: string, hidden?: string };
  hidden?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: props) {

  const {
    id,
    style: customStyle,
    text = 'Button',
    disabled = false,
    hidden = false,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick() {
    if (!disabled && !hidden) {
      onClick();
    }
  }

  return (
    <button 
      id={id}
      className={clsx(
        style.base, 
        disabled && style.disabled,
        hidden && style.hidden 
      )}
      onClick={handleClick}>
      {text}
    </button>
  );
}
