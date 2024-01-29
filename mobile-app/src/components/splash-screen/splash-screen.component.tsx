import React from 'react';
import clsx from 'clsx';
import { style } from './splash-screen.module.css';

interface Props {
  animate?: boolean;
}

export function SplashScreen(props: Props) {
  return (
    <div className={clsx(style.container, props.animate && style.animation)}>
      <div className={style.content}>
        <img className={style.logo} src='/recargas-dominicanas-32x32.svg'/>
        <span className={style.title}>Recargas Dominicanas</span>
      </div>
    </div>
  );
}
