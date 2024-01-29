import React from 'react';
import Head from 'next/head';
import { useState } from 'react';
import { Header } from '../../components/header';
import { FormTabs } from '../../components/form-tabs';
import { SystemRequested } from '../../components/system-requested';
import { Switch } from '../../components/switch';
import { Case } from '../../components/case';
import { style } from './request-system.module.css';

export function RequestSystem() {

  const [content, setContent] = useState('FORM');

  function handleFormFinished() {
    setContent('SYSTEM_REQUESTED');
  }

  return (
    <div className={style.requestSystem}>
      <Head>
        <title>Solicitar Sistema - Recargas Dominicanas</title>
      </Head>
      <Header style={style.header}/>
      <Switch caseId={content}>
        <Case caseId='FORM'>
          <FormTabs onFormFinished={handleFormFinished}/>
        </Case>
        <Case caseId='SYSTEM_REQUESTED'>
          <SystemRequested/>
        </Case>
      </Switch>
    </div>
  );
}
