import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OutlineCard } from './outline-card.component';

export default {
  title: 'Components/OutlineCard',
  component: OutlineCard
} as ComponentMeta<typeof OutlineCard>;

export const Default: ComponentStory<typeof OutlineCard> = () => (
  <OutlineCard>
    <div style={{ width: '300px', height: '400px' }}></div>
  </OutlineCard>
);
