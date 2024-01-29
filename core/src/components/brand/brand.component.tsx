import React from 'react';
import logo from '../../images/recargas-dominicanas.svg';
import { Title } from '../title/title.component';
import { Style, mergeStyle } from './brand.module.css';

interface Props { 
  style?: Style
}

export function Brand(props: Props) {

  const { 
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <div className={style.container}>
      <img className={style.logo} src={logo}/>
      <Title
        style={style.title}
        title='Recargas Dominicanas'/>
    </div>
  );
}
