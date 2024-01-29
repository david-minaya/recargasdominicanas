import React, { useState } from 'react';
import { Button, FieldError, TextArea, TextField } from '@recargas-dominicanas/core/components';
import { useForm } from '@recargas-dominicanas/core/utils';
import { style } from './release-note-field.module.css';
import { IReleaseNote } from '@recargas-dominicanas/core/types';

interface Props {
  releaseNote?: Partial<IReleaseNote>;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

export function ReleaseNoteField(props: Props) {

  const {
    releaseNote,
    onSave,
    onCancel
  } = props;

  const [showError, setShowError] = useState(false);

  const form = useForm({ 
    title: releaseNote?.title || '', 
    description: releaseNote?.description || '' 
  });

  function handleCancel() {
    form.clear();
    setShowError(false);
    onCancel();
  }

  function handleAdd() {

    if (!validate(form.value.title) || !validate(form.value.description)) {
      setShowError(true);
      return;
    }
    
    onSave(form.value.title, form.value.description);
    form.clear();
    setShowError(false);
  }

  function validate(value?: string) {
    return value && value.trim() !== '';
  }

  return (
    <div 
      className={style.field}
      ref={e => e?.scrollIntoView({ behavior: 'smooth', block: 'end' })}>
      <TextField
        style={style.textField}
        formField={form.fields.title}
        placeholder='Titulo'
        autofocus={true}/>
      <div className={style.divider}/>
      <TextArea
        style={style.textArea}
        formField={form.fields.description}
        placeholder='Descripción'/>
      <div className={style.bottom}>
        {showError &&
          <FieldError
            className={style.error}
            message='Todos los campos son requeridos'/>
        }
        <div className={style.buttons}>
          <Button
            style={style.button}
            text='Cancelar'
            onClick={handleCancel}/>
          <Button
            style={style.button}
            text='Guardar'
            onClick={handleAdd}/>
        </div>
      </div>
    </div>
  );
}
