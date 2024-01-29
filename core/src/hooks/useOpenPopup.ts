import { useState } from 'react';

export function useOpenPopup() {

  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);

  function handleOpen() {
    if (close) {
      setOpen(true);
      setClose(false);
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => setClose(true), 300);
  }

  return { open, handleOpen, handleClose };
}
