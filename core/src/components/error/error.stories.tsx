import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Error } from './error.component';

const meta: ComponentMeta<typeof Error> = {
  title: 'Components/Error',
  component: Error,
  args: {
    show: true,
    message: 'Recargas Dominicanas'
  }
};

const Default: ComponentStory<typeof Error> = (args) => (
  <Error {...args}/>
);

export default meta;
export { Default };
