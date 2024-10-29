import axios, { AxiosInstance, AxiosResponse } from "axios";
import { TourResponse } from "../types/tourTypes";

class Tour {
    private api: AxiosInstance

    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:8080/api/v1/tours",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    public async getAllTours(): Promise<TourResponse> {
        try {
            const response: AxiosResponse<TourResponse> = await this.api.get("/");
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }

    }
}

const tour = new Tour()
export { tour }