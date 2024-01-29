import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SalesReport } from './sales-report.component';

export default {
  title: 'Components/SalesReport',
  component: SalesReport,
  args: {
    balance: 3000,
    sales: 10000,
    profit: 500
  }
} as ComponentMeta<typeof SalesReport>;

export const Default: ComponentStory<typeof SalesReport> = (args) => (
  <SalesReport {...args}/>
);
