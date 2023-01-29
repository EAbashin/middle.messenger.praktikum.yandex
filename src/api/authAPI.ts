import Fetch from "../core/Fetch";

type LoginRequestData = {
  login: string;
  password: string;
};

export const authAPI = {
  singup(data: UserData): Promise<XMLHttpRequest> {
    return Fetch.post(`auth/signup`, {
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    });
  },
  singin(data: LoginRequestData): Promise<XMLHttpRequest> {
    return Fetch.post(`auth/signin`, {
      data: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    });
  },
  getUserInfo(): Promise<XMLHttpRequest> {
    return Fetch.get(`auth/user`, {});
  },
  logout() {
    return Fetch.post(`auth/logout`, {});
  }
}
