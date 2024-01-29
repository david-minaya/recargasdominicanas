import React, { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { FillButton } from '../fill-button/fill-button.component';
import { Drawer } from './drawer.component';
import { DrawerItem } from '../drawer-item/drawer-item.component';
import { DrawerHeader } from '../drawer-header/drawer-header.component';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen'
  }
};

export const Default: ComponentStory<typeof Drawer> = () => {

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}>
        <DrawerHeader>
          Hola mundo
        </DrawerHeader>
        <DrawerItem icon='home' title='Item 1' route='/route' align='top'/>
        <DrawerItem icon='add' title='Item 2' route='/route' align='top'/>
        <DrawerItem icon='add' title='Item 3' route='/route' align='bottom'/>
      </Drawer>
      <FillButton 
        text='abrir'
        onClick={() => setOpen(true)}/>
    </div>
  );
};
