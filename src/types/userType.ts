export interface UserDataType {
  name: string;
  email: string;
  photo: string;
  role: string;
}

export interface ResponseType {
  status: string;
  token: string;
  // result?: number;
  data: UserDataType;
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