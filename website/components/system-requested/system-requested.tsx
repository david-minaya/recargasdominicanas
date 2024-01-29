import React from 'react';
import Link from 'next/link';
import { ImageTextItem } from '../image-text-item';
import { style } from './system-requested.module.css';

export function SystemRequested() {
  return (
    <div className={style.systemRequested}>
      <h1 className={style.title}>¡Gracias por solicitar nuestro sistema de recargas!</h1>
      <p className={style.description}>
        Nos pondremos en contacto con usted lo antes posible para <b>continuar </b>
        con la instalación del sistema (máximo 48 hrs).
      </p>
      <img className={style.image} src='images/customer-service.jpg' />
      <div className={style.socialMedia}>
        <ImageTextItem
          image='images/instagram.png'
          text='@recargasdominicanas'
          onClick={() => window.open('https://instagram.com/recargasdominicanas', '_blank')} />
        <ImageTextItem
          image='images/facebook.png'
          text='@recargasdominicanas.do'
          onClick={() => window.open('https://www.facebook.com/recargasdominicanas.do', '_blank')} />
      </div>
      <p className={style.socialMediaDescription}>
        Síganos en nuestras <b>redes sociales</b>, para mantenerse al
        tanto de las últimas novedades y promociones.
      </p>
      <Link href='/'>
        <a className={style.link}>Volver a la página de inicio</a>
      </Link>
    </div>
  );
}
