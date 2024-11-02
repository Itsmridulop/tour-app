export interface UserDataType {
  _id: number;
  name: string;
  email: string;
  photo: string;
  role: string;
  active: boolean
}

export interface ResponseType {
  status: string;
  token: string;
  data: UserDataType;
}

export interface PhotoType {
  [key: number]: {
    name: string
  };
}

export interface CreateUserType {
  name: string;
  role: string;
  password: string;
  confirmPassword: string;
  photo?: PhotoType | string;
  email: string
}

export interface UserPasswordType {
  password: string;
  newPassword: string;
  newPasswordConfirm: string
}