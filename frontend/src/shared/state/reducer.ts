import { Dispatch, ReducerAction, useReducer } from 'react';

import { Theme } from '@material-ui/core/styles';
import produce from 'immer';

import { DEFAULT_SETTINGS } from '../config';
import {
  DARK_CSS_THEME,
  DEFAULT_CSS_THEME,
  LIGHT_CSS_THEME
} from '../config/themes';
import { ThemeOption } from '../enums';
import { Settings } from '../types';
import { Action } from './actions';
import {
  isClearUnreadCountAction,
  isIncrementUnreadCountAction,
  isResetSettingsAction,
  isUpdateClockFormatAction,
  isUpdateLanguageAction,
  isUpdateSendOnCtrlEnterAction,
  isUpdateThemeAction,
  isUpdateUsernameAction
} from './type-guards';

export type State = {
  cssTheme: Theme;
  settings: Settings;
  unreadCount: number;
};

type Reducer = (state: State, action: Action) => State;

export type DispatchAction = Dispatch<ReducerAction<Reducer>>;

const reducer: Reducer = (state: State, action: Action) => {
  if (isUpdateUsernameAction(action)) {
    return produce(state, (draftState) => {
      draftState.settings.username = action.username;
    });
  }

  if (isUpdateThemeAction(action)) {
    return {
      ...state,
      cssTheme: {
        ...(action.theme === ThemeOption.Dark
          ? DARK_CSS_THEME
          : LIGHT_CSS_THEME)
      },
      settings: {
        ...state.settings,
        theme: action.theme
      }
    };
  }

  if (isUpdateClockFormatAction(action)) {
    return produce(state, (draftState) => {
      draftState.settings.clockFormat = action.clockFormat;
    });
  }

  if (isUpdateSendOnCtrlEnterAction(action)) {
    return produce(state, (draftState) => {
      draftState.settings.sendOnCtrlEnter = action.sendOnCtrlEnter;
    });
  }

  if (isUpdateLanguageAction(action)) {
    return produce(state, (draftState) => {
      draftState.settings.language = action.language;
    });
  }

  if (isResetSettingsAction(action)) {
    return {
      ...state,
      cssTheme: { ...DEFAULT_CSS_THEME },
      settings: { ...DEFAULT_SETTINGS, username: state.settings.username }
    };
  }

  if (isIncrementUnreadCountAction(action)) {
    return produce(state, (draftState) => {
      draftState.unreadCount++;
    });
  }

  if (isClearUnreadCountAction(action)) {
    return produce(state, (draftState) => {
      draftState.unreadCount = 0;
    });
  }

  return state;
};

export const useGlobalReducer = (
  initialState: State
): [State, DispatchAction] => {
  return useReducer<Reducer>(reducer, initialState);
};
