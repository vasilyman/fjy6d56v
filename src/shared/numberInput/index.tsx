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
  block?: boolean;
  onlyInput?: boolean;
}
/**
 * NumberInput
 * TODO: fix cursor position
 */

export const NumberInputRaw: FC<NumberInputProps> = ({ onInput, className, value, max, min, block, onlyInput }) => {
  const [localValue, setLocalValue] = useState(value);

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  const onUserInput = useCallback(
    (val: number) => {
      if (val === value) return;
      onInput(val);
      setLocalValue(val);
    },
    [onInput, value]
  );

  const { fieldStyleModule } = useContext(FieldContext);
  const maximum = useRef(Math.min(max ?? Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER));
  const minimum = useRef(min);

  const onInputLocal: FormEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const val = Number(e.currentTarget.value);
      if (Number.isNaN(val)) return;

      onUserInput(val);
    },
    [onUserInput]
  );

  const onAdd = useCallback(() => {
    if (localValue + 1 > maximum.current) return;
    onUserInput(localValue + 1);
  }, [onUserInput, localValue]);

  const onSub = useCallback(() => {
    if (minimum.current !== undefined && localValue - 1 < minimum.current) return;
    onUserInput(localValue - 1);
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
