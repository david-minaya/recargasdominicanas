import React, { Fragment, useState } from 'react';
import { formatDate } from '@recargas-dominicanas/core/utils';
import { IAppRelease, IReleaseNote } from '@recargas-dominicanas/core/types';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { AppReleaseModal } from '../app-release-modal/app-release-modal.component';
import { AppReleaseApi } from '@recargas-dominicanas/core/api';
import { AppReleaseStore } from '../../../store/appReleaseStore';
import { style } from './app-release-item.module.css';

interface Props {
  appRelease: IAppRelease;
}

export function AppReleaseItem(props: Props) {

  const { appRelease } = props;
  const [openModal, setOpenModal] = useState(false);

  function handleClick() {
    setOpenModal(true);
  }

  async function handleSave(version: string, app: File, releaseNotes: Partial<IReleaseNote>[]) {
    await AppReleaseApi.update(appRelease.id, version, releaseNotes, app);
    await AppReleaseStore.fetchAll();
  }

  return (
    <Fragment>
      <TableRow
        onClick={handleClick}>
        <Cell weight='medium' text={appRelease.version}/>
        <Cell text={formatDate(appRelease.date)}/>
        <Cell 
          className={style.releaseNotes} 
          text={appRelease.releaseNotes.map(note => note.title).join(', ')}/>
        {appRelease.published
          ? <Cell weight='medium' color='green' text='Publicado'/>
          : <Cell weight='medium' color='gray' text='Guardado'/>
        }
      </TableRow>
      <AppReleaseModal
        open={openModal}
        appRelease={appRelease}
        onSave={handleSave}
        onClose={() => setOpenModal(false)}/>
    </Fragment>
  );
}
