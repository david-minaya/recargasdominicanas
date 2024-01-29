import React from 'react';
import { useState } from 'react';
import { System } from '../../constants';
import { NavigationButtons } from '../navigation-buttons';
import { InstallSystemSection } from '../install-system-section';
import { Switch } from '../switch';
import { Case } from '../case';
import { style } from './install-system.module.css';

interface Props {
  system: string;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
}

export function InstallSystem(props: Props) {

  const {
    system,
    onPreviousButtonClick,
    onNextButtonClick
  } = props;

  const [enableNextButton, setEnableNextButton] = useState(false);

  const downloadCode = React.useMemo(() => {
    const date = new Date();
    const day = formatNumber(date.getDate());
    const month = date.getMonth() + 1;
    const formatedMonth = formatNumber(month);
    return `41${day}${formatedMonth}${day + month}`;
  }, []);

  function formatNumber(number) {
    return number < 10 ? `0${number}` : number;
  }

  function handleScrollEnd() {
    setEnableNextButton(true);
  }

  return (
    <div className={style.installSystem}>
      <Switch caseId={system}>
        <Case caseId={System.APP}>
          <InstallSystemSection
            style={style.installSystemSectionApp}
            title='Instrucciones de instalación'
            image='images/disashop-app.jpg'
            url='https://play.google.com/store/apps/details?id=com.disashop.application.do'
            buttonText='Instalar'
            onScrollEnd={handleScrollEnd}
            description={[
              'Después de instalar la aplicación, <b>regrese</b> a esta página para <b>continuar</b> con la activación.',
              'Si tiene problemas instalando la aplicación, póngase en contacto con nosotros por WhatsApp o correo electrónico.'
            ]} />
        </Case>
        <Case caseId={System.DESKTOP}>
          <InstallSystemSection
            style={style.installSystemSectionPC}
            title='Instrucciones de instalación'
            image='images/disashop-pc.png'
            url='https://soporte.disashop.com/es_ES/Autenticar'
            buttonText='Descargar'
            onScrollEnd={handleScrollEnd}
            description={[
              `Utilice el siguiente código para descarga el programa <b>${downloadCode}</b>.`,
              'Después de instalar el programa, <b>regrese</b> a esta página para <b>continuar</b> con la activación.',
              'Si tiene problemas instalando el programa, póngase en contacto con nosotros por WhatsApp o correo electrónico.'
            ]} />
        </Case>
      </Switch>
      <NavigationButtons
        previousButton={{
          name: 'Anterior',
          onClick: onPreviousButtonClick
        }}
        nextButton={{
          name: 'Continuar',
          disabled: !enableNextButton,
          onClick: onNextButtonClick,
        }} />
    </div>
  );
}
