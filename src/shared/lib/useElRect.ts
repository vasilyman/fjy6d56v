import { RefObject, useLayoutEffect, useRef } from 'react';

type Rect = { width: number; height: number };
type Position = { top: number; left: number; pageTop: number; pageLeft: number };
type RectPos = Partial<Rect & Position>;

type UseElRect = {
  el: RefObject<HTMLElement>;
  elShowed: boolean;
  onResize?: (v: Rect) => void;
  onMove?: (v: Position) => void;
  onChange?: (v: RectPos) => void;
};

export const useElRect = ({ el, elShowed, onResize, onMove, onChange }: UseElRect): void => {
  const rect = useRef<RectPos>({});

  useLayoutEffect(() => {
    const element = el.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentBoxSize[0].inlineSize;
      const height = entry.contentBoxSize[0].blockSize;

      rect.current.width = width;
      rect.current.height = height;

      if (onResize) onResize({ width, height });
      if (onChange) onChange(rect.current);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [elShowed]);

  useLayoutEffect(() => {
    const element = el.current;
    if (!element) return;

    const onScrollOrResize = () => {
      const { top, left } = element.getBoundingClientRect();
      const { scrollY, scrollX } = window;

      const val = { top, left, pageTop: top + scrollY, pageLeft: left + scrollX };

      rect.current.top = val.top;
      rect.current.pageTop = val.pageTop;
      rect.current.pageLeft = val.pageLeft;
      rect.current.left = left;

      if (onMove) onMove(val);
      if (onChange) onChange(rect.current);
    };

    onScrollOrResize();

    addEventListener('scroll', onScrollOrResize);
    addEventListener('resize', onScrollOrResize);

    return () => {
      removeEventListener('scroll', onScrollOrResize);
      removeEventListener('resize', onScrollOrResize);
    };
  }, [elShowed]);
};
