import React, { ReactNode, MouseEvent, RefObject, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { Style, mergeStyle } from './menu.module.css';

interface Props {
  open: boolean;
  anchor: RefObject<HTMLElement>;
  top?: number;
  right?: number;
  children: ReactNode;
  style?: Style;
  autoWith?: boolean;
  autofocus?: boolean;
  onClose?: () => void;
}

export function Menu(props: Props) {

  const {
    open,
    anchor,
    top = 0,
    right = 0,
    autoWith = false,
    autofocus = true,
    children,
    style: customStyle,
    onClose,
  } = props;

  const style = mergeStyle(customStyle);
  const [ref] = useState<any>({});

  useEffect(() => {

    let intervalId: NodeJS.Timer | undefined;

    if (open) {

      let lastPosition: number;

      intervalId = setInterval(() => {

        if (!anchor.current) return;

        const rect = anchor.current.getBoundingClientRect();
        const currentPosition = rect.y;

        if (currentPosition !== lastPosition) {
          updateMenuPosition();
        }

        lastPosition = currentPosition;

      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [open]);

  function handleMenuRef(menu: HTMLDivElement | null) {
    ref.current = menu;
    updateMenuPosition();
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClose?.();
    event.stopPropagation();
  }

  function updateMenuPosition() {

    const menu = ref.current;
    const element = anchor.current;

    if (menu && element) {

      const elementRect = element.getBoundingClientRect();
      const menuRect = menu.getBoundingClientRect();
      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;
      const menuBottom = elementRect.top + menuRect.height + 12;

      if (autoWith) {
        menu.style.width = `${elementRect.width}px`;
      }

      menu.style.right = `${bodyWidth - (elementRect.right - right)}px`;
      
      menu.style.top = menuBottom < bodyHeight 
        ? `${elementRect.bottom + top}px`
        : `${elementRect.top - (menuRect.height + top)}px`;

      menu.style.visibility = 'visible';
      menu.focus();
    }
  }

  return createPortal(
    <CSSTransition
      in={open}
      unmountOnExit={true}
      classNames={style.animation}
      timeout={160}
      nodeRef={ref}>
      <div 
        tabIndex={autofocus ? 0 : undefined}
        onBlur={onClose} 
        className={style.container}
        ref={handleMenuRef}
        onClick={handleClick}>
        {children}
      </div>
    </CSSTransition>, 
    document.body
  );
}
