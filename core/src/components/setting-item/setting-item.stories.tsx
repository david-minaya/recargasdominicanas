import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SettingItem } from '../setting-item/setting-item.component';

const meta: ComponentMeta<typeof SettingItem> = {
  title: 'Components/SettingItem',
  component: SettingItem,
  args: {
    icon: 'face',
    text: 'Configuracion'
  }
};

const Default: ComponentStory<typeof SettingItem> = (args) => (
  <SettingItem {...args}/>
);

export default meta;
export { Default };
