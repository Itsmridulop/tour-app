export interface LoginUserType {
  email: string;
  password: string;
}

export interface SignupUserType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponseType {
  status: string;
  token: string;
  data: {
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginRespondseType {
  status: string;
  token: string;
}
