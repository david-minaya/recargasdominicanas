import React, { Fragment, useRef, useState } from 'react';
import { TableRow, Cell, CellIcon, Menu, Option } from '@recargas-dominicanas/core/components';
import { formatDate, formatCurrency } from '@recargas-dominicanas/core/utils';
import { printSalesReport } from '../../utils/printSalesReport';
import { ISalesReport } from '@recargas-dominicanas/core/types';
import { useBusiness } from '@recargas-dominicanas/core/store';

interface Props {
  salesReport: ISalesReport;
}

export function SalesReportRow(props: Props) {

  const { salesReport } = props;

  const business = useBusiness().get();
  const anchor = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <Cell text={formatDate(salesReport.date)}/>
        <Cell weight='medium' color='green' text={formatCurrency(salesReport.balance)}/>
        <Cell weight='medium' color='green' text={formatCurrency(salesReport.sales)}/>
        <Cell weight='medium' color='green' text={formatCurrency(salesReport.sales - salesReport.profit)}/>
        <Cell weight='medium' color='green' text={formatCurrency(salesReport.profit)}/>
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
          onClick={() => printSalesReport(business, salesReport)}/>
      </Menu>
    </Fragment>
  );
}
