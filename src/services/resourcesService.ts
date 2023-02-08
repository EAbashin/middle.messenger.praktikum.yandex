import { apiHasError, transformUser } from '../utils';
import { usersAPI } from '../api/usersAPI';

export const changeAvatar: DispatchStateHandler<FormData> = async (dispatch, _state, action) => {
  const response = await usersAPI.changeUserAvatar(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch({ errorOpacity: 1, loginFormError: response.reason });
    return;
  }
  const user = transformUser(response as UserData);

  dispatch({ user });
};
