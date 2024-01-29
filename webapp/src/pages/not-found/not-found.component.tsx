import React from 'react';
import { Text, Brand } from '@recargas-dominicanas/core/components';
import { style } from './not-found.module.css';

export function NotFound() {
  return (
    <div className={style.container}>
      <Brand style={style.brand}/>
      <div>
        <Text className={style.error} text='404'/>
        <Text className={style.message} text='Pagina no encontrada'/>
      </div>
    </div>
  );
}
