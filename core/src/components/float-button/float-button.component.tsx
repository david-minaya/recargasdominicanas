import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from '../icon/icon.component';
import { Style, mergeStyle } from './float-button.module.css';

interface Props {
  icon: string;
  iconVariant?: 'outlined' | 'round';
  style?: Style;
  onClick?: () => void;
}

export function FloatButton(props: Props) {

  const {
    icon,
    iconVariant,
    style: customStyle,
    onClick
  } = props;

  const style = mergeStyle(customStyle);
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    setIsPointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  function handleMouseDown() {
    if (isPointer) setAnimate(true);
  }
  
  function handleMouseUp() {
    if (isPointer) setAnimate(false);
  }

  function handleTouchStart() {
    if (isTouch) setAnimate(true);
  }

  function handleTouchEnd() {
    if (isTouch) setAnimate(false);
  }

  return (
    <CSSTransition
      in={animate}
      nodeRef={ref}
      classNames={style.animation}
      timeout={170}>
      <div 
        className={style.container}
        ref={ref}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
        onClick={onClick}>
        <Icon 
          className={style.icon} 
          icon={icon}
          variant={iconVariant}/>
      </div>
    </CSSTransition>
  );
}
