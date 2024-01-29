import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import { IAppRelease } from '@recargas-dominicanas/core/types';
import { formatDate, useForm, validators } from '@recargas-dominicanas/core/utils';
import { IReleaseNote } from '@recargas-dominicanas/core/types';
import { FileField } from '../../../components/file-field/file-field.component';
import { ReleaseNoteField } from '../release-note-field/release-note-field.component';
import { ReleaseNoteItem } from '../release-note-item/release-note-item.component';
import { AppReleaseApi } from '@recargas-dominicanas/core/api';
import { AppReleaseStore } from '../../../store/appReleaseStore';
import { style } from './app-release-modal.module.css';

import {
  Button,
  Error,
  FieldError,
  IndeterminateProgressBar,
  Modal, 
  ModalActions, 
  ModalContent, 
  ModalToolbar, 
  OutlineButton,
  Text, 
  TextField 
} from '@recargas-dominicanas/core/components';

interface Form {
  version: string,
  app?: File
}

interface Props { 
  open: boolean;
  error?: string;
  appRelease?: IAppRelease;
  onSave: (version: string, app: File, releaseNotes: Partial<IReleaseNote>[]) => Promise<void>;
  onClose: () => void;
}

export function AppReleaseModal(props: Props) {

  const {
    open = false,
    appRelease,
    onSave,
    onClose
  } = props;

  const [releaseNotes, setReleaseNotes] = useState<Partial<IReleaseNote>[]>([]);
  const [showReleaseNoteField, setShowReleaseNoteField] = useState(true);
  const [showAddButton, setShowAddButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [showReleaseNotesError, setShowReleaseNoteError] = useState(false);

  const form = useForm<Form>({
    version: appRelease?.version || '',
    app: undefined
  });

  useEffect(() => {

    if (!open) return;

    if (appRelease?.releaseNotes) {
      setReleaseNotes(appRelease.releaseNotes);
      setShowReleaseNoteField(false);
      setShowAddButton(true);
    }

    if (appRelease?.published) {
      setShowAddButton(false);
    }

  }, [open, appRelease]);

  function handleClose() {

    if (loading) return;

    form.clear();
    setLoading(false);
    setShowAddButton(false);
    setShowReleaseNoteField(true);
    setReleaseNotes(appRelease?.releaseNotes || []);
    setErrorMessage(undefined);
    setShowReleaseNoteError(false);
    onClose();
  }

  async function handleSave() {

    if (!form.isValid()) {
      return;
    }

    if (releaseNotes.length === 0) {
      setShowReleaseNoteError(true);
      return;
    }

    try {

      setErrorMessage(undefined);
      setLoading(true);
      setShowReleaseNoteField(false);
      setShowAddButton(false);

      await onSave(form.value.version, form.value.app!, releaseNotes);
      
      setLoading(false);
      handleClose();

    } catch (err: any) {

      setLoading(false);
      setShowReleaseNoteField(false);
      setShowAddButton(true);

      if (err.response.data === 'VERSION_ALREADY_EXISTS_ERROR') {
        setErrorMessage('Ya existe una aplicación con esta versión');
      } else if (err.response.data === 'SMALLER_VERSION_ERROR') {
        setErrorMessage('La versión no puede ser menor a la versión actual');
      } else {
        setErrorMessage('Ocurrio un error');
      }
    }
  }

  async function handlePublish() {

    try {
    
      setLoading(true);

      await AppReleaseApi.publish(appRelease!.id);
      await AppReleaseStore.fetchAll();

      setLoading(false);
      handleClose();

    } catch (err: any) {

      setLoading(false);
      setErrorMessage('Ocurrio un error al publicar la aplicacion');
    }
  }

  function handleAddReleaseNote(title: string, description: string) {
    setShowReleaseNoteError(false);
    setReleaseNotes(releaseNotes => [...releaseNotes, { title, description }]);
    setShowReleaseNoteField(false);
    setShowAddButton(true);
  }

  function handleEditReleaseNote(index: number, title: string, description: string) {

    setReleaseNotes(releaseNotes => 
      releaseNotes.map((releaseNote, i) =>
        i === index 
          ? { ...releaseNote, title, description } 
          : releaseNote
      )
    );

    setShowReleaseNoteField(false);
    setShowAddButton(true);
  }

  function handleDeleteReleaseNote(index: number) {
    setReleaseNotes(releaseNotes => releaseNotes.filter((_, i) => i !== index));
  }

  function handleShowReleaseNoteField() {
    setShowReleaseNoteField(true);
    setShowAddButton(false);
  }

  function handleHideReleseNoteField() {
    setShowReleaseNoteField(false);
    setShowAddButton(false);
  }

  function handleCancelReleaseNoteField() {
    if (releaseNotes.length > 0) {
      setShowReleaseNoteField(false);
      setShowAddButton(true);
    }
  }

  return (
    <Modal
      open={open}
      style={style.modal}
      onClose={handleClose}>
      <ModalToolbar 
        title='Lanzamiento'
        onClose={handleClose}/>
      <ModalContent className={style.modalContent}>
        <div className={style.fieldsContent}>
          <TextField 
            style={style.textField}
            label='Version'
            placeholder='Ej: 1.7.3'
            formField={form.fields.version} 
            validators={[
              validators.required,
              validators.regex(/\d\.\d\.\d/)
            ]}/>
          <FileField
            className={style.textField}
            placeholder='Subir APK'
            filename={appRelease?.filename}
            field={form.fields.app}
            required={appRelease === undefined}/>
        </div>
        <Text 
          className={style.title} 
          text='Notas de la versión'/>
        <div className={style.releaseNotes}>
          {releaseNotes.map((releaseNote, index) => 
            <ReleaseNoteItem
              key={index}
              index={index}
              releaseNote={releaseNote}
              showMenuOption={!appRelease || appRelease.published === false}
              onEdit={handleHideReleseNoteField}
              onCancelEdit={() => setShowAddButton(true)}
              onSave={handleEditReleaseNote}
              onDelete={handleDeleteReleaseNote}/>
          )}
          {showReleaseNoteField &&
            <Fragment>
              <ReleaseNoteField 
                onSave={handleAddReleaseNote}
                onCancel={handleCancelReleaseNoteField}/>
              {showReleaseNotesError &&
                <FieldError message='Las notas de la version son requeridas'/>
              }
            </Fragment>
          }
          {showAddButton &&
            <Button
              style={style.addButton}
              text='Agregar'
              onClick={handleShowReleaseNoteField}/>
          }
        </div>
        <div 
          className={clsx(style.info, appRelease?.published && style.paddingBottom)}>
          {appRelease?.date && 
            <div>
              <span>Fecha: </span>
              <span className={style.date}>{formatDate(appRelease.date)}</span>
            </div>
          }
          {appRelease?.published && 
            <div className={style.published}>Publicado</div>
          }
        </div>
      </ModalContent>
      <Error 
        style={style.error} 
        message={errorMessage}/>
      <IndeterminateProgressBar
        show={loading}
        className={style.indeterminateProgressBar}/>
      {!appRelease?.published &&
        <ModalActions style={style.modalActions}>
          {appRelease !== undefined &&
            <OutlineButton 
              text='Publicar'
              disabled={appRelease === undefined || loading}
              onClick={handlePublish}/>
          }
          <OutlineButton 
            text='Guardar'
            disabled={loading}
            onClick={handleSave}/>
        </ModalActions>
      }
    </Modal>
  );
}
