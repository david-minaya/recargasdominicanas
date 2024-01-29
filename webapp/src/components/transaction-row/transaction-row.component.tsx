import React, { Fragment, useRef, useState } from 'react';
import { ITransaction } from '@recargas-dominicanas/core/types';
import { formatTime, formatCurrency, expired } from '@recargas-dominicanas/core/utils';

import { 
  TableRow, 
  CellImage, 
  Cell, 
  CellIcon, 
  Menu,
  Option
} from '@recargas-dominicanas/core/components';

interface Props {
  transaction: ITransaction;
  onClick: () => void;
  onPrint: () => void;
  onCancel?: () => void;
}

export function TransactionRow(props: Props) {

  const {
    transaction,
    onClick,
    onPrint,
    onCancel
  } = props;

  const [openMenu, setOpenMenu] = useState(false);
  const anchor = useRef<HTMLDivElement>(null);

  function showCancelOption() {
    return (
      (transaction.product.type === 'Recarga' || transaction.product.type === 'Factura') &&
      !transaction.cancelled && 
      !expired(transaction)
    );
  }

  return (
    <Fragment>
      <TableRow 
        key={transaction.id}
        onClick={onClick}>
        <CellImage src={transaction.product.image}/>
        {(transaction.product.type === 'Recarga' || transaction.product.type === 'Paquetico') &&
          <Cell text={transaction.phone}/>
        }
        {transaction.product.type === 'Pin' &&
          <Cell text='* * * * * * * *'/>
        }
        {transaction.product.type === 'Factura' &&
          <Cell text={transaction.contract?.nic}/>
        }
        <Cell text={transaction.product.type}/>
        <Cell text={formatTime(transaction.date)}/>
        <Cell weight='medium' color='green' text={formatCurrency(transaction.amount)}/>
        {transaction.cancelled
          ? <Cell text='Cancelada' weight='medium' color='red'/>
          : <Cell text='Realizada' weight='medium' color='gray'/>
        }
        <CellIcon 
          icon='more_horiz'
          refIcon={anchor}
          onClick={() => setOpenMenu(state => !state)}
          onBlur={() => setOpenMenu(false)}/>
      </TableRow>
      <Menu 
        open={openMenu}
        anchor={anchor} 
        autofocus={false}
        top={4}>
        <Option
          text='Reimprimir'
          hiddeIcon={true} 
          onClick={onPrint}/>
        {showCancelOption() &&
          <Option
            text='Cancelar'
            hiddeIcon={true}
            onClick={onCancel}/>
        }
      </Menu>
    </Fragment>
  );
}
