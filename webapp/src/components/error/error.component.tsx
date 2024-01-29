import clsx from 'clsx';
import React, { forwardRef } from 'react';
import warningIcon from '../../images/warning.svg';
import { style } from './error.module.css';
import { Button } from '@recargas-dominicanas/core/components';

interface Props {
  className?: string;
  onClick: () => void;
}

export const Error = forwardRef<HTMLDivElement, Props>(function Error(props, ref) {

  const { 
    className,
    onClick 
  } = props;

  return (
    <div
      ref={ref}
      className={clsx(style.container, className)}>
      <img className={style.image} src={warningIcon}/>
      <div className={style.title}>Ocurrio un error al cargar los datos</div>
      <Button 
        text='Reintentar'
        onClick={onClick}/>
    </div>
  );
});
