import React from 'react';
import { FooterSection } from '../footer-section';
import { HorizontalLine } from '../horizontal-line';
import { style } from './footer.module.css';

export function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerSections}>
        <FooterSection
          title='Contacto'
          links={[
            { 
              name: '(849) 409-5924', 
              url: 'https://wa.me/18494095924',
              target: '_blank'
            },
            { 
              name: 'negocios@recargasdominicanas.do', 
              url: 'mailto:negocios@recargasdominicanas.do' 
            }
          ]}
        />
        <FooterSection
          title='Enlaces'
          links={[
            { name: 'Página principal', url: '/' },
            { name: 'Solicitar sistema', url: '/request-system' },
            { name: 'Preguntas frecuentes', url: '/faq' }
          ]}
        />
      </div>
      <HorizontalLine style={style.horizontalLine}/>
    </footer>
  );
}
