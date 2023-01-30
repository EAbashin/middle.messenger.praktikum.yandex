import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import {authAPI} from "../api/authAPI";
import {chatsAPI} from "../api/chatsAPI";

export async function initApp(dispatch: Dispatch<AppState>) {

  try {
    const user = await authAPI.getUserInfo().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
    if (apiHasError(user)) {
      return;
    }
    const chats = await chatsAPI.getChats().then(r => {
      if (apiHasError(r)) {
        return [];
      }
      return JSON.parse(r.responseText);
    }).catch(err => console.log(err));

    dispatch({user: transformUser(user as UserData), chats});
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({appIsInited: true});
  }
}
