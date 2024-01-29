import React from 'react';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './app-toolbar.module.css';

interface Props {
  icon: string;
  title: string;
  style?: Style;
  onClick?: () => void;
}

export function AppToolbar(props: Props) {

  const {
    icon,
    title,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <Icon 
        className={style.icon} 
        icon={icon} 
        onClick={onClick}/>
      <span className={style.title}>{title}</span>
    </div>
  );
}
