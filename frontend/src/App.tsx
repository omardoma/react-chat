import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { SocketIOProvider } from 'use-socketio';

import { ChatContainer } from './containers';
import { NavBar } from './shared/components';

import { GlobalStateProvider } from './shared/state';
import { DEFAULT_SETTINGS, SOCKET_SERVER_URL } from './shared/config';
import { Settings } from './shared/types';
import translations from './shared/config/i18n';
import { ThemeOption } from './shared/enums';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  }
});

function App(): JSX.Element {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery<boolean>(
    '(prefers-color-scheme: dark)'
  );
  const [settings, setSettings] = useState<Settings>(null);

  const loadSettings = (): void => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    } else if (prefersDarkMode) {
      setSettings({ ...DEFAULT_SETTINGS, theme: ThemeOption.Dark });
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
  };

  // Load settings from localStorage on initial component mount only and not on re-renders
  useEffect(() => {
    loadSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Don't render the app until we load the settings from localStorage
  if (!settings) {
    return null;
  }

  return (
    <GlobalStateProvider settings={settings}>
      {(globalState) => (
        <IntlProvider
          locale={globalState.settings.language}
          messages={translations[globalState.settings.language]}
        >
          <ThemeProvider theme={globalState.cssTheme}>
            <CssBaseline />
            <SocketIOProvider url={SOCKET_SERVER_URL}>
              <Router>
                <div className={classes.root}>
                  <NavBar />
                  <main className={classes.main}>
                    <ChatContainer />
                  </main>
                </div>
              </Router>
            </SocketIOProvider>
          </ThemeProvider>
        </IntlProvider>
      )}
    </GlobalStateProvider>
  );
}

export default App;
