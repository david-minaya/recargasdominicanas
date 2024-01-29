import React from 'react';
import { useState } from 'react';
import { LinearProgress } from '@rmwc/linear-progress';
import { IFormData } from '../../types';
import { TextItem } from '../text-item';
import { NavigationButtons } from '../navigation-buttons';
import { style } from './summary.module.css';

interface Props {
  formData: IFormData;
  isFormDataSended: boolean;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
}

export function Summary(props: Props) {

  const {
    formData,
    isFormDataSended,
    onPreviousButtonClick,
    onNextButtonClick
  } = props;

  const [showProgressBar, setShowProgressBar] = useState(false);
  const [disableNavigationButtons, setDisableNavigationButtons] = useState(false);

  const nextButtonName = isFormDataSended 
    ? 'Siguiente' 
    : disableNavigationButtons ? 'Enviando...' : 'Enviar';

  function handleNextButtonClick() {
    setShowProgressBar(true);
    setDisableNavigationButtons(true);
    onNextButtonClick();
  }

  return (
    <div className={style.summary}>
      <div className={style.textItems}>
        <div className={style.column}>
          <TextItem label='Nombre' text={formData.name} />
          <TextItem label='RNC / Cédula' text={formData.id} />
          <TextItem label='Teléfono' text={formData.phone} />
          <TextItem label='Email' text={formData.email} />
        </div>
        <div className={style.column}>
          <TextItem label='Nombre del negocio' text={formData.businessName} />
          <TextItem label='Sistema' text={formData.system} />
          <TextItem label='Ciudad' text={formData.city} />
          <TextItem label='Dirección' text={formData.address} />
        </div>
      </div>
      <NavigationButtons
        style={style.navigationButtons}
        previousButton={{
          name: 'Anterior', 
          disabled: disableNavigationButtons, 
          onClick: onPreviousButtonClick
        }}
        nextButton={{
          name: nextButtonName, 
          disabled: disableNavigationButtons, 
          onClick: handleNextButtonClick
        }}/>
      <LinearProgress 
        className={ 
          showProgressBar 
            ? style.progressBar
            : style.progressBarHidden
        }/>
    </div>
  );
}
