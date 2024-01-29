import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IndeterminateProgressBar } from './indeterminate-progress-bar.component';

export default {
  title: 'Components/IndeterminateProgressBar',
  component: IndeterminateProgressBar
} as ComponentMeta<typeof IndeterminateProgressBar>;

export const Default: ComponentStory<typeof IndeterminateProgressBar> = () => (  
  <div style={{ width: '400px' }}>
    <IndeterminateProgressBar/>
  </div>
);
