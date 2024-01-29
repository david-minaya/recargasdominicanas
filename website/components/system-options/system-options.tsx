import React from 'react';
import { System } from '../../constants';
import { NavigationButtons } from '../navigation-buttons';
import { SystemOption } from '../system-option';
import { style } from './system-options.module.css';

interface Props {
  system: string;
  onSystemChange: (partialFormData: any) => void;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
}

export function SystemOptions(props: Props) {

  const { 
    system, 
    onSystemChange, 
    onPreviousButtonClick, 
    onNextButtonClick 
  } = props;

  function onClickOption(tag: string, system: string) {
    onSystemChange(system);
  }

  return (
    <div className={style.systemOptions}>
      <div className={style.options}>
        <SystemOption
          image='images/disashop-pc.png'
          text={System.DESKTOP}
          isSelected={system === System.DESKTOP}
          onClick={onClickOption}
          style={style.systemOptionDesktop}/> 
        <SystemOption
          image='images/disashop-app.jpg'
          text={System.APP}
          isSelected={system === System.APP}
          onClick={onClickOption}
          style={style.systemOptionApp}/> 
      </div>
      <NavigationButtons
        previousButton={{
          name: 'Anterior',
          onClick: onPreviousButtonClick
        }}
        nextButton={{
          name: 'Siguiente', 
          disabled: !system, 
          onClick: onNextButtonClick
        }}/>
    </div>
  );
}
