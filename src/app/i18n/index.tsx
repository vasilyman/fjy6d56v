import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import { ELang } from './const';
import './i18n';
import { useTranslation } from 'react-i18next';

type I18nContext = {
  lang: ELang;
  setLang: (s: ELang) => void;
};

export const I18nContext = createContext<I18nContext>(null);

export const I18nProvider: FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<ELang>(i18n.language as ELang);
  const changeLang = (lang: ELang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
  };

  return <I18nContext.Provider value={{ lang, setLang: changeLang }}>{children}</I18nContext.Provider>;
};
