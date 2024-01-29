import React from 'react';
import { mergeStyle } from './icon.module.css';

interface Props {
  style?: any;
  icon: string;
  onClick?: () => void;
}

export function Icon(props: Props) {

  const { 
    style: customStyle, 
    icon, 
    onClick 
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div 
      className={`font-icon ${style.icon}`} 
      onClick={onClick}>
      {icon}
    </div>
  );
}
