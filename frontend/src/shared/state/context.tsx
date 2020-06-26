import React, { createContext, useContext, useEffect } from 'react';

import { DARK_CSS_THEME, LIGHT_CSS_THEME } from '../config/themes';
import { ThemeOption } from '../enums';
import { Settings } from '../types';
import { DispatchAction, State, useGlobalReducer } from './reducer';

type GlobalStateProviderProps = {
  children: (state: State) => React.ReactNode;
  settings: Settings;
};

const GlobalStateContext = createContext<[State, DispatchAction]>([
  {
    cssTheme: null,
    settings: null,
    unreadCount: 0
  },
  () => {}
]);

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = (
  props: GlobalStateProviderProps
) => {
  const { children, settings: initialSettings } = props;
  const [state, dispatch] = useGlobalReducer({
    cssTheme:
      initialSettings.theme === ThemeOption.Dark
        ? DARK_CSS_THEME
        : LIGHT_CSS_THEME,
    settings: initialSettings,
    unreadCount: 0
  });
  const { settings } = state;

  // React to settings changes by updating it in LocalStorage
  // React to language changes by updating the HTML document language
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
    document.documentElement.lang = settings.language;
  }, [settings]);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>
      {children(state)}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): [State, DispatchAction] => {
  return useContext<[State, DispatchAction]>(GlobalStateContext);
};
