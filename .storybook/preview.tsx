import type { Preview } from "@storybook/react";
import React, { FC, PropsWithChildren, useContext, useEffect } from "react";
import { type Theme, ThemeContext, ThemeProvider } from '../src/app/theme';
import { I18nContext, I18nProvider } from '../src/app/i18n';
import { ELang } from "../src/app/i18n/const";

const globalTypes = {
  locale: {
    name: 'Locale',
    defaultValue: ELang.RU,
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: ELang.EN, title: 'English' },
        { value: ELang.RU, title: 'Russian' },
      ],
      showName: true,
    },
  },
  theme: {
    name: 'Theme',
    defaultValue: 'light',
    description: 'Theme',
    toolbar: {
      icon: 'document',
      items: [
        { value: 'light', title: 'Светлая' },
        { value: 'dark', title: 'Темная' },
      ],
      showName: true,
    },
  },
};

const SbLayout: FC<PropsWithChildren & { locale: ELang, theme: Theme }> = ({children, theme, locale}) => {
  const { setTheme } = useContext(ThemeContext);
  useEffect(() => {
    setTheme(theme);
  }, [theme]);
  const { setLang } = useContext(I18nContext);
  useEffect(() => {
    setLang(locale);
  }, [locale]);  
  return (
    <>
      {children}
    </>
  )
};

const preview: Preview = {
  decorators: [
    (Story, { globals }) => {
      const { locale, theme } = globals;
      return (
        <I18nProvider>
          <ThemeProvider>
            <SbLayout locale={locale} theme={theme} >
              <Story />
            </SbLayout>
          </ThemeProvider>
        </I18nProvider>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes,
};

export default preview;
