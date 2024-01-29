import React, { useState } from 'react';
import { Title, Text } from '@recargas-dominicanas/core/components';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { PageContainer } from '@recargas-dominicanas/core/components';
import { PageToolbar } from '@recargas-dominicanas/core/components';
import { PageContent } from '@recargas-dominicanas/core/components';
import { OutlineTable } from '@recargas-dominicanas/core/components';
import { AppReleaseStore } from '../../store/appReleaseStore';
import { AppReleaseItem } from './app-release-item/app-release-item.component';
import { AppReleaseModal } from './app-release-modal/app-release-modal.component';
import { IReleaseNote } from '@recargas-dominicanas/core/types';
import { AppReleaseApi } from '@recargas-dominicanas/core/api';
import { style } from './app-releases.module.css';
import { OptionButton } from '../../components/option-button/option-button.component';

export function AppReleases() {

  const appReleases = AppReleaseStore.getAll();

  const [openModal, setOpenModal] = useState(false);

  async function handleAddAppRelease(version: string, app: File, releaseNotes: Partial<IReleaseNote>[]) {
    await AppReleaseApi.add(version, app, releaseNotes);
    await AppReleaseStore.fetchAll();
  }

  return (
    <PageContainer className={style.container}>
      <PageToolbar className={style.toolbar}>
        <Title
          style={style.title} 
          title='Lanzamientos'/>
        <OptionButton
          icon='rocket_launch'
          title='Nuevo lanzamiento'
          onClick={() => setOpenModal(true)}/>
      </PageToolbar>
      <PageContent className={style.content}>
        <OutlineTable>
          <TableHeader style={style.tableHeader}>
            <Text text='Version'/>
            <Text text='Fecha'/>
            <Text text='Notas de la version'/>
            <Text text='Estado'/>
          </TableHeader>
          <tbody>
            {
              appReleases.map(appRelease =>
                <AppReleaseItem
                  key={appRelease.id} 
                  appRelease={appRelease}/>    
              )
            }
          </tbody>
        </OutlineTable>
      </PageContent>
      <AppReleaseModal
        open={openModal}
        onSave={handleAddAppRelease}
        onClose={() => setOpenModal(false)}/>
    </PageContainer>
  );
}
