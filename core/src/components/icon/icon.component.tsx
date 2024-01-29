import React, { MouseEvent, RefObject, FocusEvent } from 'react';
import clsx from 'clsx';
import { style } from './icon.module.css';

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

export function Icon(props: Props) {

  const { 
    icon,
    iconRef,
    className,
    autofocus = false,
    variant = 'outlined',
    onClick,
    onMouseDown,
    onBlur
  } = props;

  return (
    <div
      ref={iconRef}
      className={clsx(
        style.icon, 
        className,
        variant === 'outlined' && 'material-icons-outlined',
        variant === 'round' && 'material-icons-round'
      )}
      tabIndex={autofocus ? 0 : undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onBlur={onBlur}>
      {icon}
    </div>
  );
}
