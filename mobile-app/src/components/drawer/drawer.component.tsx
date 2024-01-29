import React from 'react';
import { formatId } from '@recargas-dominicanas/core/utils';
import { useBusiness, useBusinessUsers } from '@recargas-dominicanas/core/store';
import { style } from './drawer.module.css';

import { 
  Drawer as BaseDrawer,
  DrawerHeader,
  DrawerItem
} from '@recargas-dominicanas/core/components';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Drawer(props: Props) {

  const {
    open,
    onClose
  } = props;

  const Business = useBusiness();
  const BusinessUsers = useBusinessUsers();
  const business = Business.get();
  const businessUser = BusinessUsers.get();

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}>
      <DrawerHeader className={style.drawerHeader}>
        <div className={style.businessName}>{business.name}</div>
        <div className={style.businessUserName}>{businessUser.name}</div>
        <div className={style.businessId}>{formatId(business.id)}</div>
      </DrawerHeader>
      <DrawerItem 
        icon='storefront' 
        title='Recargas' 
        route='/'
        state={{ animate: false }}
        align='top'/>
      <DrawerItem 
        icon='history' 
        title='Transacciones' 
        route='/transactions'
        state={{ animate: false }}
        align='top'/>
      <DrawerItem 
        icon='settings' 
        title='Configuración' 
        route='/settings' 
        align='bottom'/>
    </BaseDrawer>
  );
}
