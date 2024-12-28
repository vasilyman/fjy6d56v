import React, { FC, FormEventHandler } from 'react';
import cn from 'clsx';
import $style from './style.module.scss';

interface NumberInputProps {
  value: number;
  className?: string;
  onInput?: (v: number) => void;
  max?: number;
  min?: number;
  block?: boolean;
}
/**
 * NumberInput
 * TODO: fix cursor position
 */

export const NumberInputRaw: FC<NumberInputProps> = ({ onInput, className, value, max, min, block }) => {
  const maximum = Math.min(max ?? Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  const minimum = min;

  const onInputLocal: FormEventHandler<HTMLInputElement> = (e) => {
    const val = Number(e.currentTarget.value);
    if (!Number.isNaN(val)) onInput(val);
  };

  const onAdd = () => {
    if (value + 1 <= maximum) onInput(value + 1);
  };

  const onSub = () => {
    if (min === undefined || value - 1 >= minimum) onInput(value - 1);
  };

  return (
    <div className={cn($style['input-number'], className, { [$style['input-number_block']]: block })}>
      <button
        type="button"
        className={cn($style['input-number__button'], $style['input-number__button_left'])}
        onClick={onSub}
      >
        -
      </button>
      <input
        type="number"
        title={value.toString()}
        onInput={onInputLocal}
        className={$style['input-number__input']}
        value={value}
        max={maximum}
        min={minimum}
      />
      <button
        type="button"
        className={cn($style['input-number__button'], $style['input-number__button_right'])}
        onClick={onAdd}
      >
        +
      </button>
    </div>
  );
};

export const NumberInput = React.memo(NumberInputRaw);
