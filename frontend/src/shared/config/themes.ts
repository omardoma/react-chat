import { createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { ThemeOption } from '../enums';

export const LIGHT_CSS_THEME = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
    type: ThemeOption.Light
  }
});

export const DARK_CSS_THEME = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
    type: ThemeOption.Dark
  }
});

export const DEFAULT_CSS_THEME = LIGHT_CSS_THEME;
