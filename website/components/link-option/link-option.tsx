import React from 'react';
import { Icon } from '../icon';
import { mergeStyle, Style } from './link-option.module.css';

interface Props {
  style?: Style;
  icon: string;
  text: string;
  url?: string;
  target?: string;
}

export function LinkOption(props: Props) {

  const { 
    style: customStyle,
    icon,
    text,
    url,
    target
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <a className={style.container} href={url} target={target}>
      <Icon style={style.icon} icon={icon}/>
      <div className={style.text}>{text}</div>
    </a>
  );
}
