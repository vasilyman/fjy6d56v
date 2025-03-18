import React, { createContext, FC, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
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

  const appRef = useRef(document.querySelector('#root'));

  useEffect(() => {
    if (!appRef.current) throw new Error('theme provider cant find root element');

    const el = appRef.current;

    el.classList.toggle(themeClass.theme, true);

    return () => {
      el.classList.toggle(themeClass.theme, false);
    };
  }, [themeClass]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
