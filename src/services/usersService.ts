import { apiHasError } from '../utils';
import { usersAPI } from '../api/usersAPI';
import { transformUser } from '../utils/transformUser';

export interface PasswordProps {
  oldPassword: string,
  newPassword: string
}

export const changeUserProfile: DispatchStateHandler<UserData> = async (dispatch, _state, action) => {
  const response = await usersAPI.changeUserProfile(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch({ errorOpacity: 1, formError: response.reason });
    return;
  }
  dispatch({ user: transformUser(response as UserData) });
  alert('Data changed successfully');
};

export const changePassword: DispatchStateHandler<PasswordProps> = async (dispatch, _state, action) => {
  const response = await usersAPI.changePassword(action).then(r => {
    if (r.status === 200) {
      return '';
    }
    return JSON.parse(r.responseText);
  }).catch(err => console.log(err));
  if (apiHasError(response)) {
    dispatch({ formError: response.reason });
    setTimeout(() => dispatch({ formError: '' }), 2000);
    return;
  }
  alert('Data changed successfully');
};
