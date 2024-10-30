export interface UserDataType {
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface ResponseType {
  status: string;
  token: string;
  data: UserDataType;
}

export interface UserType {
  status: string;
  data: UserDataType[]
}

export interface UserProfileType {
  name: string;
  photo: string;
}

export interface UserPasswordType {
  password: string;
  newPassword: string;
  newPasswordConfirm: string
}