import clsx from 'clsx';
import React, { RefObject, MouseEvent, FocusEvent } from 'react';
import { Icon } from '../icon/icon.component';
import { style } from './option-icon.module.css';

interface Props {
  icon: string;
  iconRef?: RefObject<HTMLDivElement>,
  className?: string;
  autofocus?: boolean;
  variant?: 'outlined' | 'round';
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event?: MouseEvent<HTMLDivElement>) => void;
  onBlur?: (event?: FocusEvent<HTMLDivElement>) => void;
}

export function OptionIcon(props: Props) {

  const {
    icon,
    iconRef,
    className,
    autofocus,
    variant,
    onClick,
    onMouseDown,
    onBlur
  } = props;

  return (
    <Icon
      className={clsx(style.icon, className)}
      icon={icon}
      iconRef={iconRef}
      autofocus={autofocus}
      variant={variant}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onBlur={onBlur}/>
  );
}
