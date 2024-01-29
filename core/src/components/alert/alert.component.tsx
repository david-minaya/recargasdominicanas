import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Style, mergeStyle } from './alert.module.css';
import { Icon } from '../icon/icon.component';

interface Props {
  classname?: Style;
  open: boolean;
  title: string;
  description?: string;
  timeout?: number;
  onClose: () => void;
}

export function Alert(props: Props) {

  const {
    classname,
    open,
    title,
    description,
    timeout,
    onClose
  } = props;

  const style = mergeStyle(classname);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && timeout) setTimeout(onClose, timeout);
  }, [open, timeout]);

  return (
    <CSSTransition
      in={open}
      timeout={500}
      unmountOnExit
      classNames={style.animation}
      nodeRef={ref}>
      <div 
        className={style.container}
        ref={ref}>
        <div className={style.header}>
          <div className={style.title}>{title}</div>
          <Icon 
            className={style.icon} 
            icon='clear'
            onClick={onClose}/>
        </div>
        {description &&
          <div className={style.description}>{description}</div>
        }
      </div>
    </CSSTransition>
  );
}
