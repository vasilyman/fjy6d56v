import React, { type FC } from 'react';
import $style from './style.module.scss';
import cn from 'clsx';
import { Icon } from '../icon';

type Item = {
  title: string;
  value: string;
  loading?: boolean;
};

type Props = {
  items: Item[];
  value: string;
  name: string;
  onChange: (v: string) => void;
};

export const BtnGroup: FC<Props> = ({ items, value, name, onChange }) => {
  return (
    <div className={$style['btn-group']}>
      {items.map((item) => (
        <div
          className={cn($style['btn-group__btn'], value === item.value && $style['btn-group__btn_checked'])}
          key={item.value}
        >
          <input
            id={`${name}-${item.value}`}
            type="radio"
            name={name}
            checked={value === item.value}
            value={item.value}
            className={$style['btn-group__input']}
            onChange={(e) => onChange(e.target.value)}
            disabled={item.loading}
          />
          <label htmlFor={`${name}-${item.value}`} className={$style['btn-group__label']}>
            {item.title}
            {item.loading && <Icon name="spinner" className={$style['btn-group__icon']} />}
          </label>
        </div>
      ))}
    </div>
  );
};
