import React from 'react';
import { Button, Props } from '../button/button.component';
import { mergeStyle } from './fill-button.module.css';

export { Props };

export function FillButton(props: Props) {
  const style = mergeStyle(props.style);
  const newProps = { ...props, style };
  return <Button {...newProps}/>;
}
