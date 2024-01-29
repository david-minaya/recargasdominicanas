import React from 'react';
import { Option } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './menu-option.module.css';

interface Props {
  text: string,
  style?: Style,
  onClick?: () => void
}

export function MenuOption(props: Props) {

  const {
    text,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <Option
      style={style}
      hiddeIcon={true}
      text={text}
      onClick={onClick}/>
  );
}
