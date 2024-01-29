import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Brand } from './brand.component';

export default {
  title: 'Components/Brand',
  component: Brand
} as ComponentMeta<typeof Brand>;

export const Default = (args: any) => <Brand {...args}/>;
