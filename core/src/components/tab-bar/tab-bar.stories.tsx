import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tab } from '../tab/tab.component';
import { TabBar } from './tab-bar.component';

export default {
  title: 'Components/TabBar',
  component: TabBar
} as ComponentMeta<typeof TabBar>;

export const Default: ComponentStory<typeof TabBar> = () => (
  <TabBar>
    <Tab title='Pestaña 1'/>
    <Tab title='Pestaña 2'/>
    <Tab title='Pestaña 3'/>
    <Tab title='Pestaña 4'/>
  </TabBar>
);
