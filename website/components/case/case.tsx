import React from 'react';

interface Props<T> {
  caseId: T;
  children: React.ReactNode;
}

export function Case<T>({ caseId, children }: Props<T>) {
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
