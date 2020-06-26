import { ClockFormatOption, LanguageOption, ThemeOption } from '../enums';

export interface Settings {
  username: string;
  theme: ThemeOption;
  clockFormat: ClockFormatOption;
  sendOnCtrlEnter: boolean;
  language: LanguageOption;
}
