import React, { FC } from 'react';
import $style from './style.module.scss';

type Props = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const Sidebar: FC<Props> = ({ style, children }) => {
  return (
    <aside style={style} className={$style['sidebar']}>
      {children}
    </aside>
  );
};
