import React from 'react';

import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl';

import { useGlobalState } from '../../shared/state';
import {
  ThemeOption,
  ClockFormatOption,
  LanguageOption
} from '../../shared/enums';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '1rem'
  },
  formControl: {
    marginBottom: '1.5rem'
  },
  resetButton: {
    marginTop: 'auto'
  }
});

function Settings(): JSX.Element {
  const classes = useStyles();
  const { formatMessage: f } = useIntl();
  const [state, dispatch] = useGlobalState();
  const {
    username,
    theme,
    clockFormat,
    sendOnCtrlEnter,
    language
  } = state.settings;
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_USERNAME', username: event.target.value });
  };
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_THEME', theme: event.target.value as any });
  };
  const handleClockFormatChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'UPDATE_CLOCK_FORMAT',
      clockFormat: event.target.value as any
    });
  };
  const handleSendOnCtrlEnterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: 'UPDATE_SEND_ON_CTRL_ENTER',
      sendOnCtrlEnter: event.target.value === 'true'
    });
  };
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch({ type: 'UPDATE_LANGUAGE', language: event.target.value as any });
  };
  const handleResetClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: 'RESET_SETTINGS' });
  };
  return (
    <form
      className={classes.root}
      onReset={handleResetClick}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="username"
        name="username"
        className={classes.formControl}
        label={f({ id: 'settings.form.username.label' })}
        variant="standard"
        value={username}
        onChange={handleUsernameChange}
      />
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">
          {f({ id: 'settings.form.theme.label' })}
        </FormLabel>
        <RadioGroup
          row
          aria-label={f({ id: 'settings.form.theme.label' })}
          name="theme"
          value={theme}
          onChange={handleThemeChange}
        >
          <FormControlLabel
            value={ThemeOption.Light}
            control={<Radio />}
            label={f({ id: 'settings.form.theme.options.light' })}
          />
          <FormControlLabel
            value={ThemeOption.Dark}
            control={<Radio />}
            label={f({ id: 'settings.form.theme.options.dark' })}
          />
        </RadioGroup>
      </FormControl>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">
          {f({ id: 'settings.form.clockFormat.label' })}
        </FormLabel>
        <RadioGroup
          row
          aria-label={f({ id: 'settings.form.clockFormat.label' })}
          name="clockFormat"
          value={clockFormat}
          onChange={handleClockFormatChange}
        >
          <FormControlLabel
            value={ClockFormatOption.TwelveHours}
            control={<Radio />}
            label={f({ id: 'settings.form.clockFormat.options.hh' })}
          />
          <FormControlLabel
            value={ClockFormatOption.TwentyFourHours}
            control={<Radio />}
            label={f({ id: 'settings.form.clockFormat.options.HH' })}
          />
        </RadioGroup>
      </FormControl>
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">
          {f({ id: 'settings.form.sendOnCtrlEnter.label' })}
        </FormLabel>
        <RadioGroup
          row
          aria-label={f({ id: 'settings.form.sendOnCtrlEnter.label' })}
          name="sendOnCtrlEnter"
          value={sendOnCtrlEnter}
          onChange={handleSendOnCtrlEnterChange}
        >
          <FormControlLabel
            value
            control={<Radio />}
            label={f({ id: 'settings.form.sendOnCtrlEnter.options.on' })}
          />
          <FormControlLabel
            value={false}
            control={<Radio />}
            label={f({ id: 'settings.form.sendOnCtrlEnter.options.off' })}
          />
        </RadioGroup>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormLabel id="language-label" component="legend">
          {f({ id: 'settings.form.language.label' })}
        </FormLabel>
        <Select
          labelId="language-label"
          id="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <MenuItem value={LanguageOption.English}>English</MenuItem>
          <MenuItem value={LanguageOption.German}>German</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="reset"
        className={classes.resetButton}
        variant="contained"
        color="primary"
      >
        {f({ id: 'settings.form.resetButton' })}
      </Button>
    </form>
  );
}

export default Settings;
