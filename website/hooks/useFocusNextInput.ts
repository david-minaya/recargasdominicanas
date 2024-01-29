import React from 'react';

export function useFocusNextInput(parentElement: React.MutableRefObject<HTMLElement>) {
  return React.useCallback(() => {
    const nodes = parentElement.current.querySelectorAll<HTMLElement>('input, textarea');
    const elements = Array.from(nodes);
    const focusedInputIndex = elements.findIndex(element => element.autofocus);
    const nextElement = elements[focusedInputIndex + 1];
    nextElement.focus();
    nextElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, []);
}
