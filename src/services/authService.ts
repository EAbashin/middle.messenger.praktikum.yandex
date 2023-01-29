import {transformUser} from 'utils/transformUser';
import {chatsAPI} from "../api/chatsAPI";
import {authAPI} from "../api/authAPI";
import {apiHasError} from "../utils";

interface LoginPayload {
  login: string;
  password: string;
}

export const singin: DispatchStateHandler<LoginPayload> = async (dispatch, _state, action) => {
  const response = await authAPI.singin(action).then(r => {
    if (r.status === 200) {
      return '';
    }
    return JSON.parse(r.responseText)
  }).catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch({errorOpacity: 1, formError: response.reason});
    return;
  }
  const userInfo = await authAPI.getUserInfo().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  dispatch({errorOpacity: 0, formError: null});
  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  let chats: ChatData[] = window.store.getState().chats || [];
  const responseChats = await chatsAPI.getChats().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (!apiHasError(response)) {
    chats = responseChats;
  }
  dispatch({user: transformUser(userInfo as UserData), chats});
  window.router.go('/messenger');
};

export const singup: DispatchStateHandler<UserData> = async (dispatch, _state, action) => {
  const response = await authAPI.singup(action)
      .then(r => JSON.parse(r.responseText))
      .catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch({errorOpacity: 1, formError: response.reason});
    return;
  }
  const userInfo = await authAPI.getUserInfo().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }
  dispatch({user: transformUser(userInfo as UserData)});
  window.router.go('/messenger');
};

export const logout: DispatchStateHandler<undefined> = async (dispatch) => {
  await authAPI.logout().then(r => r.responseText).catch(err => console.log(err));
  dispatch({user: null, chats: null});
  window.router.go('/sign-in');
};
