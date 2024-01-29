import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon } from '../icon/icon.component';

const meta: ComponentMeta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  args: {
    icon: 'face'
  }
};

const Default: ComponentStory<typeof Icon> = (args) => (
  <Icon {...args}/>
);

export default meta;
export { Default };
