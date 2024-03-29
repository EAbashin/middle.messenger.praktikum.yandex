import { UserData } from 'api/types';

export const transformUser = (data: UserData): User => ({
  id: data.id,
  login: data.login,
  firstName: data.first_name,
  secondName: data.second_name,
  displayName: data.display_name,
  avatar: data.avatar,
  phone: data.phone,
  email: data.email,
});
