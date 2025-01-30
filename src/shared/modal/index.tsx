import React, { FC, useEffect, useId, useRef, useState } from 'react';
import cn from 'clsx';
import $style from './modal.module.scss';
import { Sheet } from '../sheet';
import { Icon } from '../icon';
import { AppPortal } from '../appPortal';

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [isShowed, setIsShowed] = useState(visible);
  const [isShowedWrapper, setIsShowedWrapper] = useState(visible);

  const modalRef = useRef(null);
  const waitTransition = async () => {
    if (!modalRef.current) return;
    return new Promise((res) => {
      modalRef.current.addEventListener('transitionend', res, { once: true });
    });
  };

  useEffect(() => {
    if (visible) {
      setIsShowedWrapper(true);
      setTimeout(() => {
        if (isShowedWrapper) setIsShowed(true);
      }, 0);
    } else {
      setIsShowed(false);
      setTimeout(() => {
        if (!isShowed) waitTransition().then(() => setIsShowedWrapper(false));
      }, 0);
    }
  }, [visible, isShowedWrapper, isShowed]);

  return isShowedWrapper ? (
    <AppPortal>
      <div ref={modalRef} className={cn($style['modal'], { [$style['modal_opened']]: isShowed })}>
        <div className={$style['modal__overlay']} />
        <div className={$style['modal__wrapper']}>
          <div className={$style['modal-close']}>
            <Icon name="xmark" onClick={onClose} />
          </div>
          <Sheet className={$style['modal-content']}>{children}</Sheet>
        </div>
      </div>
    </AppPortal>
  ) : null;
};
