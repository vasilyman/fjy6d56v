import React, { createContext, FC, PropsWithChildren, useMemo, useState } from 'react';
import $darkStyleModule from './dark.module.scss';
import $lightStyleModule from './light.module.scss';

export type Theme = 'light' | 'dark';

type ThemeContext = {
  theme: Theme;
  setTheme: (s: Theme) => void;
};

export const ThemeContext = createContext<ThemeContext>(null);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  const themeClass: typeof $lightStyleModule | typeof $darkStyleModule = useMemo(
    () => (theme === 'light' ? $lightStyleModule : $darkStyleModule),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={themeClass.theme}>{children}</div>
    </ThemeContext.Provider>
  );
};
