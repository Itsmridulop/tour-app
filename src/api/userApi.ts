import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";
import { UserDataType } from "../types/userType";

class User {
    private api: AxiosInstance
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:8080/api/v1/users",
            headers: {
                'Content-Type': 'Application/json',
                'Authorization': `Bearer ${auth.gettoken()}`
            }
        })
    }

    public async getUsers(): Promise<{status: string; data:UserDataType; result: number}> {
        try {
            const response: AxiosResponse<{status: string; result: number; data: UserDataType}> =await this.api.get('/')
            return response.data
        } catch (error) {
            console.error('Error in getting users: ', error)
            throw error
        }
    }
}

const user = new User()
export { user }
