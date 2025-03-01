import React, { FC, ReactNode } from 'react';
import { Popover, PopoverContext, Position as PopoverPosition } from '../popover';
import cn from 'clsx';
import $style from './style.module.scss';

type TipPtops = {
  children: ReactNode;
  text: ReactNode;
  openOnClick?: boolean;
};

export const Tip: FC<TipPtops> = ({ children, text, openOnClick }) => {
  return (
    <Popover showOnHover={!openOnClick}>
      <Popover.Activator>{children}</Popover.Activator>
      <Popover.Content>
        <PopoverContext.Consumer>
          {({ position }) => (
            <div className={cn($style['tip'])}>
              <div
                className={cn($style['tip__text'], position === PopoverPosition.BOTTOM && $style['tip__text_bottom'])}
              >
                {text}
              </div>
              <div
                className={cn($style['tip__arrow'], position === PopoverPosition.BOTTOM && $style['tip__arrow_bottom'])}
              />
            </div>
          )}
        </PopoverContext.Consumer>
      </Popover.Content>
    </Popover>
  );
};
