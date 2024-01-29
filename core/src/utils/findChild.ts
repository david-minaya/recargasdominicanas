import { ReactElement } from 'react';

export function findChild<T>(children: ReactElement[], childType: T) {
  return children.find(child => (
    // @ts-ignore
    child.type === childType
  ));
}
