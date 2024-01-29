import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoadingModal } from './loading-modal.component';

const meta: ComponentMeta<typeof LoadingModal> = {
  title: 'Components/LoadingModal',
  component: LoadingModal,
  args: {
    open: true,
    title: 'Loading...'
  }
};

const Default: ComponentStory<typeof LoadingModal> = (args) => (
  <LoadingModal {...args}/>
);

export default meta;
export { Default };
