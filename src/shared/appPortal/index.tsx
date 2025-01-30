import { FC, PropsWithChildren, useId } from 'react';
import { createPortal } from 'react-dom';

export const AppPortal: FC<PropsWithChildren> = ({ children }) => {
  const key = useId();
  return createPortal(children, document.body, key);
};
