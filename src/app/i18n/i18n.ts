import i18n, { use, init, type InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ELang } from './const';
import ru from './translations/ru-RU';
import en from './translations/en-EN';

// pass the i18n instance to react-i18next
use(initReactI18next);

export const resources = {
  [ELang.RU]: {
    translation: ru,
  },
  [ELang.EN]: {
    translation: en,
  },
};

// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
init({
  resources,
  fallbackLng: ELang.RU,
  debug: true,
  // interpolation: {
  //   escapeValue: false, // not needed for react as it escapes by default
  // },
} as InitOptions);

export default i18n;
