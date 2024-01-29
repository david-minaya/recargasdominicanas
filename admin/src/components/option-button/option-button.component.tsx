import clsx from 'clsx';
import React, { RefObject } from 'react';
import { Style, mergeStyle } from './option-button.module.css';
import { Icon } from '@recargas-dominicanas/core/components';

interface Props {
  className?: Style;
  icon: string;
  title: string;
  rightIcon?: string;
  optionRef?: RefObject<HTMLDivElement>;
  onClick?: () => void;
}

export function OptionButton(props: Props) {

  const {
    className,
    icon,
    title,
    rightIcon,
    optionRef,
    onClick
  } = props;

  const style = mergeStyle(className);

  return (
    <div 
      ref={optionRef}
      className={style.container}
      onClick={onClick}>
      <Icon 
        className={style.icon} 
        icon={icon}/>
      <span 
        className={clsx(style.title, !rightIcon && style.margin12px)}>
        {title}
      </span>
      {rightIcon &&
        <Icon 
          className={style.iconRight} 
          icon={rightIcon}/>
      }
    </div>
  );
}
