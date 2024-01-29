import React from 'react';
import { style } from './text-item.module.css';

interface props {
  label: string;
  text: string;
}

export function TextItem({ label, text }: props) {

  if (!text) return null;

  return (
    <div className={style.textItem}>
      <div className={style.label}>{label}</div>
      <div className={style.text}>{text}</div>
    </div>
  );
}
