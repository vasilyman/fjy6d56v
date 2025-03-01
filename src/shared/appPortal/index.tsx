import { FC, ReactNode, useId, useMemo } from 'react';
import { createPortal } from 'react-dom';

type AppPortapProps = {
  children: ReactNode;
  /** default: document.body */
  to?: string;
};

export const AppPortal: FC<AppPortapProps> = ({ children, to }) => {
  const key = useId();
  const mountTo = useMemo(() => {
    return to ? document.querySelector(to) : document.body;
  }, [to]);
  return createPortal(children, mountTo, key);
};
