import 'i18next';
import { ELang } from 'src/app/i18n/const';
import { resources } from 'src/app/i18n/i18n';

const en = resources[ELang.EN];

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
