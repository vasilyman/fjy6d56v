import debounce from 'lodash/debounce';
import { RefObject, useEffect, useLayoutEffect, useRef } from 'react';

export type Rect = { width: number; height: number };
export type Position = { top: number; left: number; pageTop: number; pageLeft: number };
export type RectPos = Partial<Rect & Position>;

type UseElRect = {
  el: RefObject<HTMLElement>;
  /** state for watching el */
  elShowed: boolean;
  onResize?: (v: Rect) => void;
  onMove?: (v: Position) => void;
  onChange?: (v: RectPos) => void;
};

export const useElRect = ({ el, elShowed, onResize, onMove, onChange }: UseElRect): void => {
  const rect = useRef<RectPos>({});

  const onMoveDebounced = debounce((v) => (onMove ? onMove(v) : undefined), 16);
  const onChangeDebounced = debounce((v) => (onChange ? onChange(v) : undefined), 16);
  const onResizeDebounced = debounce((v) => (onResize ? onResize(v) : undefined), 16);

  useLayoutEffect(() => {
    const element = el.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = entry.contentBoxSize[0].inlineSize;
      const height = entry.contentBoxSize[0].blockSize;

      rect.current.width = width;
      rect.current.height = height;

      onResizeDebounced({ width, height });
      onChangeDebounced(rect.current);
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

      onMoveDebounced(val);
      onChangeDebounced(rect.current);
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
