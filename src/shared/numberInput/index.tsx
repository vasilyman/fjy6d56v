import React, { FC, FormEventHandler, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';
import { Field, FieldContext } from '../field';

interface NumberInputProps {
  value: number;
  className?: string;
  onInput?: (v: number) => void;
  max?: number;
  min?: number;
  step?: number;
  block?: boolean;
  onlyInput?: boolean;
}
/**
 * NumberInput
 * TODO: fix cursor position
 */

export const NumberInputRaw: FC<NumberInputProps> = ({
  onInput,
  className,
  value,
  max,
  min,
  step,
  block,
  onlyInput,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  const numDigitsAfterDot = (n: number) => n.toString().split('.')[1]?.length ?? 0;
  const normalizeToStep = (n: number) => +n.toFixed(numDigitsAfterDot(stepLocal.current));

  const onUserInput = useCallback(
    (raw: number) => {
      const m = 100;
      const ost = normalizeToStep((normalizeToStep(raw * m) % normalizeToStep(stepLocal.current * m)) / m);
      const norm = normalizeToStep(raw - ost);

      const val = Math.min(Math.max(norm, minimum.current), maximum.current);

      if (val === value) return;
      onInput(val);
      setLocalValue(val);
    },
    [onInput, value]
  );

  const { fieldStyleModule } = useContext(FieldContext);
  const maximum = useRef(Math.min(max ?? Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER));
  const minimum = useRef(min);
  const stepLocal = useRef(step ?? 1);

  const onInputLocal: FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const val = Number(e.currentTarget.value);
      if (Number.isNaN(val)) return;

      onUserInput(val);
    },
    [onUserInput]
  );

  const onAdd = useCallback(() => {
    if (localValue + stepLocal.current > maximum.current) return;
    onUserInput(localValue + stepLocal.current);
  }, [onUserInput, localValue]);

  const onSub = useCallback(() => {
    if (minimum.current !== undefined && localValue - stepLocal.current < minimum.current) return;
    onUserInput(localValue - stepLocal.current);
  }, [onUserInput, localValue]);

  return (
    <div className={cn($style['input-number'], className, { [$style['input-number_block']]: block })}>
      {!onlyInput && (
        <button
          type="button"
          className={cn($style['input-number__button'], $style['input-number__button_left'])}
          onClick={onSub}
        >
          -
        </button>
      )}
      <input
        type="number"
        title={localValue.toString()}
        onInput={onInputLocal}
        className={cn(fieldStyleModule['field__input'], $style['input-number__input'])}
        value={localValue}
        max={maximum.current}
        min={minimum.current}
        step={stepLocal.current}
      />
      {!onlyInput && (
        <button
          type="button"
          className={cn($style['input-number__button'], $style['input-number__button_right'])}
          onClick={onAdd}
        >
          +
        </button>
      )}
    </div>
  );
};

const NumberInputNotMemoized: FC<NumberInputProps> = (props) => {
  return (
    <Field>
      <NumberInputRaw {...props} />
    </Field>
  );
};

export const NumberInput = React.memo(NumberInputNotMemoized);
