import React from 'react';

interface Props {
  src?: string,
  className?: string
}

export function Image({ src, className }: Props) {
  return (
    <img 
      className={className} 
      src={`${process.env.IMAGES_DOMAIN}/${src}`}/>
  );
}
