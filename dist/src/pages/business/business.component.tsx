import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { AppToolbar } from '@recargas-dominicanas/core/components';
import { Divider } from '../../components/divider/divider.component';
import { InfoItem } from '../../components/info-item/info-item.component';
import { Info } from '../../components/info/info.component';
import { NavItem } from '../../components/nav-item/nav-item.component';
import { style } from './business.module.css';
import { formatCurrency, formatId, formatPhone } from '@recargas-dominicanas/core/utils';
import { getBusinessById } from '../../store/business.slice';

export function Business() {

  const history = useHistory();
  const location = useLocation<{ id: number }>();
  const business = getBusinessById(location.state?.id);

  if (!business) {
    return <Redirect to='/'/>;
  }

  return (
    <div className={style.container}>
      <AppToolbar 
        icon='arrow_back' 
        title={business.name}
        onClick={() => history.goBack()}/>
      <div className={style.content}>
        <Info title='Ventas'>
          <InfoItem title='Balance' value={formatCurrency(business.balance)} color='green'/>
          <InfoItem title='Ventas' value={formatCurrency(business.sales)} color='green'/>
          <InfoItem title='Beneficio' value={formatCurrency(business.profit)} color='green'/>
        </Info>
        <Divider/>
        <div className={style.navItems}>
          <NavItem icon='groups' title='Usuarios'/>
          <NavItem icon='history' title='Transacciones'/>
          <NavItem icon='payments' title='Depositos'/>
        </div>
        <Divider/>
        <Info title='Informacion'>
          <InfoItem title='Id' value={formatId(business.id)}/>
          <InfoItem title='RNC' value={business.rnc}/>
          <InfoItem title='Teléfono' value={formatPhone(business.phone)}/>
          <InfoItem title='Email' value={business.email}/>
          <InfoItem title='Ciudad' value={business.city}/>
          <InfoItem title='Direccion' value={business.address}/>
        </Info>
        <Divider/>
        <Info title='Propietario'>
          <InfoItem title='Nombre' value={business.customer.name}/>
          <InfoItem title='Cédula' value={business.customer.docNumber}/>
          <InfoItem title='Teléfono' value={formatPhone(business.customer.phone)}/>
          <InfoItem title='Email' value={business.customer.email}/>
        </Info>
      </div>
    </div>
  );
}
