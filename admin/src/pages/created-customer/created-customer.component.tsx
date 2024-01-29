import React from 'react';
import androidLogo from '../../images/android-logo.png';
import webLogo from '../../images/web-logo.png';
import { useLocation, Redirect } from 'react-router';
import { Icon, Option, OutlineCard, Title, ToolbarTitle } from '@recargas-dominicanas/core/components';
import { copy, formatId } from '@recargas-dominicanas/core/utils';
import { TextItem } from '@recargas-dominicanas/core/components';
import { CustomerCard } from '../../components/customer-card/customer-card.component';
import { style } from './created-customer.module.css';
import { PageContainer } from '@recargas-dominicanas/core/components';
import { PageToolbar } from '@recargas-dominicanas/core/components';
import { PageContent } from '@recargas-dominicanas/core/components';

export function CreatedCustomer() {

  const location = useLocation<any>();

  if (!location.state) return <Redirect to='/'/>;

  const { 
    customer,
    business,
    businessUser,
    token 
  } = location.state;
  
  const link = `${process.env.WEB_APP_DOMAIN}/create-password/${token}`;

  function handleCopy<T>(text: T) {
    return async () => {
      await copy(text);
    };
  }

  return (
    <PageContainer>
      <PageToolbar>
        <ToolbarTitle title='Cliente creado exitosamente'/>
      </PageToolbar>
      <PageContent className={style.content}>
        <CustomerCard
          style={style.customerCard}
          customer={customer} 
          business={business}/>
        <div className={style.rightContent}>
          <OutlineCard className={style.loginInfo}>
            <Title title='Informacion de inicio de sesion'/>
            <div className={style.loginInfoContent}>
              <TextItem 
                style={style.fillTextItem}
                title='Código del negocio' 
                text={formatId(business.id)}
                icon='copy'
                onOptionClick={handleCopy(formatId(business.id))}/>
              <TextItem 
                style={style.fillTextItem}
                title='Usuario' 
                text={businessUser.userName}
                icon='copy'
                onOptionClick={handleCopy(businessUser.userName)}/>
            </div>
          </OutlineCard>
          <TextItem 
            style={style.activationLink}
            title='Enlace de activacion'
            text={link}
            icon='copy'
            onOptionClick={handleCopy(link)}/>
          <div className={style.appsContainer}>
            <OutlineCard className={style.appCard}>
              <img className={style.appCardImage} src={androidLogo}/>
              <span className={style.appCardTitle}>Aplicación Android</span>
              <span className={style.appCardVersion}>v6.2.1</span>
              <div className={style.appCardOptions}>
                <Option style={style.appCardOption} icon='copy' text='Copiar enlace'/>
                <Option style={style.appCardOption} icon='file_download' text='Descargar'/>
              </div>
            </OutlineCard>
            <OutlineCard className={style.appCard}>
              <img className={style.appCardImage} src={webLogo}/>
              <span className={style.appCardTitle}>Aplicación Web</span>
              <a 
                className={style.appCardUrl} 
                href='https://wwww.recargasdominicanas.do'>
                <span>recargasdominicanas.do</span>
                <Icon 
                  className={style.externalIcon} 
                  icon='open_in_new_blank'/>
              </a>
              <div className={style.appCardOptions}>
                <Option style={style.appCardOption} icon='copy' text='Copiar enlace'/>
              </div>
            </OutlineCard>
          </div>
        </div>
      </PageContent>
    </PageContainer>
  );
}
