export interface AuthResponse {
  ok: boolean;
  msg?: string;
  user: User;
  token?: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role: string;
  state: boolean;
}
