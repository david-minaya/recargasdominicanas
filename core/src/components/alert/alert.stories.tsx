import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Alert } from './alert.component';

export default {
  title: 'Components/Alert',
  component: Alert,
  args: {
    title: 'Ocurrio un error al realizar la operación'
  }
} as ComponentMeta<typeof Alert>;

export const Default: ComponentStory<typeof Alert> = (args) => {

  const [open, setOpen] = useState(true);

  return (
    <div>
      <OutlineButton 
        text='Show alert'
        onClick={() => setOpen(true)}/>
      <Alert
        open={open}
        title={args.title}
        description={args.description}
        timeout={args.timeout}
        onClose={() => setOpen(false)}/>
    </div>
  );
};
