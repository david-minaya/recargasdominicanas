import React, { useState } from 'react';
import { OutlineButton } from '@recargas-dominicanas/core/components';
import { IBusinessUser } from '@recargas-dominicanas/core/types';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { AddBusinessUser } from '../add-business-user/add-business-user.component';
import { BusinessUserModal } from '../business-user-modal/business-user-modal.componet';
import { BusinessUserItem } from '../business-user-item/business-user-item.component';
import { BusinessStore } from '../../store/businessStore';
import { style } from './business-users.module.css';

interface Props {
  businessId: number;
}

export function BusinessUsers(props: Props) {

  const {
    businessId
  } = props;

  const businessUsers = BusinessStore.getBusinessUsers(businessId);
  const [businessUser, setBusinessUser] = useState<IBusinessUser>();
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);

  async function handleAddedUser(businessUser: IBusinessUser) {
    setBusinessUser(businessUser);
    setOpenUserModal(true);  
  }

  return (
    <div className={style.container}>
      <Table style={style.table}>
        <TableHeader style={style.tableHeader}>
          <span>Nombre</span>
          <span>Usuario</span>
          <span>Estado</span>
          <OutlineButton 
            style={style.addUser} 
            text='Agregar usuario'
            onClick={() => setOpenAddUserModal(true)}/>
        </TableHeader>
        <tbody>
          {
            businessUsers?.map(businessUser => (
              <BusinessUserItem
                key={businessUser.id}
                businessId={businessId}
                businessUser={businessUser}/>
            ))
          }
        </tbody>
      </Table>
      <AddBusinessUser 
        open={openAddUserModal}
        businessId={businessId}
        onSaved={handleAddedUser}
        onClose={() => setOpenAddUserModal(false)}/>
      <BusinessUserModal
        open={openUserModal}
        title='Usuario agregado'
        businessUser={businessUser!}
        onClose={() => setOpenUserModal(false)}/>
    </div>
  );
}
