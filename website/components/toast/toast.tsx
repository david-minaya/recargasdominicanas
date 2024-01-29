import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '../icon';
import { mergeStyle, Style } from './toast.module.css';

interface Props {
  style?: Style;
  text: string;
  show: boolean;
  onClose: () => void;
}

export function Toast(props: Props) {

  const { 
    style: customStyle, 
    text, 
    show, 
    onClose 
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <CSSTransition
      in={show}
      appear
      timeout={300}
      unmountOnExit
      classNames={style.animation}>
      <div className={style.container}>
        <div className={style.text}>{text}</div>
        <Icon style={style.icon} icon='close' onClick={onClose}/>
      </div>
    </CSSTransition>
  );
}
