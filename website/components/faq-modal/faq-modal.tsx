import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { TextField } from '../text-field';
import { MultilineTextField } from '../multiline-text-field';
import { Button } from '../button';
import { useFocusNextInput } from '../../hooks';
import { IQuestion } from '../../types';
import { regexps } from '../../constants';
import { isValidQuestion } from '../../validations';
import { style } from './faq-modal.module.css';

interface props {
  isOpen?: boolean;
  onClose?: () => void;
  onQuestionSent: (isSent: boolean) => void;
}

export function FaqModal({ isOpen = true, onClose, onQuestionSent }: props) {

  const cardElement = React.useRef<HTMLDivElement>();
  const handleFocusNextInput = useFocusNextInput(cardElement);
  const defaultData: IQuestion = { name: '', contact: '', question: '' };
  const [question, setQuestion] = React.useState(defaultData);
  const [showInvalidField, setShowInvalidField] = React.useState(false);

  function handleTextFieldChange(name: string, value: string) {
    setQuestion(question => ({ ...question, [name]: value }));
  }

  async function handleSendQuestion() {

    if (isValidQuestion(question)) {
    
      onClose();

      try {

        const response = await fetch(`${process.env.API}/question`, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
  
        onQuestionSent(response.ok);

      } catch (err) {

        onQuestionSent(false);
      }

    } else {
    
      setShowInvalidField(true);
    }
  }

  function reset() {
    setQuestion(defaultData);
    setShowInvalidField(false);
  }

  return (
    <CSSTransition 
      in={isOpen}
      timeout={200} 
      unmountOnExit
      onExited={reset}>
      <div className={style.faqModal} onClick={onClose}>
        <CSSTransition
          appear 
          in={isOpen}
          timeout={200}
          unmountOnExit
          classNames={style.animation}>
          <div 
            className={style.card} 
            ref={cardElement}
            onClick={e => e.stopPropagation()}>
            <h3 className={style.title}>Haganos una pregunta</h3>
            <TextField 
              style={style.textField} 
              label='Nombre'
              name='name'
              value={question.name}
              showIfIsInvalid={showInvalidField}
              onChange={handleTextFieldChange}
              onEnter={handleFocusNextInput}/>
            <TextField 
              style={style.textField} 
              label='Email / WhatsApp'
              name='contact'
              value={question.contact}
              validation={regexps.contact}
              errorMessage='Ingrese un email o número de WhatsApp válido'
              showIfIsInvalid={showInvalidField}
              onChange={handleTextFieldChange}
              onEnter={handleFocusNextInput}/>
            <MultilineTextField 
              style={style.textField} 
              label='Pregunta'
              name='question'
              value={question.question}
              showIfIsInvalid={showInvalidField}
              onChange={handleTextFieldChange}/>
            <div className={style.buttons}>
              <Button 
                style={style.cancelButton} 
                text='Cancelar'
                onClick={onClose}/>
              <Button 
                style={style.sendButton} 
                text='Enviar'
                onClick={handleSendQuestion}/>
            </div>
          </div>
        </CSSTransition>
      </div>
    </CSSTransition>
  );
}
