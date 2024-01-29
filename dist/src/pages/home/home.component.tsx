import React from 'react';
import { FloatButton } from '@recargas-dominicanas/core/components';
import { useAsyncEffect } from '@recargas-dominicanas/core/utils';
import { BusinessItem } from '../../components/business-item/business-item.component';
import { Header } from '../../components/header/header.component';
import { style } from './home.module.css';
import { useHistory } from 'react-router-dom';
import { getBusiness, useFetchBusiness } from '../../store/business.slice';

interface Props {
  onOpenDrawer: () => void;
}

export function Home(props: Props) {

  const { onOpenDrawer } = props;
  
  const history = useHistory();
  const business = getBusiness();
  const fetchBusiness = useFetchBusiness();

  useAsyncEffect(async () => {
    await fetchBusiness();
  });

  return (
    <div className={style.container}>
      <Header onClick={onOpenDrawer}/>
      <div className={style.businessItems}>
        {business?.map(business =>
          <BusinessItem
            key={business.id} 
            business={business}/> 
        )}
      </div>
      <FloatButton 
        icon='add_business'
        onClick={() => history.push('/add-business')}/>
    </div>
  );
}
