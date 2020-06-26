import { ClockFormatOption, ThemeOption, LanguageOption } from '../enums';
import { getUserLanguage, generateId } from '../utils';

const userLanguage = getUserLanguage() as LanguageOption;

const defaultLanguage = Object.values(LanguageOption).includes(userLanguage)
  ? userLanguage
  : LanguageOption.English;

export const DEFAULT_SETTINGS = {
  username: `guest${generateId()}`,
  theme: ThemeOption.Light,
  clockFormat: ClockFormatOption.TwelveHours,
  sendOnCtrlEnter: false,
  language: defaultLanguage
};

export const SOCKET_SERVER_URL = 'http://localhost:3000';
