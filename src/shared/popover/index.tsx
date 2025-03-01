import React, {
  createContext,
  FC,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { AppPortal } from '../appPortal';
import cn from 'clsx';
import $style from './style.module.scss';
import { useElRect } from '../lib/useElRect';

type PopoverActivatorProps = {
  children: ReactNode;
  className?: string;
};

type PopoverContentProps = {
  children: ReactNode;
  className?: string;
};

type PopoverProps = {
  value?: boolean;
  showOnHover?: boolean;
  to?: string;
  children: [ReactElement<PopoverActivatorProps>, ReactElement<PopoverContentProps>];
  onInput?: (v: boolean) => void;
};

type ActivatorRect = { left: number; top: number; height: number; pageLeft: number; pageTop: number };

export enum Position {
  TOP,
  BOTTOM,
}

export const PopoverContext = createContext<{
  value: boolean;
  to?: string;
  showOnHover?: boolean;
  activatorRect: ActivatorRect;
  setActivatorRect: (v: ActivatorRect) => void;
  setValue: (v: boolean) => void;
  activatorHovered: boolean;
  setActivatorHovered: (v: boolean) => void;
  contentHovered: boolean;
  setContentHovered: (v: boolean) => void;
  contentHeight: number;
  setContentHeight: (v: number) => void;
  position: Position;
  setPosition: (v: Position) => void;
}>(undefined);

const usePopover = () => {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error('Loosed context');
  }

  return context;
};

interface PopoverComponent extends FC<PopoverProps> {
  Activator: FC<PopoverActivatorProps>;
  Content: FC<PopoverContentProps>;
}

/**
 * Compound component pattert
 * @see https://habr.com/ru/companies/alfa/articles/647013/
 * @see https://stackademic.com/blog/supercharging-react-components-with-typescript-and-compound-components-ed11e54782c2
 */
export const Popover: PopoverComponent = ({ value, showOnHover, to, children, onInput }: PopoverProps) => {
  const [localValue, setLocalValue] = useState<boolean>(value);
  const [activatorRect, setActivatorRect] = useState<ActivatorRect>({
    left: 0,
    top: 0,
    height: 0,
    pageLeft: 0,
    pageTop: 0,
  });

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  const onSetValue = (val: boolean) => {
    setLocalValue(val);
    if (onInput) onInput(val);
  };

  const [activatorHovered, setActivatorHovered] = useState(false);
  const [contentHovered, setContentHovered] = useState(false);
  const [contentHeight, setContentHeight] = useState(NaN);
  const [position, setPosition] = useState(Position.TOP);

  useEffect(() => {
    if (showOnHover && !activatorHovered && !contentHovered) setLocalValue(false);
  }, [activatorHovered, contentHovered, showOnHover]);

  useEffect(() => {
    if (showOnHover && (activatorHovered || contentHovered)) setLocalValue(true);
  }, [activatorHovered, contentHovered, showOnHover]);

  return (
    <PopoverContext.Provider
      value={{
        value: localValue,
        setValue: onSetValue,
        to,
        showOnHover,
        activatorRect,
        setActivatorRect,
        contentHovered,
        setContentHovered,
        activatorHovered,
        setActivatorHovered,
        contentHeight,
        setContentHeight,
        position,
        setPosition,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverActivator: FC<PopoverActivatorProps> = ({ children }) => {
  const { value, setValue, setActivatorRect, setActivatorHovered } = usePopover();

  const activatorRef = useRef<HTMLDivElement | null>(null);

  const toggleValue = (val?: boolean) => {
    setValue(val ?? !value);
  };

  const onHover = () => {
    setActivatorHovered(true);
  };

  const onLeave = () => {
    setActivatorHovered(false);
  };

  const onClick = () => {
    toggleValue();
  };

  const onChange = ({ left, pageLeft, pageTop, top, height }: ActivatorRect) => {
    setActivatorRect({ left, pageLeft, top, pageTop, height });
  };

  useElRect({ el: activatorRef, elShowed: value, onChange });

  useLayoutEffect(() => {
    const el = activatorRef.current;

    el.addEventListener('pointerover', onHover);
    el.addEventListener('pointerout', onLeave);

    return () => {
      el.removeEventListener('pointerover', onHover);
      el.removeEventListener('pointerout', onLeave);
    };
  }, []);

  return (
    <div ref={activatorRef} className={cn($style['popover__activator'])} onClick={onClick}>
      {children}
    </div>
  );
};

Popover.Activator = memo(PopoverActivator);

const PopoverContent: FC<PopoverContentProps> = ({ children }) => {
  const { value, to, activatorRect, setContentHovered, contentHeight, setContentHeight, setPosition } = usePopover();

  const contentRef = useRef<HTMLDivElement | null>(null);

  const onResize = ({ height }: { height: number }) => {
    setContentHeight(height);
  };

  useElRect({ el: contentRef, elShowed: value, onResize });

  useLayoutEffect(() => {
    if (!contentRef.current || Number.isNaN(contentHeight)) return;

    if (activatorRect.top < contentHeight) {
      contentRef.current.style.top = `${activatorRect.pageTop + activatorRect.height}px`;
      setPosition(Position.BOTTOM);
    } else {
      contentRef.current.style.top = `${activatorRect.pageTop - contentHeight}px`;
      setPosition(Position.TOP);
    }

    contentRef.current.style.left = `${activatorRect.pageLeft}px`;
  }, [activatorRect, value, contentHeight, setPosition]);

  const onHover = () => {
    setContentHovered(true);
  };

  const onLeave = () => {
    setContentHovered(false);
  };

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.addEventListener('pointerover', onHover);
    el.addEventListener('pointerout', onLeave);

    return () => {
      el.removeEventListener('pointerover', onHover);
      el.removeEventListener('pointerout', onLeave);
    };
  }, [value]);

  return (
    value && (
      <AppPortal to={to}>
        <div ref={contentRef} className={cn($style['popover__content'])}>
          {children}
        </div>
      </AppPortal>
    )
  );
};

Popover.Content = memo(PopoverContent);
