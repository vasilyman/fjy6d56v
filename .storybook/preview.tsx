import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from '../src/app/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider><Story /></ThemeProvider>
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
