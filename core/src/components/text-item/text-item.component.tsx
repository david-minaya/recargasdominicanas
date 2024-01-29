import React from 'react';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './text-item.module.css';

interface Props<T> {
  title: string,
  text: T;
  icon?: string;
  style?: Style;
  onClick?: () => void;
  onOptionClick?: () => void;
}

export function TextItem<T>(props: Props<T>) {

  const {
    title,
    text, 
    icon,
    style: customStyle,
    onOptionClick
  } = props;

  const style = mergeStyle(customStyle);

  if (!text) return null;

  return (
    <div className={style.container}>
      <span className={style.title}>{title}</span>
      <div className={style.content}>
        <span className={style.text}>{text}</span>
        {icon && 
          <Icon 
            className={style.icon} 
            icon={icon}
            onClick={onOptionClick}/>
        }
      </div>
    </div>
  );
}
