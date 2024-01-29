import React, { cloneElement, ReactNode } from 'react';
import { Style, mergeStyle } from './modal-options.module.css';

interface Props { 
  style?: Style,
  children: ReactNode | ReactNode[]
}

export function ModalOptions(props: Props) {

  const {
    style: customStyle,
    children: _children
  } = props;

  const style = mergeStyle(customStyle);
  const children = Array.isArray(_children) ? _children : [_children];

  return (
    <div className={style.container}>
      {
        children?.map((child: any, index) => {
          if (child && typeof child === 'object') {
            return cloneElement(child as any, {
              key: index,
              style: style.option
            });
          }
        })
      }
    </div>
  );
}
