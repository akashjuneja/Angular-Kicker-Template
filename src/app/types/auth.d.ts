export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface UserRole extends User {
  role: string;
}

export interface LoginPayload {
  username: string;
  password: string;
  expiresInMins: number;
}
