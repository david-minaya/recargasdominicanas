import React from 'react';
import { IBusiness, ICustomer } from '@recargas-dominicanas/core/types';
import { formatId, formatPhone } from '@recargas-dominicanas/core/utils';
import { OutlineCard, Title } from '@recargas-dominicanas/core/components';
import { TextItem } from '@recargas-dominicanas/core/components';
import { Style, mergeStyle } from './customer-card.module.css';

interface Props {
  customer: ICustomer,
  business: IBusiness,
  style?: Style
}

export function CustomerCard(props: Props) {

  const {
    customer,
    business,
    style: customStyle
  } = props;

  const style = mergeStyle(customStyle);

  return (
    <OutlineCard className={style.container}>
      <div className={style.data}>
        <Title style={style.title} title='Datos del cliente'/>
        <TextItem style={style.textItem} title='Nombre' text={customer.name}/>
        <TextItem style={style.textItem} title='Cédula' text={customer.docNumber}/>
        <TextItem style={style.textItem} title='Teléfono' text={formatPhone(customer.phone)}/>
        <TextItem style={style.textItem} title='Correo electrónico' text={customer.email}/>
      </div>
      <div className={style.data}>
        <Title style={style.title} title='Datos del negocio'/>
        <TextItem style={style.textItem} title='Nombre' text={business.name}/>
        <TextItem style={style.textItem} title='RNC' text={business.rnc}/>
        <TextItem style={style.textItem} title='ID' text={formatId(business.id)}/>
        <TextItem style={style.textItem} title='Teléfono' text={formatPhone(business.phone)}/>
        <TextItem style={style.textItem} title='Correo electrónico' text={business.email}/>
        <TextItem style={style.textItem} title='Ciudad' text={business.city}/>
        <TextItem style={style.textItem} title='Dirección' text={business.address}/>
      </div>
    </OutlineCard>
  );
}
