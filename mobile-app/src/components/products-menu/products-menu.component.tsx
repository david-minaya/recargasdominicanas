import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { FloatButton } from '@recargas-dominicanas/core/components';
import { ProductTypeItem } from '../product-menu-item/product-menu-item.component';
import { style } from './products-menu.module.css';

interface Props {
  onClick: (tag: string) => void;
}

export function ProductsMenu(props: Props) {

  const { onClick } = props;

  const popupRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(open => !open);
  }

  function handleClick(id: string) {
    onClick(id);
    setOpen(false);
  }

  return (
    <div className={style.container}>
      <FloatButton 
        style={style.floatButton}
        icon='grid_view'
        iconVariant='round'
        onClick={handleOpen}/>
      {open &&
        <div 
          className={style.overlay}
          onClick={() => setOpen(false)}/>
      }
      <CSSTransition
        in={open}
        unmountOnExit={true}
        nodeRef={popupRef}
        classNames={style.popupAnimation}
        timeout={170}>
        <div
          ref={popupRef} 
          className={style.popup}>
          <ProductTypeItem 
            id='topups'
            icon='smartphone' 
            title='Recargas'
            onClick={handleClick}/>
          <ProductTypeItem 
            id='data-plans'
            icon='language' 
            title='Paqueticos'
            onClick={handleClick}/>
          <ProductTypeItem
            id='pins'
            icon='receipt' 
            title='Pines'
            onClick={handleClick}/>
          <ProductTypeItem
            id='invoices'
            icon='description' 
            title='Facturas'
            onClick={handleClick}/>
        </div>
      </CSSTransition>
    </div>
  );
}
