import React from 'react';

interface Props {
  caseId: string | number;
  children?: React.ReactNode;
}

export function Case(props: Props) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}
