import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { style } from './toast.module.css';

interface Props {
  show: boolean;
  text: string;
  timeout?: number;
  onClose: () => void;
}

export function Toast(props: Props) {

  const {
    show,
    text,
    timeout = 3000,
    onClose
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) setTimeout(onClose, timeout);
  }, [show]);

  return (
    <CSSTransition
      in={show}
      timeout={500}
      unmountOnExit
      classNames={style.animation}
      nodeRef={ref}>
      <div 
        className={style.container}
        ref={ref}>
        {text}
      </div>
    </CSSTransition>
  );
}
