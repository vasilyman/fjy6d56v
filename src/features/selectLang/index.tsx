import React, { FC, useContext } from 'react';
import clsx from 'clsx';
import $style from './style.module.scss';
import { I18nContext } from '../../app/i18n';
import { ELang } from '../../app/i18n/const';

export type SelectLang = {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export const SelectLang: FC<SelectLang> = ({ className }) => {
  const { lang, setLang } = useContext(I18nContext);

  return (
    <div className={clsx($style['select-lang'], className)}>
      <button
        className={clsx($style['select-lang_button'], { [$style['select-lang_button_active']]: lang === ELang.RU })}
        type="button"
        onClick={() => setLang(ELang.RU)}
      >
        RU
      </button>
      <button
        className={clsx($style['select-lang_button'], { [$style['select-lang_button_active']]: lang === ELang.EN })}
        type="button"
        onClick={() => setLang(ELang.EN)}
      >
        EN
      </button>
    </div>
  );
};
