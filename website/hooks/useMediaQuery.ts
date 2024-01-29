import React from 'react';

export function useMediaQuery(mediaQuery: string) {

  const [match, setMatch] = React.useState<undefined|boolean>();

  React.useEffect(() => {
    const matchMedia = window.matchMedia(mediaQuery);
    setMatch(matchMedia.matches);
    const listener = ({ matches }) => setMatch(matches);
    matchMedia.addEventListener('change', listener);
    return () => matchMedia.removeEventListener('change', listener);
  });

  return match;
}
