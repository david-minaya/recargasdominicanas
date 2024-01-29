import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Progress } from './progress.component';

export default {
  title: 'Components/Progress',
  component: Progress,
  args: { 
    value: 60,
    max: 100
  }
} as ComponentMeta<typeof Progress>;

export const Default: ComponentStory<typeof Progress> = (args) => (  
  <div style={{ width: '400px' }}>
    <Progress {...args}/>
  </div>
);
