import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { IProduct } from '@recargas-dominicanas/core/types';
import { CSSTransition } from 'react-transition-group';
import { Header } from '../../components/header/header.component';
import { useProducts, useSalesReport } from '@recargas-dominicanas/core/store';
import { SalesReportBar } from '../../components/sales-report-bar/sales-report-bar.component';
import { Products } from '../../components/products/products.component';
import { ProductsMenu } from '../../components/products-menu/products-menu.component';
import { style } from './home.module.css';

interface Props {
  onOpenDrawer: () => void;
}

export function Home(props: Props) {

  const productStore = useProducts();
  const salesReportStore = useSalesReport();
  const history = useHistory();
  const location = useLocation<{ animate?: boolean }>();
  const animate = location.state?.animate;
  const salesReport = salesReportStore.get();
  const products = productStore.get();

  const topups = products.filter(product => product.type === 'Recarga');
  const dataPlans = products.filter(product => product.type === 'Paquetico');
  const pins = products.filter(product => product.type === 'Pin');
  const invoices = products.filter(product => product.type === 'Factura');
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.history.replaceState({}, '');
  }, []);

  function handleTopupClick(product: IProduct) {
    history.push('/topup', product);
  }

  function handleDataPlanClick(product: IProduct) {
    history.push('/data-plan', product);
  }

  function handlePinClick(pin: IProduct) {
    history.push('/pin', pin);
  }

  function handleInvoiceClick(invoice: IProduct) {
    history.push('/invoice', invoice);
  }

  function handleProductsMenuClick(id: string) {
    const element = document.querySelector(`#${id}`);
    const contentRect = contentRef.current!.getBoundingClientRect();
    const elementRect = element?.getBoundingClientRect();
    const top = (elementRect?.top || 0) - contentRect.top;
    contentRef.current!.scrollBy({ top, behavior: 'smooth' });
  }

  function canAnimate() {
    return animate === undefined || (animate !== undefined && animate !== false); 
  }

  return (
    <CSSTransition
      in={true}
      appear={true}
      unmountOnExit={true}
      nodeRef={pageRef}
      classNames={canAnimate() ? style.pageAnimation : undefined}
      timeout={200}>
      <div 
        className={style.container}
        ref={pageRef}>
        <Header onClick={props.onOpenDrawer}/>
        <div 
          className={style.content}
          ref={contentRef}>
          <div id='topups'/>
          <SalesReportBar salesReport={salesReport}/>
          <div className={style.productsContainer}>
            <Products
              title='Recargas'
              products={topups}
              onProductClick={handleTopupClick}/>
            <Products
              id='data-plans'
              title='Paqueticos'
              products={dataPlans}
              onProductClick={handleDataPlanClick}/>
            <Products
              id='pins'
              title='Pines'
              products={pins}
              onProductClick={handlePinClick}/>
            <Products
              id='invoices'
              title='Pago de facturas'
              products={invoices}
              onProductClick={handleInvoiceClick}/>
          </div>
        </div>
        <ProductsMenu 
          onClick={handleProductsMenuClick}/>
      </div>
    </CSSTransition>
  );
}
