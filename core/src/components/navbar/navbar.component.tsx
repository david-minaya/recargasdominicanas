import React, { ReactElement } from 'react';
import { Style, mergeStyle } from './navbar.module.css';

interface Props {
  children: ReactElement[];
  style?: Style;
}

export function Navbar(props: Props) {

  const {
    children,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);
  const topOptions = children.filter(child => !child.props.align || child.props.align === 'top' );
  const bottomOptions = children.filter(child => child.props.align === 'bottom');

  return (
    <div className={style.container}>
      <div className={style.content}>
        {topOptions}
      </div>
      <div className={style.content}>
        {bottomOptions}
      </div>
    </div>
  );
}
