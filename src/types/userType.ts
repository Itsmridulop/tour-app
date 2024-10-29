export interface ResponseType {
  status: string;
  token: string;
  data: {
    name: string;
    email: string;
    role: string;
  };
}