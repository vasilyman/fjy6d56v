import React, { FC } from 'react';

type Props = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export const Sidebar: FC<Props> = ({ style, children }) => {
  return <aside style={style}>{children}</aside>;
};
