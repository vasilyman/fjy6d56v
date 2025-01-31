import React, { FC, useEffect, useRef, useState } from 'react';
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

const waitTransition = async (el: HTMLElement) => {
  if (!el) return;
  return new Promise((res) => {
    el.addEventListener('transitionend', res, { once: true });
  });
};

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [isShowedWrapper, setIsShowedWrapper] = useState(visible);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = modalRef.current;
    if (visible) {
      requestAnimationFrame(() => {
        setIsShowedWrapper(true);
        requestAnimationFrame(() => {
          el?.classList.toggle($style['modal_opened'], true);
        });
      });
    } else {
      requestAnimationFrame(() => {
        el?.classList.toggle($style['modal_opened'], false);
        requestAnimationFrame(() => {
          waitTransition(el).then(() => setIsShowedWrapper(false));
        });
      });
    }
  }, [visible, isShowedWrapper]);

  return isShowedWrapper ? (
    <AppPortal>
      <div ref={modalRef} className={cn($style['modal'])}>
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
