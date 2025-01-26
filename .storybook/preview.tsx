import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from '../src/app/theme';
import { I18nProvider } from '../src/app/i18n';

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nProvider>
        <ThemeProvider><Story /></ThemeProvider>
      </I18nProvider>
    ),
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
};

export default preview;
