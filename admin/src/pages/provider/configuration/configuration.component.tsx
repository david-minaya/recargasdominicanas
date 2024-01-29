import React, { Fragment, useEffect, useState } from 'react';
import { Button, Icon, OutlineButton, TextField } from '@recargas-dominicanas/core/components';
import { validators } from '@recargas-dominicanas/core/utils';
import { IProviderConfig } from '@recargas-dominicanas/core/types';
import { ProviderApi } from '@recargas-dominicanas/core/api';
import { ConfirmModal } from '../../../components/confirm-modal/confirm-modal.component';
import { ProviderStore } from '../../../store/providerStore';
import { style } from './configuration.module.css';

interface ConfigField {
  id?: number;
  name: string;
  value: string;
  updated: boolean;
}

interface Props {
  providerId: number;
}

export function Configuration(props: Props) {

  const { providerId } = props;

  const configs = ProviderStore.getConfigs(providerId) || [];
  const [configField, setConfigField] = useState<ConfigField>();
  const [configFields, setConfigFields] = useState<ConfigField[]>([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  useEffect(() => {
    setConfigFields(mapConfigs());
  }, [configs]);

  function handleAddConfigField() {
    setConfigFields(state => [...state, { name: '', value: '', updated: false }]);
  }

  function handleUpdateField(index: number, key: string, value: any) {

    setConfigFields(state => {

      const field = state[index];
      const config = configs.find(config => config.id === field.id);

      if (key === 'name') field.name = value;
      if (key === 'value') field.value = value;

      if (config) {
        field.updated = config?.[key as keyof IProviderConfig] !== value;
      }

      return [...state];
    });
  }

  function handleDelete(index: number, configField: ConfigField) {

    if (configField.id) {

      setConfigField(configField);
      setOpenConfirmModal(true);

    } else {

      setConfigFields(state => state.filter((_, i) => i !== index));
    }
  }

  async function handleConfirmDelete(configField: ConfigField) {
    await ProviderApi.deleteConfig(configField.id!);
    await ProviderStore.fetchConfigs(providerId);
  }

  async function handleSave() {

    const isValid = configFields.every(config => 
      config.name?.trim() !== '' && 
      config.value?.trim() !== ''
    );

    if (!isValid) return;

    const newConfigs = configFields.filter(config => !config.id);
    const updatedConfigs = configFields.filter(config => config.updated);

    const newConfigsPromises = newConfigs.map(config => 
      ProviderApi.addConfig(providerId, config.name!, config.value!)
    );

    const updatedConfigsPromises = updatedConfigs.map(config => 
      ProviderApi.updateConfig(config.id!, config.name!, config.value!)
    );

    await Promise.all([
      ...newConfigsPromises,
      ...updatedConfigsPromises
    ]);

    await ProviderStore.fetchConfigs(providerId);
  }

  async function handleCancel() {
    setConfigFields(mapConfigs());
  }

  function mapConfigs() {

    if (!configs.length) {
      return [{ name: '', value: '', updated: false }];
    }

    return configs.map(({ id, name, value }) => ( 
      { id, name, value, updated: false }
    ));
  }

  function compare() {
    return (
      configFields.length > configs.length ||
      configFields.some(config => config.updated)
    );
  }

  return (
    <Fragment>
      <div className={style.container}>
        <OutlineButton
          style={style.addButton} 
          text='Agregar'
          onClick={handleAddConfigField}/>
        <div className={style.configurations}>
          {configFields?.map((configField, index) => (
            <div
              key={index}
              className={style.configuration}>
              <TextField 
                style={style.textField} 
                placeholder='Nombre'
                value={configField.name}
                autofocus={!configField.id}
                validators={[validators.required]}
                onChange={value => handleUpdateField(index, 'name', value)}/>
              <TextField 
                style={style.textField} 
                placeholder='Valor'
                value={configField.value}
                autofocus={!configField.id}
                validators={[validators.required]}
                onChange={value => handleUpdateField(index, 'value', value)}/>
              <Icon 
                className={style.icon} 
                icon='delete'
                onClick={() => handleDelete(index, configField)}/>
            </div>
          ))}
        </div>
        <div className={style.actionButtons}>
          <Button
            style={style.actionButton}
            text='Cancelar'
            disabled={!compare()}
            onClick={handleCancel}/>
          <OutlineButton 
            style={style.actionButton}
            text='Guardar'
            disabled={!compare()}
            onClick={handleSave}/>
        </div>
      </div>
      {configField && 
        <ConfirmModal
          title='Borrar configuracion'
          description='Borrar configuracion'
          open={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={() => handleConfirmDelete(configField)}>
          <div className={style.configItem}>
            <div className={style.configItemName}>{configField.name}</div>
            <div className={style.configItemValue}>{configField.value}</div>
          </div>
        </ConfirmModal>
      }
    </Fragment>
  );
}
