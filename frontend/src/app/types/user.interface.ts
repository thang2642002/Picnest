export interface IUser {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface UserLogin<T = undefined> {
  token: string;
  user: IUser;
}
