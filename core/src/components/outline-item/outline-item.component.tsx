import React from 'react';
import { Text } from '../text/text.component';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './outline-item.module.css';

interface Props { 
  text: string,
  icon: string,
  style?: Style,
  onClick?: () => void,
  onIconClick?: () => void
}

export function OutlineItem(props: Props) {

  const {
    text,
    icon,
    style: customStyle,
    onClick,
    onIconClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container} onClick={onClick}>
      <Text className={style.text} text={text}/>
      <Icon className={style.icon} icon={icon} onClick={onIconClick}/>
    </div>
  );
}
