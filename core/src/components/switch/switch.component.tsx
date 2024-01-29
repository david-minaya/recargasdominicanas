import React, { ReactElement } from 'react';

interface Props {
  caseId: number | string,
  children: ReactElement[]
}

export function Switch(props: Props) {
  const { caseId, children } = props;
  return (
    <React.Fragment>
      {children.find(child => child.props.caseId === caseId)}
    </React.Fragment>
  );
}
