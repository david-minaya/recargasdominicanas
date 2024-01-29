import React from 'react';
import Head from 'next/head';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { FaqItem } from '../../components/faq-item';
import { FaqModal } from '../../components/faq-modal';
import { Button } from '../../components/button';
import { FloatButton } from '../../components/float-button';
import { Toast } from '../../components/toast';
import { style } from './faq.module.css';

export function Faq() {

  const [isFaqModalOpen, setIsFaqModalOpen] = React.useState(false);
  const [isFloatButtonVisible, setIsFloatButtonVisible] = React.useState(true);
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [isQuestionSent, setIsQuestionSent] = React.useState(true);

  // Watch if the button is visible in the viewport
  React.useEffect(() => {
    const cb = ([e]) => setIsButtonVisible(e.isIntersecting);
    const options = { threshold: 0.0, rootMargin: '50px' };
    const observer = new IntersectionObserver(cb, options);
    const button = document.querySelector('#ask_question_button');
    observer.observe(button);
    return () => observer.disconnect();
  }, []);

  function handleOpenFaqModal() {
    setShowToast(false);
    setIsFaqModalOpen(true);
    setIsFloatButtonVisible(false);
  }

  function handleCloseFaqModal() {
    setIsFaqModalOpen(false);
    setIsFloatButtonVisible(true);
  }

  function handleQuestionSent(isSent: boolean) {
    setShowToast(true);
    setIsQuestionSent(isSent);
  }

  return (
    <div className={style.faq}>
      <Head>
        <title>Preguntas frecuentes - Recargas Dominicanas</title>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ 
          __html: `{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuáles son los requisitos para vender recargas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "
                    <p>Los únicos requisitos para trabajar con nosotros son: tener un <b>negocio</b>, tener una <b>computadora</b> o <b>celular Android</b> con <b>internet</b> y realizar la compra del balance.</p>
                    <p>Si cumple con estos requisitos puede realizar una solicitud para instalarle el sistema de recargas.</p>
                  "
                }
              }, 
              {
                "@type": "Question",
                "name": "¿Cómo puedo cancelar una recarga?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "
                    <p>Para cancelar una recarga desde la <b>App Disashop</b> vaya a <b>Operaciones</b>, presione el botón <b>Aplicar Filtros</b> y por último presione la <b>x</b> en la recarga que desea cancelar.</p>
                    <p>Si está utilizando el <b>Disashop PC</b>, diríjase a <b>Negocios</b> > <b>Operaciones</b> y presione la <b>x</b> en la recarga que desea cancelar.</p>
                    <p>El tiempo de cancelación de las recargas es de <b>15 minutos</b> para <b>Altice</b>, <b>10 minutos</b> para <b>Claro</b> y <b>5 minutos</b> para <b>Viva</b>, <b>Digicel</b>, <b>Moun</b> y <b>Natcom</b>.</p>
                  "
                }
              },
              {
                "@type": "Question",
                "name": "¿Dónde puedo comprar el balance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "
                    <p>Puede comprar el balance por los bancos: <b>Popular</b>, <b>Reservas</b>, <b>BHD León</b>, <b>Progreso</b> y <b>Promerica</b>. El mínimo a comprar es de 3,000 pesos por los bancos Reservas y Progreso, y de 5,000 pesos por los otros bancos.</p>
                    <p>También puede comprar el balance a través de <b>sub agentes bancarios</b>, <b>cajeros automáticos</b> y <b>transferencias bancarias</b>. Recomendamos comprar el balance utilizando alguno de estos métodos porque que es <b>más rápido</b> y no es necesario hacer fila. Puede encontrar sub agentes bancarios en casi cualquier farmacia o supermercado, del mismo modo, la mayoría de los bancos hoy en día tienen cajeros de depósito.</p>
                  "
                }
              },
              {
                "@type": "Question",
                "name": "¿Por qué no me ha llegado el balance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "
                    <p>El balance no será aplicado automáticamente cuando deposite <b>por debajo del mínimo</b> o cuando pongan mal el <b>id como referencia</b>. También tiene que tener en cuenta que el balance toma de <b>10 a 30 minutos</b> en ser aplicado. Si en ese tiempo el balance no es aplicado, envíenos una imagen del <b>comprobante</b> del depósito o transferencia.</p>
                    <p>El mínimo a comprar de balance es de <b>3,000 pesos</b> por los bancos <b>Reservas</b> y <b>Progreso</b>. Y de <b>5,000 pesos</b> por los bancos <b>Popular</b>, <b>BHD León</b> y <b>Promerica</b>. Si deposita una cantidad menor a esta, el balance no será aplicado y tendrá que completar el mínimo para poder aplicárselo.</p>
                    <p>El balance se aplica <b>automáticamente</b> en los siguientes casos: cuando realice un depósito por el banco; cuando realice una transferencia por el banco Popular o el banco de Reserva; y cuando realice un depósito por el cajero automático del banco BHD León. En los demás casos tendrá que enviarnos una imagen del recibo para poder aplicarle el balance.</p>
                  "
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo obtengo mis ganancias?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "
                    <p>Las ganancias <b>se acumulan</b> en forma de balance cada vez que vende recargas. Por ejemplo, si usted vende una recarga de 100 pesos, a usted le quedaran 5 pesos de <b>beneficio como balance</b>. Otro ejemplo, si usted compra 5,000 pesos de recargas, cuando usted termine de vender las recargas, habrá vendido 5,250 pesos de recargas, los 5,000 que compro de balance y los 250 de ganancia.</p>
                    <p>Puede consultar la ganancia del mes actual en la <b>App Disashop</b> abriendo el menú lateral de la aplicación, deslizando desde el borde izquierdo de la pantalla. Y desde el <b>Disashop PC</b> dirigiéndose a la pestaña <b>Zona clientes</b>.</p>
                  "
                }
              }
            ]
          }`
        }}/>
      </Head>
      <Header/>
      <h1 className={style.title}>Preguntas Frecuentes</h1>
      <div className={style.faqs}>
        <FaqItem
          title='¿Cuáles son los requisitos para vender recargas?'
          details={[
            'Los únicos requisitos para trabajar con nosotros son: tener un <b>negocio</b>, tener una <b>computadora</b> o <b>celular Android</b> con <b>internet</b> y realizar la compra del balance.',
            'Si cumple con estos requisitos puede realizar una solicitud para instalarle el sistema de recargas.'
          ]}
        />
        <FaqItem
          title='¿Cómo puedo cancelar una recarga?'
          details={[
            'Para cancelar una recarga desde la <b>App Disashop</b> vaya a <b>Operaciones</b>, presione el botón <b>Aplicar Filtros</b> y por último presione la <b>x</b> en la recarga que desea cancelar.',
            'Si está utilizando el <b>Disashop PC</b>, diríjase a <b>Negocios</b> > <b>Operaciones</b> y presione la <b>x</b> en la recarga que desea cancelar.',
            'El tiempo de cancelación de las recargas es de <b>15 minutos</b> para <b>Altice</b>, <b>10 minutos</b> para <b>Claro</b> y <b>5 minutos</b> para <b>Viva</b>, <b>Digicel</b>, <b>Moun</b> y <b>Natcom</b>.'
          ]}
        />
        <FaqItem
          title='¿Dónde puedo comprar el balance?'
          details={[
            'Puede comprar el balance por los bancos: <b>Popular</b>, <b>Reservas</b>, <b>BHD León</b>, <b>Progreso</b> y <b>Promerica</b>. El mínimo a comprar es de 3,000 pesos por los bancos Reservas y Progreso, y de 5,000 pesos por los otros bancos.',
            'También puede comprar el balance a través de <b>sub agentes bancarios</b>, <b>cajeros automáticos</b> y <b>transferencias bancarias</b>. Recomendamos comprar el balance utilizando alguno de estos métodos porque que es <b>más rápido</b> y no es necesario hacer fila. Puede encontrar sub agentes bancarios en casi cualquier farmacia o supermercado, del mismo modo, la mayoría de los bancos hoy en día tienen cajeros de depósito.'
          ]}
        />
        <FaqItem
          title='¿Por qué no me ha llegado el balance?'
          details={[
            'El balance no será aplicado automáticamente cuando deposite <b>por debajo del mínimo</b> o cuando pongan mal el <b>id como referencia</b>. También tiene que tener en cuenta que el balance toma de <b>10 a 30 minutos</b> en ser aplicado. Si en ese tiempo el balance no es aplicado, envíenos una imagen del <b>comprobante</b> del depósito o transferencia.',
            'El mínimo a comprar de balance es de <b>3,000 pesos</b> por los bancos <b>Reservas</b> y <b>Progreso</b>. Y de <b>5,000 pesos</b> por los bancos <b>Popular</b>, <b>BHD León</b> y <b>Promerica</b>. Si deposita una cantidad menor a esta, el balance no será aplicado y tendrá que completar el mínimo para poder aplicárselo.',
            'El balance se aplica <b>automáticamente</b> en los siguientes casos: cuando realice un depósito por el banco; cuando realice una transferencia por el banco Popular o el banco de Reserva; y cuando realice un depósito por el cajero automático del banco BHD León. En los demás casos tendrá que enviarnos una imagen del recibo para poder aplicarle el balance.'
          ]}
        />
        <FaqItem
          title='¿Cómo obtengo mis ganancias?'
          details={[
            'Las ganancias <b>se acumulan</b> en forma de balance cada vez que vende recargas. Por ejemplo, si usted vende una recarga de 100 pesos, a usted le quedaran 5 pesos de <b>beneficio como balance</b>. Otro ejemplo, si usted compra 5,000 pesos de recargas, cuando usted termine de vender las recargas, habrá vendido 5,250 pesos de recargas, los 5,000 que compro de balance y los 250 de ganancia.',
            'Puede consultar la ganancia del mes actual en la <b>App Disashop</b> abriendo el menú lateral de la aplicación, deslizando desde el borde izquierdo de la pantalla. Y desde el <b>Disashop PC</b> dirigiéndose a la pestaña <b>Zona clientes</b>.'
          ]}
        />
      </div>
      <Button 
        id='ask_question_button'
        style={style.questionButton} 
        text='Haganos una pregunta' 
        onClick={handleOpenFaqModal}/>
      <div className={style.bottomContainer}>
        <FloatButton
          style={style.floatButton} 
          icon='?' 
          text='Haganos una pregunta' 
          isVisible={!isButtonVisible && isFloatButtonVisible}
          onClick={handleOpenFaqModal}/>
        <Toast
          style={style.toast}
          show={showToast} 
          onClose={() => setShowToast(false)}
          text={
            isQuestionSent 
              ? 'Pregunta enviada correctamente' 
              : 'Ocurrió un error al enviar la pregunta, inténtelo de nuevo'
          }/>
      </div>
      <FaqModal 
        isOpen={isFaqModalOpen} 
        onClose={handleCloseFaqModal}
        onQuestionSent={handleQuestionSent}/>
      <Footer/>
    </div>
  );
}
