import Fetch from "../core/Fetch";
import {PasswordProps} from "../services/usersService";

export const usersAPI = {
  changeUserProfile(data: UserData): Promise<XMLHttpRequest> {
    return Fetch.put(`user/profile`, {
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  },
  changeUserAvatar(data: FormData): Promise<XMLHttpRequest> {
    return Fetch.put(`user/profile/avatar`, {
      data: data,
    });
  },
  changePassword(data: PasswordProps): Promise<XMLHttpRequest> {
    return Fetch.put(`user/password`, {
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  },
  getUserById(id: number): Promise<XMLHttpRequest> {
    return Fetch.put(`user/${id}`, {});
  },
}
