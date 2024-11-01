import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ResponseType, UserPasswordType, UserProfileType } from "../types/userType";

class Authenication {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:8080/api/v1/users",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async signup(userData: { name: string; email: string; password: string; confirmPassword: string }): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.post("/signup", userData);
      this.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error while signup", error);
      throw error;
    }
  }

  public async login(userData: { email: string; password: string }): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.post("/login", userData);
      this.saveToken(response.data.token);
      return response.data;
    } catch (error) {
      console.error("Error while login into this account", error);
      throw error;
    }
  }

  public async getCurrentUser(): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.get('/me', {
        headers: {
          'Authorization': `Bearer ${this.gettoken()}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error in getting your info', error)
      throw error
    }
  }

  public async updateProfile(userData: Partial<UserProfileType>): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.patch('/updateMe', userData, {
        headers: {
          'Authorization': `Bearer ${this.gettoken()}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Error in update your profile', error)
      throw error
    }
  }

  public async updatePassword(passwordData: UserPasswordType): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.patch('/updatePassword', passwordData, {
        headers: {
          'Authorization': `Bearer ${this.gettoken()}`
        }
      })
      this.removeToken()
      this.saveToken(response.data.token)
      return response.data
    } catch (error) {
      console.error('Error in update your password', error)
      throw error
    }
  }

  public async forgotPassword(data: {email: string}): Promise<{status: string; message: string }> {
    try {
      const response: AxiosResponse<{status: string; message: string}> = await this.api.post('/forgotPassword', data)
      return response.data
    } catch (error) {
      console.error('Error while resettting your pasworrd', error)
      throw error
    }
  }

  public async resetPassword(data: {token?: string; password: string; confirmPassword: string}): Promise<ResponseType> {
    try {
      const response: AxiosResponse<ResponseType> = await this.api.patch(`/resetPassword/${data.token}`, {
        password: data.password,
        confirmPassword: data.confirmPassword
      })
      return response.data
    } catch (error) {
      console.error('Error while resetting your password', error)
      throw error
    }
  }

  public logout(): void {
    this.removeToken();
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  }

  public saveToken(token: string): void {
    localStorage.setItem("authToken", token);
  }

  public removeToken(): void {
    localStorage.removeItem("authToken");
  }

  public gettoken(): string | null {
    return localStorage.getItem("authToken");
  }
}

const auth = new Authenication();

export { auth };
