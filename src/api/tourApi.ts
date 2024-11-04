import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { CreateTourType, TourResponse, TourResponseType } from "../types/tourTypes";
import { auth } from "./authApi";

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

    public async getOneTour(id: string): Promise<TourResponseType> {
        try {
            const response: AxiosResponse<TourResponseType> = await this.api.get(`/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.gettoken()}`
                }
            })
            return response.data
        } catch (error) {
            console.error('Error in getting info of this tour', error)
            throw error
        }
    }

    public async deleteTour(id: string): Promise<void> {
        try {
            await this.api.delete(`/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.gettoken()}`
                }
            })
        } catch (error) {
            console.error('Error in deleting this tour', error)
            throw error
        }
    }

    public async updateTour(tourData: CreateTourType , id?: string): Promise<TourResponse> {
        try {
            const response: AxiosResponse<TourResponse> = await this.api.patch(`/${id}`, tourData, {
                headers: {
                    'Authorization': `Bearer ${auth.gettoken()}`
                }
            })
            return response.data
        } catch (error) {
            console.error('Error in updating data of this tour', error)
            throw error
        }
    }
}

const tour = new Tour()
export { tour }