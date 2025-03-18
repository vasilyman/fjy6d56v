import type { FC, PropsWithChildren } from 'react';
import $style from './style.module.scss';
import React from 'react';

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={$style['container']}>{children}</div>;
};
