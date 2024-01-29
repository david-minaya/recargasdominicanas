import React, { useEffect, useRef, useState } from 'react';
import { formatCurrency, formatDate, useForm } from '@recargas-dominicanas/core/utils';
import { Alert, Button, DateTime, OutlineButton, Pagination, Text } from '@recargas-dominicanas/core/components';
import { TableHeader } from '@recargas-dominicanas/core/components';
import { Table } from '@recargas-dominicanas/core/components';
import { TableRow } from '@recargas-dominicanas/core/components';
import { Cell } from '@recargas-dominicanas/core/components';
import { CellImage } from '@recargas-dominicanas/core/components';
import { BusinessStore } from '../../store/businessStore';
import { style } from './transactions.module.css';
import { CustomerApi } from '../../api/customer.api';

interface Form {
  startDate?: string;
  endDate?: string;
}

interface Props {
  id: number;
}

export function Transactions(props: Props) {

  const tableRef = useRef<HTMLTableElement>(null);
  const transactionPage = BusinessStore.getTransactionsPage(props.id);
  const form = useForm<Form>({ startDate: undefined, endDate: undefined });
  const [disableExportButton, setDisableExportButton] = useState(false);
  const [openErrorAlert, setOpenErrorAlert] = useState(false);
  const [openNotFoundAlert, setOpenNotFoundAlert] = useState(false);

  useEffect(() => {
    BusinessStore.fetchTransactions(props.id, { page: 1, size: 100 });
  }, []);

  useEffect(() => {
    if (tableRef.current) tableRef.current.scrollTop = 0;
  }, [transactionPage?.data]);

  useEffect(() => {
    setDisableExportButton(!form.value.startDate || !form.value.endDate);
  }, [form.value]);

  function handleFetchTransactions(page: number, size: number, startDate?: string, endDate?: string) {
    BusinessStore.fetchTransactions(props.id, { page, size, startDate, endDate });
  }

  function clearFilters() {
    form.clear();
    handleFetchTransactions(0, 100);
  }

  async function handleExport() {

    setDisableExportButton(true);

    try {

      const response = await CustomerApi.exportTransactions(props.id, form.value.startDate, form.value.endDate);
      const header: string = response.headers['content-disposition'];
      const filename = header.substring(header.indexOf('"')+1, header.lastIndexOf('"'));
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
    
      link.href = href;
      link.setAttribute('download', filename);
      link.click();
      URL.revokeObjectURL(href);
    
    } catch (err: any) {

      if (err.response.status === 404) {
        setOpenNotFoundAlert(true);
        return;
      }

      setOpenErrorAlert(true);

    } finally {

      setDisableExportButton(false);
    }
  }
  
  if (!transactionPage?.data) return null;

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <DateTime
          style={style.datetime}
          type='date'
          formField={form.fields.startDate}
          max={form.value?.endDate || new Date().toLocaleDateString('fr-ca')}
          placeholder='Fecha de inicio'
          onChange={value => handleFetchTransactions(0, 100, value, form.value.endDate)}/>
        <DateTime
          style={style.datetime}
          type='date'
          formField={form.fields.endDate}
          min={form.value?.startDate}
          max={new Date().toLocaleDateString('fr-ca')}
          placeholder='Fecha de finalización'
          onChange={value => handleFetchTransactions(0, 100, form.value.startDate, value)}/>
        {(form.value.startDate !== undefined || form.value.endDate !== undefined) &&
          <Button
            style={style.filterButton}
            icon='delete' 
            text='Borrar filtros'
            onClick={clearFilters}/>
        }
        <OutlineButton
          style={style.button} 
          text='Exportar'
          disabled={disableExportButton}
          onClick={handleExport}/>
      </div>
      <Table 
        style={style.table}
        refElement={tableRef}>
        <TableHeader 
          style={style.tableHeader}
          autoHide={true}>
          <Text text='Comp.'/>
          <Text text='Teléfono'/>
          <Text text='Monto'/>
          <Text text='Beneficio'/>
          <Text text='Tipo'/>
          <Text text='Fecha'/>
          <Text text='Estado'/>
        </TableHeader>
        <tbody>
          {
            transactionPage.data.map(transaction => (
              <TableRow key={transaction.id} style={style.tableRow}>
                <CellImage src={transaction.product.image}/>
                {(transaction.product.type === 'Recarga' || transaction.product.type === 'Paquetico') &&
                  <Cell className={style.phone} text={transaction.phone}/>
                }
                {transaction.product.type === 'Pin' &&
                  <Cell className={style.phone} text='* * * * * * * *'/>
                }
                {transaction.product.type === 'Factura' &&
                  <Cell className={style.phone} text={transaction.contract?.nic}/>
                }
                <Cell weight='medium' color='green' text={formatCurrency(transaction.amount)}/>
                <Cell weight='medium' color='green' text={formatCurrency(transaction.profit)}/>
                <Cell text={transaction.product.type}/>
                <Cell text={formatDate(transaction.date)}/>
                {transaction.cancelled
                  ? <Cell color='red' weight='medium' text='Cancelada'/>
                  : <Cell color='darkgray' text='Realizada'/>
                }
              </TableRow>
            ))
          }
        </tbody>
      </Table>
      <Pagination
        title='Transacciones'
        index={transactionPage.index}
        size={transactionPage.size}
        pages={transactionPage.pages}
        count={transactionPage.count}
        onChange={(page, size) => handleFetchTransactions(page, size, form.value.startDate, form.value.endDate)}/>
      <Alert
        open={openErrorAlert}
        title='Ocurrio un error al exportar las transacciones'
        description='Intentelo denuevo más tarde'
        timeout={5000}
        onClose={() => setOpenErrorAlert(false)}/>
      <Alert
        open={openNotFoundAlert}
        title='No se encontraron resultados en el rango de fechas seleccionado'
        description='Seleccione otro rango de fechas e intentelo de nuevo'
        timeout={5000}
        onClose={() => setOpenNotFoundAlert(false)}/>
    </div>
  );
}
