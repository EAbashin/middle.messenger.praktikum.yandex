import { BlockClass } from 'core';
import MessengerPage from 'pages/messenger';
import SettingsPage from "pages/settings";
import SignUpPage from "pages/sign-up";
import SignInPage from "pages/sign-in";
import ProfilePage from "../pages/profile";
import ChangePasswordPage from "../pages/change-password";

export enum Screens {
  Messenger = 'messenger',
  SignUp = 'sign-up',
  SignIn = 'sign-in',
  Settings = 'settings',
  Profile = 'profile',
  ChangePassword = 'ChangePassword'
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Messenger]: MessengerPage,
  [Screens.SignUp]: SignUpPage,
  [Screens.SignIn]: SignInPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Settings]: SettingsPage,
  [Screens.ChangePassword]: ChangePasswordPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<object> => {
  return map[screen];
};
