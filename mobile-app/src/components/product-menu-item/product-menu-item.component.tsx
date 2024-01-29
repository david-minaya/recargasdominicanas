import React from 'react';
import { Icon } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './product-menu-item.module.css';

interface Props {
  id: string;
  icon: string;
  title: string;
  style?: Style;
  onClick: (id: string) => void;
}

export function ProductTypeItem(props: Props) {

  const {
    id,
    icon,
    title,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div 
      className={style.container}
      onClick={() => onClick(id)}>
      <div className={style.iconContainer}>
        <Icon className={style.icon} icon={icon}/>
      </div>
      <div className={style.title}>{title}</div>
    </div>
  );
}
