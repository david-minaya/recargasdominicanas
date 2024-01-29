import React, { ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './page.module.css';

interface Props {
  className?: Style;
  title: string;
  animate?: boolean;
  children: ReactNode;
}

export function Page(props: Props) {

  const { 
    className,
    title,
    animate = false,
    children 
  } = props;

  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const style = mergeStyle(className);

  return (
    <CSSTransition
      in={true}
      appear={true}
      unmountOnExit={true}
      nodeRef={ref}
      classNames={animate ? style.pageAnimation : undefined}
      timeout={200}>
      <div 
        className={style.container}
        ref={ref}>
        <AppToolbar 
          icon='arrow_back' 
          title={title}
          onClick={() => history.goBack()}/>
        <div className={style.content}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}
