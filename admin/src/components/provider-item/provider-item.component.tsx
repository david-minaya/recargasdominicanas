import React, { Fragment, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { ProviderApi } from '@recargas-dominicanas/core/api';
import { IProvider } from '@recargas-dominicanas/core/types';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { TableRow, Cell, CellIcon, Menu, BaseCell } from '@recargas-dominicanas/core/components';
import { ProviderStore } from '../../store/providerStore';
import { MenuOption } from '../menu-option/menu-option.component';
import { style } from './provider-item.module.css';

interface Props {
  provider: IProvider;
}

export function ProviderItem(props: Props) {

  const { provider } = props;

  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  async function handleUpdate() {
    await ProviderApi.update(provider.id, !provider.enabled);
    await ProviderStore.fetchById(provider.id);
  }

  return (
    <Fragment>
      <TableRow 
        key={provider.id}
        onClick={() => history.push(`/provider/${provider.id}`)}>
        <BaseCell>
          <img 
            className={style.image} 
            src={`${process.env.API}/static/${provider.image}`}/>
        </BaseCell>
        <Cell weight='medium' text={provider.name}/>
        <Cell weight='medium' color='green' text={formatCurrency(provider.balance)}/>
        <Cell weight='medium' color='green' text={formatCurrency(provider.sales)}/>
        <Cell weight='medium' color='green' text={formatCurrency(provider.profit)}/>
        {provider.enabled 
          ? <Cell weight='medium' color='green' text='Activado'/>
          : <Cell weight='medium' color='gray' text='Desactivado'/>
        }
        <CellIcon 
          refIcon={ref}
          onClick={() => setOpenMenu(state => !state)}
          onBlur={() => setOpenMenu(false)}/>
      </TableRow>
      <Menu
        open={openMenu} 
        anchor={ref}
        autofocus={false}
        onClose={() => setOpenMenu(false)}>
        <MenuOption 
          text={provider.enabled ? 'Desactivar' : 'Activar'} 
          onClick={handleUpdate}/>
      </Menu>
    </Fragment>
  );
}
