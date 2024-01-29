import React from 'react';
import { TextField } from '../text-field';
import { NavigationButtons } from '../navigation-buttons';
import { IFormData } from '../../types';
import { regexps } from '../../constants';
import { formValidation } from '../../validations';
import { useFocusNextInput } from '../../hooks';
import { style } from './form.module.css';

interface Props {
  formData: IFormData;
  onUpdateFormData: (partialFormData: any) => void;
  onNextButtonClick: () => void;
}

export function Form(props: Props) {

  const { 
    formData, 
    onUpdateFormData, 
    onNextButtonClick 
  } = props;

  const formElement = React.useRef<HTMLDivElement>();
  const handleFocusNextInput = useFocusNextInput(formElement);
  const isFormDataValid = formValidation(formData);
  const [showIfIsValid, setShowIfIsValid] = React.useState(false);

  React.useEffect(() => {
    if (isFormDataValid) setShowIfIsValid(false);
  }, [formData]);

  function handleTextFieldChange(name: string, value: string) {
    onUpdateFormData({ ...formData, [name]: value });
  }

  function handleNextButtonClick() {
    if (isFormDataValid)
      onNextButtonClick();
    else 
      setShowIfIsValid(true);
  }

  return (
    <div className={style.form} ref={formElement}>
      <div className={style.inputs}>
        <div className={style.column}>
          <TextField 
            label='Nombre'
            name='name' 
            value={formData.name}
            showIfIsInvalid={showIfIsValid}
            onChange={handleTextFieldChange} 
            onEnter={handleFocusNextInput}/>
          <TextField 
            label='Nombre del negocio'
            name='businessName' 
            value={formData.businessName}
            showIfIsInvalid={showIfIsValid}
            onChange={handleTextFieldChange} 
            onEnter={handleFocusNextInput}/>
          <TextField 
            label='RNC / Cédula'
            name='id' 
            value={formData.id}
            validation={regexps.id}
            errorMessage='Ingrese un número de identificación válido'
            showIfIsInvalid={showIfIsValid}
            onChange={handleTextFieldChange}
            onEnter={handleFocusNextInput}/>
          <TextField 
            label='Teléfono' 
            name='phone' 
            value={formData.phone} 
            validation={regexps.phone}
            showIfIsInvalid={showIfIsValid}
            errorMessage='Ingrese un número de teléfono válido'
            onChange={handleTextFieldChange}
            onEnter={handleFocusNextInput}/>
        </div>
        <div className={style.column}>
          <TextField 
            label='email' 
            name='email'
            value={formData.email}
            validation={regexps.email}
            errorMessage='Ingrese un correo electrónico válido'
            showIfIsInvalid={showIfIsValid} 
            onChange={handleTextFieldChange}
            onEnter={handleFocusNextInput}/>
          <TextField 
            label='Ciudad'
            name='city' 
            value={formData.city} 
            showIfIsInvalid={showIfIsValid}
            onChange={handleTextFieldChange}
            onEnter={handleFocusNextInput}/>
          <TextField 
            label='Dirección'
            name='address' 
            value={formData.address}
            showIfIsInvalid={showIfIsValid}
            onChange={handleTextFieldChange}
            onEnter={handleNextButtonClick}/>
        </div>
      </div>
      <NavigationButtons 
        previousButton={{
          hidden: true
        }}
        nextButton={{
          name: 'Siguiente', 
          onClick: handleNextButtonClick
        }}/>
    </div>
  );
}
