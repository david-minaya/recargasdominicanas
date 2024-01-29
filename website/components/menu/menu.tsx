import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../button';
import { style } from './menu.module.css';

interface props {
  show?: boolean;
}

export function Menu({ show = true }: props) {
  return (
    <CSSTransition 
      in={show} 
      timeout={{ enter: 900, exit: 400 }} 
      unmountOnExit    
      classNames={style.animation}>
      <div className={style.menu}>
        <Link href='/faq'>
          <a className={style.option}>
            Preguntas frecuentes
          </a>
        </Link>
        <Button 
          style={style.button} 
          text='Solicitar Sistema' 
          onClick={() => Router.push('/request-system')}/>
      </div>
    </CSSTransition>
  );
}
