import React, { cloneElement } from 'react';
import { Style, mergeStyle } from './modal-actions.module.css';

type Child = JSX.Element | false;

interface Props { 
  children: Child | [Child?, Child?],
  style?: Style
}

export function ModalActions(props: Props) {

  const {
    children: _children,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const children = Array.isArray(_children) ? _children : [_children];
  const [secondaryButton, primaryButton] = children;

  return (
    <div className={style.container}>
      {primaryButton && 
        cloneElement(primaryButton, { style: style.actionButton })
      }
      {secondaryButton && 
        cloneElement(secondaryButton, { style: style.actionButton })
      }
    </div>
  );
}
