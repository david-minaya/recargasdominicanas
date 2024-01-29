import { Icon } from '@recargas-dominicanas/core/components';
import React from 'react';
import { Style, mergeStyle } from './nav-item.module.css';

interface Props {
  icon: string;
  title: string;
  style?: Style;
  onClick?: () => void;
}

export function NavItem(props: Props) {

  const {
    icon,
    title,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container} onClick={onClick}>
      <Icon className={style.icon} icon={icon}/>
      <span className={style.title}>{title}</span>
      <Icon className={style.arrowIcon} icon='arrow_forward'/>
    </div>
  );
}
