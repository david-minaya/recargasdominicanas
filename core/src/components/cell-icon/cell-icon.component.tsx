import React, { MouseEvent, RefObject } from 'react';
import { BaseCell } from '../base-cell/base-cell.component';
import { OptionIcon } from '../option-icon/option-icon.component';
import { style } from './cell-icon.module.css';

interface Props {
  icon?: string;
  refIcon?: RefObject<HTMLDivElement>;
  autofocus?: boolean;
  className?: string;
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void;
  onBlur?: () => void;
}

export function CellIcon(props: Props) {

  const {
    icon = 'more_horiz',
    refIcon,
    autofocus = true,
    className,
    onClick,
    onBlur
  } = props;

  function handleClick(event?: MouseEvent<HTMLDivElement>) {
    onClick?.();
    event?.stopPropagation();
  }

  return (
    <BaseCell className={className}>
      <OptionIcon
        className={style.icon} 
        icon={icon}
        iconRef={refIcon}
        autofocus={autofocus}
        onClick={e => handleClick(e)}
        onBlur={onBlur}/>
    </BaseCell>
  );
}
