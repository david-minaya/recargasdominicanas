import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineButton } from '../outline-button/outline-button.component';
import { Toast } from './toast.component';

export default {
  title: 'Components/Toast',
  component: Toast,
  args: {
    text: 'Recargas Dominicanas'
  }
} as ComponentMeta<typeof Toast>;

export const Default: ComponentStory<typeof Toast> = (args) => {

  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <OutlineButton 
        text='Show toast'
        onClick={() => setShowToast(true)}/>
      <Toast
        show={showToast}
        text={args.text}
        timeout={args.timeout}
        onClose={() => setShowToast(false)}/>
    </div>
  );
};
