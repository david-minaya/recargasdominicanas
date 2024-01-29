import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

export function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <link rel="shortcut icon" href="images/favicon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-194128981-1"/>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-194128981-1');
        `}}/>
      </Head>
      <Component {...pageProps} />
    </React.Fragment>
  );
}
