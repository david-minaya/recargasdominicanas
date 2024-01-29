import React from 'react';
import { Text } from '../text/text.component';
import { Style, mergeStyle } from './error.module.css';

interface Props {
  show?: boolean,
  message?: string,
  style?: Style
}

export function Error(props: Props) {

  const {
    show = true,
    message,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  if (!show || !message) return null;

  return (
    <div className={style.container}>
      <Text className={style.message} text={message}/>
    </div>
  );
}
