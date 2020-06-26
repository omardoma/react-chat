import {
  Action,
  UpdateUsernameAction,
  UpdateThemeAction,
  UpdateClockFormatAction,
  UpdateSendOnCtrlEnterAction,
  UpdateLanguageAction,
  ResetSettingsAction,
  IncrementUnreadCountAction,
  ClearUnreadCountAction
  // AddMessageAction
} from './actions';

export const isUpdateUsernameAction = (
  action: Action
): action is UpdateUsernameAction => {
  return action.type === 'UPDATE_USERNAME';
};

export const isUpdateThemeAction = (
  action: Action
): action is UpdateThemeAction => {
  return action.type === 'UPDATE_THEME';
};

export const isUpdateClockFormatAction = (
  action: Action
): action is UpdateClockFormatAction => {
  return action.type === 'UPDATE_CLOCK_FORMAT';
};

export const isUpdateSendOnCtrlEnterAction = (
  action: Action
): action is UpdateSendOnCtrlEnterAction => {
  return action.type === 'UPDATE_SEND_ON_CTRL_ENTER';
};

export const isUpdateLanguageAction = (
  action: Action
): action is UpdateLanguageAction => {
  return action.type === 'UPDATE_LANGUAGE';
};

export const isResetSettingsAction = (
  action: Action
): action is ResetSettingsAction => {
  return action.type === 'RESET_SETTINGS';
};

export const isIncrementUnreadCountAction = (
  action: Action
): action is IncrementUnreadCountAction => {
  return action.type === 'INCREMENT_UNREAD_COUNT';
};

export const isClearUnreadCountAction = (
  action: Action
): action is ClearUnreadCountAction => {
  return action.type === 'CLEAR_UNREAD_COUNT';
};

// export const isAddMessageAction = (
//   action: Action
// ): action is AddMessageAction => {
//   return action.type === 'ADD_MESSAGE';
// };
