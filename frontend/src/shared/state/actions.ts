import { ClockFormatOption, LanguageOption, ThemeOption } from '../enums';
// import { Message } from '../types';

export type UpdateUsernameAction = {
  type: 'UPDATE_USERNAME';
  username: string;
};

export type UpdateThemeAction = {
  type: 'UPDATE_THEME';
  theme: ThemeOption;
};

export type UpdateClockFormatAction = {
  type: 'UPDATE_CLOCK_FORMAT';
  clockFormat: ClockFormatOption;
};

export type UpdateSendOnCtrlEnterAction = {
  type: 'UPDATE_SEND_ON_CTRL_ENTER';
  sendOnCtrlEnter: boolean;
};

export type UpdateLanguageAction = {
  type: 'UPDATE_LANGUAGE';
  language: LanguageOption;
};

export type ResetSettingsAction = {
  type: 'RESET_SETTINGS';
};

export type IncrementUnreadCountAction = {
  type: 'INCREMENT_UNREAD_COUNT';
};

export type ClearUnreadCountAction = {
  type: 'CLEAR_UNREAD_COUNT';
};

// export type AddMessageAction = {
//   type: 'ADD_MESSAGE';
//   message: Message;
// };

export type Action =
  | UpdateUsernameAction
  | UpdateThemeAction
  | UpdateClockFormatAction
  | UpdateSendOnCtrlEnterAction
  | UpdateLanguageAction
  | ResetSettingsAction
  | IncrementUnreadCountAction
  | ClearUnreadCountAction;
// | AddMessageAction
