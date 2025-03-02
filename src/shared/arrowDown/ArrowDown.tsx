import React, { type FC } from 'react';
import './arrow-down.css';

export const ArrowDown: FC<{ onClick?: () => void }> = (props) => {
  const onClick = () => {
    if (typeof props.onClick !== 'function') return;

    props.onClick();
  };

  return <div className="arrow-down" onClick={onClick} />;
};
