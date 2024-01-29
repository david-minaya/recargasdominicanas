import React from 'react';
import { formatCurrency } from '@recargas-dominicanas/core/utils';
import { useHistory } from 'react-router';
import { IBusiness } from '@recargas-dominicanas/core/types';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';

interface Props {
  business: IBusiness;
}

export function BusinessItem(props: Props) {

  const {
    business
  } = props;

  const history = useHistory();

  function handleClick() {
    history.push(`/customer/${business.id}`);
  }

  return (
    <TableRow
      onClick={handleClick}>
      <Cell weight='medium' text={business.id}/>
      <Cell weight='medium' text={business.name}/>
      <Cell text={business.customer?.name}/>
      <Cell text={business.city}/>
      <Cell weight='medium' color='green' text={formatCurrency(business.balance)}/>
      <Cell weight='medium' color='green' text={formatCurrency(business.sales)}/>
      <Cell weight='medium' color='green' text={formatCurrency(business.profit)}/>
    </TableRow>
  );
}
