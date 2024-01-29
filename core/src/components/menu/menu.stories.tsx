import React, { useRef, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from '../menu/menu.component';
import { Option } from '../option/option.component';

export default {
  title: 'Components/Menu',
  component: Menu
} as ComponentMeta<typeof Menu>;

export const Default: ComponentStory<typeof Menu> = () => {

  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <button 
        id='button'
        ref={buttonRef}
        onClick={() => setOpen(open => !open)}>
        Abrir menu
      </button>
      <Menu open={open} anchor={buttonRef}>
        <Option icon='receipt' text='Reimprimir recibo'/>
        <Option icon='cancel' text='Cancelar recarga'/>
      </Menu>
    </div>
  );
};
