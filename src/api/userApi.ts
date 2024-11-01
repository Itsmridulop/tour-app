import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";
import { CreateUserType, UserDataType } from "../types/userType";

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

    public async createUser(userData: CreateUserType): Promise<ResponseType> {
        try {
            const response: AxiosResponse<ResponseType> = await this.api.post('/', userData)
            return response.data
        } catch (error) {
            console.error('Error in creating this user: ', error)
            throw error
        }
    }

    public async deleteUser(id: number): Promise<void> {
        try {
            await this.api.delete(`/${id}`)
        } catch (error) {
            console.error('Error in deleting this user')
            throw error
        }
    }
}

const user = new User()
export { user }
