import React, { Children, cloneElement, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { DrawerHeader } from '../drawer-header/drawer-header.component';
import { DrawerItem } from '../drawer-item/drawer-item.component';
import { style } from './drawer.module.css';

interface Props {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Drawer(props: Props) {

  const {
    open,
    children: _children,
    onClose
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const children = Children.toArray(_children);
  const drawerHeader = children.find((child: any) => child.type === DrawerHeader);
  const drawerItems = children.filter((child: any) => child.type === DrawerItem);
  const topItems = drawerItems.filter((child: any) => child.props.align === 'top');
  const bottomItems = drawerItems.filter((child: any) => child.props.align === 'bottom');

  return createPortal(
    <CSSTransition
      in={open}
      timeout={300}
      unmountOnExit
      nodeRef={containerRef}>
      <div 
        className={style.container}
        ref={containerRef}>
        <CSSTransition
          appear
          in={open}
          timeout={300}
          unmountOnExit
          classNames={style.backgroundAnimation}
          nodeRef={backgroundRef}>
          <div 
            className={style.background}
            ref={backgroundRef} 
            onClick={onClose}/>
        </CSSTransition>
        <CSSTransition
          appear
          in={open} 
          timeout={300}
          unmountOnExit
          classNames={style.drawerAnimation}
          nodeRef={drawerRef}>
          <div 
            className={style.drawer}
            ref={drawerRef}>
            {drawerHeader}
            <div className={style.drawerItems}>
              <div>
                {topItems.map((child: any) =>
                  cloneElement(child, {
                    onCloseDrawer: onClose
                  }) 
                )}
              </div>
              <div>
                {bottomItems.map((child: any) =>
                  cloneElement(child, {
                    onCloseDrawer: onClose
                  }) 
                )}
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>,
    document.body
  );
}
