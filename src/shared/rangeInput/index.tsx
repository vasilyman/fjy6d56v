import React, {
  ChangeEvent,
  createRef,
  type RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import isEqual from 'lodash/isEqual';
import { RangeSlider } from '../rangeSlider';

export type TValue = number | [number, number];

interface RangeInputProps<T extends TValue> {
  value: T;
  /** default: 0 */
  min?: number;
  /** default: 100 */
  max?: number;
  step?: number;
  className?: string;
  onInput?: (val: T) => void;
}

const updateAndSortInputValues = (inputs: RefObject<HTMLInputElement>[]) => {
  const values: number[] = [];
  inputs.forEach((el, j) => {
    values[j] = Number(el.current.value);
  });
  values.sort((a, b) => a - b);
  inputs.forEach((el, j) => {
    el.current.value = values[j].toString();
  });
};

export const RangeInput = <T extends TValue>({ value, min, max, className, step, onInput }: RangeInputProps<T>) => {
  const [localValue, setLocalValue] = useState<number[]>(() =>
    Array.isArray(value) ? [...value.sort((a, b) => a - b)] : [value]
  );
  useEffect(() => {
    const normalized = Array.isArray(value) ? [...value] : [value];
    setLocalValue((localValue) => {
      return isEqual(normalized, localValue) ? localValue : normalized;
    });
  }, [value]);

  const minimum = useRef(min ?? 0);
  const maximum = useRef(max ?? 100);

  const inputRefs = useRef<RefObject<HTMLInputElement>[]>([]);
  inputRefs.current = localValue.map((_, i) => inputRefs.current[i] ?? createRef());

  useEffect(() => {
    inputRefs.current.forEach((el, i) => {
      if (!el.current) return;

      el.current.value = localValue[i].toString();
    });
  }, []);

  const onUserInput = useCallback((i: number, e: ChangeEvent<HTMLInputElement>) => {
    if (e.type === 'input') return;

    const steppedVal = step === undefined ? Number(e.target.value) : Math.round(Number(e.target.value) / step) * step;
    const val = Math.max(Math.min(steppedVal, maximum.current), minimum.current);

    e.target.value = val.toString();
    updateAndSortInputValues(inputRefs.current);

    setLocalValue((localValue) => {
      const copy = [...localValue];
      copy[i] = val;
      return isEqual(localValue, copy) ? localValue : copy;
    });
  }, []);

  const onRangeInput = useCallback((val: number[]) => {
    setLocalValue(val);
    val.forEach((val, i) => {
      inputRefs.current[i].current.value = val.toString();
    });
  }, []);

  useLayoutEffect(() => {
    const normalized = Array.isArray(value) ? localValue : localValue[0];
    if (isEqual(normalized, value)) return;
    onInput(normalized as T);
  }, [localValue, onInput, value]);

  return (
    <div className={cn($style['range-input'], className)}>
      <div className={$style['range-input__inputs']}>
        {localValue.map((_, i) => (
          <input
            key={i}
            ref={inputRefs.current[i]}
            type="number"
            max={maximum.current}
            min={minimum.current}
            step={step}
            className={cn($style['range-input__input'])}
            onInput={(e: ChangeEvent<HTMLInputElement>) => onUserInput(i, e)}
            onBlur={(e: ChangeEvent<HTMLInputElement>) => onUserInput(i, e)}
          />
        ))}
      </div>
      <div className={$style['range-input__slider']}>
        <RangeSlider
          value={localValue}
          min={minimum.current}
          max={maximum.current}
          step={step}
          onInput={onRangeInput}
        />
      </div>
    </div>
  );
};
