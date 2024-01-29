import React, { useEffect, useState } from 'react';
import { Icon, TextField } from '@recargas-dominicanas/core/components';
import { style } from './settings.module.css';

export function Settings() {

  const [ticketWith, setTicketWith] = useState<string>();
  const [endLines, setEndLines] = useState<string>();

  useEffect(() => {
    const width = localStorage.getItem('ticketWidth');
    const endLines = localStorage.getItem('endLines');
    setTicketWith(width || '40');
    setEndLines(endLines || '5');
  }, []);
  
  function handleTicketWidthBlur() {

    if (ticketWith === '' || parseInt(ticketWith!) < 20) {
      setTicketWith('20');
      localStorage.setItem('ticketWidth', '20');
      return;
    }

    localStorage.setItem('ticketWidth', ticketWith!);
  }

  function handleEndLinesBlur() {

    if (endLines === '' || parseInt(endLines!) < 1) {
      setEndLines('1');
      localStorage.setItem('endLines', '1');
      return;
    }

    localStorage.setItem('endLines', endLines!);
  }

  if (ticketWith === undefined || endLines === undefined) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.titleContainer}>
          <Icon className={style.icon} icon='print'/>
          <div className={style.title}>Impresora</div>
        </div>
        <div className={style.item}>
          <div className={style.itemTitle}>Ancho de la impresión</div>
          <TextField
            style={style.textField}
            type='number'
            value={ticketWith}
            onChange={setTicketWith}
            onBlur={handleTicketWidthBlur}/>
        </div>
        <div className={style.item}>
          <div className={style.itemTitle}>Nuevas lineas al final de la impresión</div>
          <TextField
            style={style.textField}
            type='number'
            value={endLines}
            onChange={setEndLines}
            onBlur={handleEndLinesBlur}/>
        </div>
      </div>
    </div>
  );
}
