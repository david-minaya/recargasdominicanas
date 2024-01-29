import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Style, mergeStyle } from './modal.module.css';

interface Props {
  open: boolean;
  children: ReactNode;
  overlayEnterAnimation?: boolean;
  style?: Style;
  onClose?: () => void;
}

export function Modal(props: Props) {

  const {
    open = false,
    children,
    overlayEnterAnimation = true,
    style: customStyle,
    onClose
  } = props;

  const style = mergeStyle(customStyle);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlays = document.body.querySelectorAll<HTMLDivElement>(`.${style.overlay}`);
    if (overlays.length > 1) overlays[0].style.display = 'none';
  }, [open]);

  return createPortal(
    <CSSTransition
      in={open}
      appear={true}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={180}
      nodeRef={containerRef}>
      <div 
        className={style.container}
        ref={containerRef}
        onClick={onClose}>
        <CSSTransition
          in={open}
          appear={true}
          unmountOnExit={true}
          nodeRef={overlayRef}
          classNames={{
            ...(overlayEnterAnimation ? style.overlayEnterAnimation : {}),
            ...style.overlayExitAnimation
          }}
          timeout={180}>
          <div
            className={style.overlay}
            ref={overlayRef}/>
        </CSSTransition>
        <CSSTransition
          in={open}
          appear={true}
          unmountOnExit={true}
          nodeRef={cardRef}
          classNames={style.cardAnimation}
          timeout={180}>
          <div 
            className={style.card}
            ref={cardRef} 
            onClick={e => e.stopPropagation()}>
            {children}
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>,
    document.body
  );
}
