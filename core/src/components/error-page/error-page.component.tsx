import React from 'react';
import { useHistory } from 'react-router-dom';
import { OutlineButton } from '../../components';
import { style } from './error-page.module.css';

interface Props {
  image: string;
  onClick?: () => void;
}

export function ErrorPage(props: Props) {

  const { 
    image,
    onClick
  } = props;

  const history = useHistory();

  function handleClick() {
    history.replace('/');
    onClick?.();
  }

  return (
    <div className={style.container}>
      <img className={style.image} src={image}/>
      <h1 className={style.title}>Ocurrió un error al conectarse con el servidor</h1>
      <p className={style.description}>
        Asegúrese de estar conectado a internet e inténtelo de nuevo más tarde.
      </p>
      <OutlineButton 
        style={style.button}
        text='Actualizar'
        onClick={handleClick}/>
    </div>
  );
}
