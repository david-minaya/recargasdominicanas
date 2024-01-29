import React from 'react';

interface props {
  caseId: number | string;
  children: any[];
}

export function Switch({ caseId, children }: props) {
  return (
    <React.Fragment>
      {children.find(child => child.props.caseId === caseId)}
    </React.Fragment>
  );
}
