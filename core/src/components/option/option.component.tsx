import React from 'react';
import { Icon } from '../icon/icon.component';
import { Text } from '../text/text.component';
import { Style, mergeStyle } from './option.module.css';

interface Props {
  text: string;
  icon?: string;
  hiddeIcon?: boolean;
  style?: Style;
  onClick?: () => void;
}

export function Option(props: Props) {

  const {
    text,
    icon = '',
    hiddeIcon = false,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  function handleClick() {
    onClick?.();
  }

  return (
    <div 
      className={style.container}
      onMouseDown={handleClick}>
      {!hiddeIcon && <Icon icon={icon} className={style.icon}/>}
      <Text className={style.text} text={text}/>
    </div>
  );
}
