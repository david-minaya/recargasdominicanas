import React from 'react';
import { Button, OutlineButton } from '@recargas-dominicanas/core/components';
import { style } from './product-card-buttons.module.css';

interface Props {
  onAccept: () => void;
  onCancel: () => void;
}

export function ProductCardButtons(props: Props) {

  const {
    onAccept,
    onCancel
  } = props;

  return (
    <div className={style.buttons}>
      <Button 
        style={style.button} 
        text='Cancelar'
        onClick={onCancel}/>
      <OutlineButton
        style={style.button}
        text='Realizar'
        onClick={onAccept}/>
    </div>
  );
}
