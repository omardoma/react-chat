import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { ThemeProvider } from '@material-ui/core/styles';
import { IntlProvider } from 'react-intl';

import { DEFAULT_CSS_THEME } from '../src/shared/config/themes';
import { DEFAULT_SETTINGS } from '../src/shared/config';
import i18n from '../src/shared/config/i18n';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={DEFAULT_CSS_THEME}>
      <IntlProvider
        locale={DEFAULT_SETTINGS.language}
        messages={i18n[DEFAULT_SETTINGS.language]}
      >
        {children}
      </IntlProvider>
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options?: any): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render method
export { customRender as render };
