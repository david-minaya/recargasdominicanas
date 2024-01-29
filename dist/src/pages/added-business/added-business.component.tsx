import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { copy, formatId } from '@recargas-dominicanas/core/utils';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { Divider } from '../../components/divider/divider.component';
import { InfoItem } from '../../components/info-item/info-item.component';
import { Info } from '../../components/info/info.component';
import { style } from './added-business.module.css';

export function AddedBusiness() {

  const history = useHistory();
  const location = useLocation<any>();

  if (!location.state) {
    return <Redirect to='/'/>;
  }

  const { 
    customer,
    business,
    businessUser,
    token 
  } = location.state;
  
  const link = `${process.env.WEB_APP_DOMAIN}/create-password/${token}`;

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title='Cliente agregado'
        onClick={() => history.replace('/')}/>
      <div className={style.content}>
        <Info title='Información'>
          <InfoItem title='Negocio' value={business.name}/>
          <InfoItem title='Propietario' value={customer.name}/>
          <InfoItem title='Id' value={formatId(business.id)}/>
          <InfoItem title='Usuario' value={businessUser.userName} color='red'/>
        </Info>
        <Divider/>
        <div className={style.title}>Enlace de activación</div>
        <div className={style.link}>{link}</div>
        <div 
          className={style.copy}
          onClick={() => copy(link)}>
          Copiar enlace
        </div>
      </div>
    </div>
  );
}
