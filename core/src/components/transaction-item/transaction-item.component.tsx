import React, { useRef, useState } from 'react';
import { ITransaction } from '../../types';
import { Text } from '../text/text.component';
import { Icon } from '../icon/icon.component';
import { Menu } from '../menu/menu.component';
import { Image } from '../image/image.component';
import { Option } from '../option/option.component';
import { Style, mergeStyle } from './transaction-item.module.css';
import { formatCurrency, formatTime } from '../../utils';

interface Props {
  style?: Style,
  transaction: ITransaction,
  showMenu?: boolean;
  onClick: () => void,
  onCancel?: () => void
}

export function TransactionItem(props: Props) {

  const {
    transaction,
    style: customStyle,
    showMenu = true,
    onClick,
    onCancel
  } = props;

  const style = mergeStyle(customStyle);
  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  function expired() {
    const date = new Date(transaction.date);
    const expirationDate = date.getTime() + (1000 * 60 * 5);
    return Date.now() > expirationDate;
  }

  function showCancelOption() {
    return (
      transaction.product.type === 'Recarga' &&
      !transaction.cancelled && 
      !expired()
    );
  }

  return (
    <div 
      className={style.container}
      onClick={() => onClick()}>
      <Image className={style.image} src={transaction.product.image}/>
      <div className={style.background}/>
      <div className={style.info}>
        <div className={style.topRow}>
          {(transaction.product.type === 'Recarga' || transaction.product.type === 'Paquetico') &&
            <Text className={style.phone} text={transaction.phone}/>
          }
          {transaction.product.type === 'Pin' &&
            <Text className={style.phone} text='* * * * * * * * *'/>
          }
          {transaction.product.type === 'Factura' &&
            <Text className={style.phone} text={transaction.contract?.nic}/>
          }
          <Text className={style.amount} text={formatCurrency(transaction.amount)}/>
          {showMenu &&
            <div className={style.iconSpace}>
              <Icon 
                className={style.icon} 
                iconRef={iconRef} 
                icon='more_horiz'
                autofocus={true}
                onBlur={() => setOpenMenu(false)}
                onClick={e => { 
                  setOpenMenu(state => !state);
                  e?.stopPropagation(); 
                }}/>
            </div>
          }
        </div>
        <div className={style.bottomRow}>
          <Text className={style.type} text={transaction.product.type}/>
          <Text className={style.time} text={formatTime(transaction.date)}/>
          {transaction.cancelled && 
            <div className={style.cancelled}>
              Cancelada
            </div>
          }
        </div>
      </div>
      <Menu 
        open={openMenu}
        anchor={iconRef}
        style={style.menu}
        autofocus={false}
        right={12}
        onClose={() => setOpenMenu(false)}>
        <Option 
          icon='receipt' 
          text='Reimprimir recibo'/>
        {showCancelOption() &&
          <Option 
            icon='cancel' 
            text='Cancelar recarga'
            onClick={() => onCancel?.()}/>
        }
      </Menu>
    </div>
  );
}
