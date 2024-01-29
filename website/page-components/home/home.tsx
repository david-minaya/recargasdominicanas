import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Footer } from '../../components/footer';
import { SystemSection } from '../../components/system-section';
import { CircleItem } from '../../components/circle-item';
import { IconItem } from '../../components/icon-item';
import { RequirementItem } from '../../components/requirement-item';
import { style } from './home.module.css';

export function Home() {
  return (
    <div>
      <Head>
        <title>Recargas Dominicanas - Sistemas de recargas para RD</title>
        <meta 
          name='description' 
          content={
            `Sistemas de recargas para la República Dominicana. Venta de recargas de todas 
            las compañías: Claro, Altice, Viva, Natcom y Digicel. Venta de paqueticos de internet 
            y anulación de recargas.`
          }/>
        <meta property='og:type' content='website'/>
        <meta property='og:title' content='Recargas Dominicanas' />
        <meta property='og:locale' content='es_DO'/>
        <meta property='og:url' content='https://www.recargasdominicanas.do'/>
        <meta property='og:description' content="Sistemas de recargas para la República Dominicana"/>
        <meta property='og:image' content='https://www.recargasdominicanas.do/images/recargas-dominicanas-og.png'/>
        <meta property='og:image:width' content='1080'/>
        <meta property='og:image:height' content='1080'/>
        <meta property='fb:app_id' content='215011753711091'/>
      </Head>
      <Header/>
      <div className={style.hero}>
        <div className={style.introduction}>
          <h2>Sistemas de recargas para la República Dominicana</h2>
          <p>Instala tu sistema de recargas sin tener que salir de tu negocio.</p>
          <p>Trabajamos con <b>Disashop</b>, la compañía de recargas más grande de la República Dominicana.</p>
          <Button 
            style={style.introductionButton} 
            text='Solicitar Sistema' 
            onClick={() => Router.push('/request-system')}/>
        </div>
        <div className={style.imageContainer}>
          <img className={style.heroImage} src='images/sistemas.png'/>
        </div>
      </div>
      <div className={style.services}>
        <CircleItem 
          image='images/recargas.svg' 
          title='Venta de recargas' 
          style={style.circleItemService}
          description={[
            'Venta de recargas de todas las compañías',
            '<b>Claro</b>, <b>Altice</b>, <b>Viva</b>, <b>Digicel</b>, <b>Natcom</b> y <b>Moun</b>'
          ]}/>
        <CircleItem 
          image='images/paqueticos.svg'
          title='Venta de paqueticos' 
          style={style.circleItemService}
          description={[
            'Venta de paqueticos de internet',
            '<b>Claro</b>, <b>Altice</b>, <b>Viva</b> y <b>Wind Telecom</b>'
          ]}/>
        <CircleItem 
          image='images/anulacion.svg' 
          title='Anulación de recargas' 
          style={style.circleItemService}
          description={[
            'Hasta 15 minutos de anulación',
            '<b>15 min Claro</b>, <b>10 min Altice</b> y <b>5 min otras</b>'
          ]}/>
      </div>
      <div className={style.imageItems}>
        <img className={style.imageItem} src='images/claro.svg'/>
        <img className={style.imageItem} src='images/altice.svg'/>
        <img className={style.imageItem} src='images/viva.svg'/>
        <img className={style.imageItem} src='images/digicel.svg'/>
        <img className={style.imageItem} src='images/moun.svg'/>
        <img className={style.imageItem} src='images/natcom.svg'/>
      </div>
      <div className={style.title}>Nuestros sistemas</div>
      <SystemSection
        title='Disashop PC' 
        image='images/disashop-pc.png' 
        description='Sistema de recargas para computadoras (Windows).'
        style={style.systemSectionDesktop}/>
      <SystemSection
        title='Disashop App' 
        image='images/disashop-app.jpg' 
        description='Sistema de recargas para celulares Android.'
        style={style.systemSectionApp}/>
      <div className={style.title2}>Beneficios</div>
      <div className={style.iconItems}>
        <div>
          <IconItem icon='money' text='5% de beneficio'/>
          <IconItem icon='gift' text='Artículos promocionales'/>
          <IconItem icon='dices' text='Sorteos'/>
        </div>
        <div>
          <IconItem icon='support_agent' text='Centro de atención al cliente'/>
          <IconItem icon='stable' text='Plataforma estable'/>
          <IconItem icon='sticker' text='Afiches publicitarios'/>
        </div>
      </div>
      <div className={style.title2}>Donde comprar el balance</div>
      <div className={style.paymentMethods}>
        <CircleItem 
          image='images/banco.svg' 
          title='Bancos' 
          style={style.circleItemPayment}/>
        <CircleItem 
          image='images/cajero.svg' 
          title='Cajeros' 
          style={style.circleItemPayment}/>
        <CircleItem 
          image='images/subagente.svg' 
          title='Sub Agentes' 
          style={style.circleItemPayment}/>
        <CircleItem 
          image='images/transaccion.svg' 
          title='Transacciones' 
          style={style.circleItemPayment}/>
      </div>
      <div className={style.imageItems}>
        <img className={style.imageItem} src='images/popular.svg'/>
        <img className={style.imageItem} src='images/reservas.svg'/>
        <img className={style.imageItem} src='images/bhd.svg'/>
        <img className={style.imageItem} src='images/progreso.svg'/>
        <img className={style.imageItem} src='images/promerica.svg'/>
        <img className={style.imageItemHidden}/>
      </div>
      <div className={style.title}>Requisitos</div>
      <div className={style.requirementItems}>
        <RequirementItem 
          image='images/shop.png' 
          title='Tener o administrar un negocio'
          description='Colmado, Minimarket, farmacia, Supermercado, etc.'/>
        <RequirementItem 
          image='images/internet.png' 
          title='Tener una conexión a internet estable'
          description='Tener un celular o una computadora con internet.'/>
      </div>
      <div className={style.questionsSection}>
        <div className={style.questionsSectionTitle}>¿Necesita más información?</div>
        <p className={style.questionsSectionText}>
          Consulte nuestra sección de
          <Link href='/faq'>
            <a className={style.questionSectionLink}> Preguntas frecuentes</a>
          </Link>
        </p>
      </div>
      <Button 
        style={style.button} 
        text='Solicitar Sistema'
        onClick={() => Router.push('/request-system')}/>
      <Footer/>
    </div>
  );
}
