import React from 'react';
import { IFormData } from '../../types';
import { formValidation } from '../../validations';
import { Case } from '../case';
import { Form } from '../form';
import { InstallSystem } from '../install-system';
import { Summary } from '../summary';
import { Switch } from '../switch';
import { SystemOptions } from '../system-options';
import { Tab } from '../tab';
import { style } from './form-tabs.module.css';

interface Props {
  onFormFinished: () => void;
}

export function FormTabs({ onFormFinished }: Props) {

  const [selectedTabId, setSelectedTabId] = React.useState(1);
  const [isFormDataSended, setFormDataSended] = React.useState(false);

  const [formData, setFormData] = React.useState<IFormData>({
    name: '', businessName: '', id: '', phone: '',
    email: '', city: '', address: '', system: undefined,
  });

  const isFormDataValid = formValidation(formData);
  const isSystemValid = Boolean(formData.system);

  function handleTabClicked(tabId: number) {
    setSelectedTabId(tabId);
  }

  function handleUpdateFormData(formData: any) {
    setFormData(formData);
  }

  function handleSystemChange(system: string) {
    setFormData(formData => ({ ...formData, system }));
  }

  function selectPreviousTab() {
    setSelectedTabId(selectedTabId - 1);
  }

  function selectNextTab() {
    setSelectedTabId(selectedTabId + 1);
  }

  async function handleSendFormData() {

    if (isFormDataSended) {
      selectNextTab();
      return;
    }

    const response = await fetch(`${process.env.API}/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer: formData })
    });

    if (response.ok) {
      setFormDataSended(true);
      selectNextTab();
    }
  }

  return (
    <div className={style.formTabs}>
      <div className={style.tabs}>
        <Tab
          id={1} title='Datos del negocio'
          isSelected={selectedTabId === 1}
          isEnabled={true}
          onTabClicked={handleTabClicked} />
        <Tab
          id={2} title='Seleccionar sistema'
          isSelected={selectedTabId === 2}
          isEnabled={isFormDataValid}
          onTabClicked={handleTabClicked} />
        <Tab
          id={3} title='Confirmar información'
          isSelected={selectedTabId === 3}
          isEnabled={isFormDataValid && isSystemValid}
          onTabClicked={handleTabClicked} />
        <Tab
          id={4} title='Instalar sistema'
          isSelected={selectedTabId === 4}
          isEnabled={isFormDataValid && isSystemValid}
          onTabClicked={handleTabClicked} />
      </div>
      <div className={style.content}>
        <Switch caseId={selectedTabId}>
          <Case caseId={1}>
            <Form
              formData={formData}
              onUpdateFormData={handleUpdateFormData}
              onNextButtonClick={selectNextTab} />
          </Case>
          <Case caseId={2}>
            <SystemOptions
              system={formData.system}
              onSystemChange={handleSystemChange}
              onPreviousButtonClick={selectPreviousTab}
              onNextButtonClick={selectNextTab} />
          </Case>
          <Case caseId={3}>
            <Summary
              formData={formData}
              isFormDataSended={isFormDataSended}
              onPreviousButtonClick={selectPreviousTab}
              onNextButtonClick={handleSendFormData} />
          </Case>
          <Case caseId={4}>
            <InstallSystem
              system={formData.system}
              onPreviousButtonClick={selectPreviousTab}
              onNextButtonClick={onFormFinished} />
          </Case>
        </Switch>
      </div>
    </div>
  );
}
