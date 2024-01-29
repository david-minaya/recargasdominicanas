import React, { Fragment, useRef, useState } from 'react';
import { Icon, Menu } from '@recargas-dominicanas/core/components';
import { IReleaseNote } from '@recargas-dominicanas/core/types';
import { MenuOption } from '../../../components/menu-option/menu-option.component';
import { style } from './release-note-item.module.css';
import { ReleaseNoteField } from '../release-note-field/release-note-field.component';

interface Props {
  index: number;
  releaseNote: Partial<IReleaseNote>;
  showMenuOption?: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onSave: (index: number, title: string, description: string) => void;
  onDelete: (index: number) => void;
}

export function ReleaseNoteItem(props: Props) {

  const { 
    index,
    releaseNote,
    showMenuOption = true,
    onEdit,
    onCancelEdit,
    onSave,
    onDelete
  } = props;

  const iconRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleEdit() {
    setEdit(true);
    setOpenMenu(false);
    onEdit();
  }

  function handleCancelEdit() {
    setEdit(false);
    onCancelEdit();
  }

  function handleDelete() {
    onDelete(index);
  }

  function handleSave(title: string, description: string) {
    onSave(index, title, description);
    setEdit(false);
  }

  return (
    <Fragment>
      {!edit &&
        <div className={style.container}>
          <div className={style.toolbar}>
            <div className={style.title}>{releaseNote.title}</div>
            {showMenuOption &&
              <Icon 
                className={style.icon} 
                iconRef={iconRef} 
                icon='more_horiz'
                onClick={() => setOpenMenu(true)}/>
            }
          </div>
          <div className={style.description}>{releaseNote.description}</div>
          <Menu 
            open={openMenu} 
            anchor={iconRef}
            style={style.menu}
            onClose={() => setOpenMenu(false)}>
            <MenuOption 
              style={style.menuOption}
              text='Editar' 
              onClick={handleEdit}/>
            <MenuOption 
              style={style.menuOption}
              text='Eliminar' 
              onClick={handleDelete}/>
          </Menu>
        </div>
      }
      {edit &&
        <ReleaseNoteField 
          releaseNote={releaseNote}
          onSave={handleSave}
          onCancel={handleCancelEdit}/>
      }
    </Fragment>
  );
}
