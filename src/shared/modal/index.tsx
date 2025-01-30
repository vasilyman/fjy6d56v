import React, { FC } from 'react';
import cn from 'clsx';
import $style from './modal.module.scss';
import { Sheet } from '../sheet';
import { Icon } from '../icon';

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}
/**
 * Primary UI component for user interaction
 */
export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  return (
    <div className={cn($style['modal'], { [$style['modal_opened']]: visible })}>
      <div className={$style['modal__overlay']} />
      <div className={$style['modal__wrapper']}>
        <div className={$style['modal-close']}>
          <Icon name="xmark" onClick={onClose} />
        </div>
        <Sheet className={$style['modal-content']}>{children}</Sheet>
      </div>
    </div>
  );
};
