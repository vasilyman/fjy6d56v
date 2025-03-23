import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import $style from './modal.module.scss';
import { Sheet } from '../sheet';
import { Icon } from '../icon';
import { AppPortal } from '../appPortal';
import anime from 'animejs';
import fastdom from 'fastdom';

interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ visible, children, onClose }) => {
  const [isShowedWrapper, setIsShowedWrapper] = useState(visible);

  const DURATION = 300;

  const modalRef = useRef<HTMLDivElement>(null);
  const progressProxy = useRef(0);

  const updateOpacity = useCallback(
    (val: number) => {
      if (!modalRef.current) return;
      fastdom.mutate(() => {
        modalRef.current.style.setProperty('--overlay-opacity', `${val}`);
        modalRef.current.style.setProperty('--wrapper-opacity', `${val}`);
      });
    },
    [modalRef]
  );

  const open = useCallback(() => {
    anime.remove(progressProxy);
    setIsShowedWrapper(true);
    anime({
      targets: progressProxy,
      current: 1,
      update() {
        updateOpacity(progressProxy.current);
      },
      duration: DURATION,
      easing: 'easeInOutSine',
    });
  }, [updateOpacity]);

  const close = useCallback(() => {
    anime.remove(progressProxy);
    anime({
      targets: progressProxy,
      current: 0,
      update() {
        updateOpacity(progressProxy.current);
      },
      duration: DURATION,
      easing: 'easeInOutSine',
      complete() {
        fastdom.mutate(() => {
          setIsShowedWrapper(false);
        });
      },
    });
  }, [updateOpacity]);

  useEffect(() => {
    if (visible) {
      open();
    } else {
      close();
    }
  }, [visible, open, close]);

  return isShowedWrapper ? (
    <AppPortal to="#root">
      <div ref={modalRef} className={cn($style['modal'])}>
        <div className={$style['modal__overlay']} />
        <div className={$style['modal__wrapper']}>
          <button className={$style['modal-close']} onClick={onClose}>
            <Icon name="xmark" />
          </button>
          <Sheet className={$style['modal-content']}>{children}</Sheet>
        </div>
      </div>
    </AppPortal>
  ) : null;
};
