import React from 'react';
import { Button, Props } from '../button/button.component';
import { mergeStyle } from './outline-button.module.css';

export { Props };

export function OutlineButton(props: Props) {
  const style = mergeStyle(props.style);
  const newProps = { ...props, style };
  return <Button {...newProps}/>;
}
