import React, { createRef, type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { TouchManager } from '../lib/TouchManager';
import { normalizeInput, normalizeValue, stepperize, type TValue } from './lib';

interface RangeSliderProps<T extends TValue> {
  value: T;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onInput?: (val: T) => void;
}

export const RangeSlider = <T extends TValue>({ value, min, max, className, step, onInput }: RangeSliderProps<T>) => {
  const localValue = useRef<number[]>(normalizeValue(value, min, max));

  const isMultivalue = useRef(Array.isArray(value));

  const thumbsRef = useRef<RefObject<HTMLDivElement>[]>([]);
  thumbsRef.current = localValue.current.map((_, i) => thumbsRef.current[i] ?? createRef());

  const trackRef = useRef<HTMLDivElement>(null);

  /** px */
  const trackWidth = useRef<number>();

  /** px */
  const thumbsLeft = useRef<number[]>([]);

  const updThumb = (val: number, i: number) => {
    if (!thumbsRef.current[i].current) return;

    const left = val * trackWidth.current;
    thumbsRef.current[i].current.style.translate = `${left}px 0`;
    thumbsLeft.current[i] = left;
  };

  const progressRef = useRef<HTMLDivElement | null>(null);

  /** px */
  const startX = useRef<number[]>([]);
  startX.current = localValue.current.map((_, i) => startX.current[i] ?? 0);

  const onStart = (i: number) => {
    if (!thumbsRef.current[i].current) return;

    startX.current[i] = thumbsLeft.current[i];
  };

  const updProgress = () => {
    if (!progressRef.current) return;
    if (thumbsLeft.current.length > 2) return;

    const thumbsLeftSorted = [...thumbsLeft.current].sort((a, b) => a - b);
    const width =
      thumbsLeftSorted[thumbsLeftSorted.length - 1] - (thumbsLeftSorted.length > 1 ? thumbsLeftSorted[0] : 0);

    const left = thumbsLeftSorted.length > 1 ? thumbsLeftSorted[0] : 0;
    const scale = width / trackWidth.current;

    progressRef.current.style.translate = `${left}px -50%`;
    progressRef.current.style.scale = `${scale} 1`;
  };

  const onResize = () => {
    localValue.current.forEach((val, i) => {
      updThumb(val, i);
    });
    updProgress();
  };

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      trackWidth.current = entry.contentBoxSize[0].inlineSize;

      onResize();
    });

    resizeObserver.observe(trackRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const normalized = normalizeValue(value, min, max);
    const needReverse = localValue.current[0] > localValue.current[localValue.current.length - 1];
    localValue.current = needReverse ? normalized.reverse() : normalized;

    localValue.current.forEach((val, i) => {
      updThumb(val, i);
    });
    updProgress();
  }, [value, max, min]);

  const emit = useCallback(() => {
    if (!onInput) return;
    const nomalized = normalizeInput<T>(localValue.current, isMultivalue.current, step ?? null, min, max);
    onInput(nomalized);
  }, [onInput, max, min, step]);

  const onMove = useCallback(
    (delta: number, i: number) => {
      /** 0...1 */
      const offset = (startX.current[i] + delta) / trackWidth.current;
      const normalized = Math.max(Math.min(stepperize(offset, step ?? null, min, max), 1), 0);

      if (localValue.current[i] === normalized) return;

      localValue.current[i] = normalized;

      updThumb(normalized, i);
      updProgress();
      emit();
    },
    [min, max, step, emit]
  );

  useLayoutEffect(() => {
    const touch: TouchManager[] = [];

    thumbsRef.current.forEach((val, i) => {
      if (!thumbsRef.current[i].current) return;

      touch[i] = new TouchManager(
        thumbsRef.current[i].current,
        ({ deltaX }) => onMove(deltaX, i),
        () => onStart(i)
      );
    });

    return () => {
      touch.forEach((val) => {
        val.destroy();
      });
    };
  }, [onMove]);

  return (
    <div className={cn($style['range-slider'], className)}>
      <div ref={trackRef} className={$style['range-slider__track']} />
      <div ref={progressRef} className={$style['range-slider__progress']} />
      {localValue.current.map((_, i) => (
        <div key={i} ref={thumbsRef.current[i]} className={$style['range-slider__thumb']} />
      ))}
    </div>
  );
};
