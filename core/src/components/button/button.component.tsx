import clsx from 'clsx';
import React, { MouseEvent } from 'react';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { Style, mergeStyle } from './button.module.css';

export interface Props {
  id?: string;
  text?: string;
  icon?: string;
  rightIcon?: string;
  hidden?: boolean;
  disabled?: boolean;
  style?: Style;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

export function Button(props: Props) {

  const {
    id,
    text = 'Button',
    icon,
    rightIcon,
    disabled = false,
    hidden = false,
    style: customStyle,
    onClick,
    onMouseDown
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick(event?: MouseEvent<HTMLButtonElement>) {
    if (!disabled && !hidden && onClick) {
      onClick(event);
    }
  }

  function handleMouseDown(event?: MouseEvent<HTMLButtonElement>) {
    if (!disabled && !hidden && onMouseDown) {
      onMouseDown(event);
    }
  }

  return (
    <button
      id={id}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      className={clsx(
        style.base,
        disabled && style.disabled,
        hidden && style.hidden
      )}>
      {icon &&
        <Icon className={style.icon} icon={icon}/>
      }
      <Text className={style.text} text={text}/>
      {rightIcon &&
        <Icon className={style.rightIcon} icon={rightIcon}/>
      }
    </button>
  );
}
