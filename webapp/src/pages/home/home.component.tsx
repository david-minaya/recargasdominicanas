import React, { useEffect, useState } from 'react';
import { IProduct } from '@recargas-dominicanas/core/types';
import { BusinessApi } from '@recargas-dominicanas/core/api';
import { useSalesReport, useProducts, useBusiness, useTransactions } from '@recargas-dominicanas/core/store';
import { Title, SalesReport, OptionIcon, LoadingModal } from '@recargas-dominicanas/core/components';
import { SalesReportSuccessfulModal } from '../../components/sales-report-successful-modal/sales-report-successful-modal.component';
import { SalesReportModal } from '../../components/sales-report-modal/sales-report-modal.component';
import { TransactionsCard } from '../../components/transactions-card/transactions-card.component';
import { ErrorModal } from '../../components/error-modal/error-modal.component';
import { DataPlan } from '../../components/data-plan/data-plan.component';
import { Products } from '../../components/products/products.component';
import { Invoice } from '../../components/invoice/invoice.component';
import { printSalesReport } from '../../utils/printSalesReport';
import { Topup } from '../../components/topup/topup.component';
import { Pin } from '../../components/pin/pin.component';
import { style } from './home.module.css';

export function Home() {

  const productsStore = useProducts();
  const salesReportStore = useSalesReport();
  const transactionStore = useTransactions();
  const business = useBusiness().get();
  const products = productsStore.get();
  const salesReport = salesReportStore.getCurrent();
  const [product, setProduct] = useState<IProduct>(products[0]);
  const [lastSalesReport, setLastSalesReport] = useState(salesReport);
  const [openSalesReportModal, setOpenSalesReportModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [openSalesReportErrorModal, setOpenSalesReportErrorModal] = useState(false);
  const [openSalesReportSuccessfulModal, setOpenSalesReportSuccessfulModal] = useState(false);

  useEffect(() => {
    transactionStore.fetchGroupByDay(1, 50);
  }, []);

  async function handleSalesReport() {

    try {
      
      setOpenSalesReportModal(false);
      setOpenLoadingModal(true);

      await BusinessApi.createSalesReport();

      salesReportStore.fetchCurrent();
      
      setLastSalesReport(salesReport);
      setOpenLoadingModal(false);
      setOpenSalesReportSuccessfulModal(true);

    } catch {

      setOpenLoadingModal(false);
      setOpenSalesReportErrorModal(true);
    }
  }

  function handleProductClick(product: IProduct) {
    setProduct(product);
  }

  return (
    <div className={style.container}>
      <div className={style.toolbar}>
        <Title style={style.title} title='Recargas'/>
        <SalesReport {...salesReport}/>
        <div className={style.options}>
          <OptionIcon 
            icon='receipt_long'
            onClick={() => setOpenSalesReportModal(true)}/>
        </div>
      </div>
      <div className={style.content}>
        <TransactionsCard/>
        <Products onClick={handleProductClick}/>
        {product.type === 'Recarga' && <Topup product={product}/>}
        {product.type === 'Paquetico' && <DataPlan product={product}/>}
        {product.type === 'Pin' && <Pin product={product}/>}
        {product.type === 'Factura' && <Invoice product={product}/>}
      </div>
      <SalesReportModal 
        open={openSalesReportModal}
        salesReport={salesReport}
        onAccept={handleSalesReport}
        onClose={() => setOpenSalesReportModal(false)}/>
      <LoadingModal
        open={openLoadingModal}
        title='Realizando cierre de ventas'
        overlayEnterAnimation={false}/>
      <SalesReportSuccessfulModal
        open={openSalesReportSuccessfulModal}
        salesReport={lastSalesReport}
        onPrint={() => printSalesReport(business, lastSalesReport)}
        onClose={() => setOpenSalesReportSuccessfulModal(false)}/>
      <ErrorModal
        open={openSalesReportErrorModal}
        title='Error realizando cierre de ventas'
        description='Ocurrio un error al realizar el cierre de ventas, intentelo denuevo más tarde.'
        onClose={() => setOpenSalesReportErrorModal(false)}/>
    </div>
  );
}
