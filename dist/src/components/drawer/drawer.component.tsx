import React from 'react';
import { getAdmin } from '../../store/admin.slice';
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

  const admin = getAdmin();

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}>
      <DrawerHeader className={style.drawerHeader}>
        <img className={style.drawerImage} src='recargas-dominicanas-32x32.svg'/>
        <div className={style.drawerTitle}>Recargas Dominicanas</div>
        <div className={style.drawerName}>{admin.name}</div>
      </DrawerHeader>
      <DrawerItem 
        icon='groups' 
        title='Clientes' 
        route='/'
        align='top'/>
      <DrawerItem 
        icon='account_balance' 
        title='Depositos' 
        route='/deposits'
        align='top'/>
    </BaseDrawer>
  );
}
