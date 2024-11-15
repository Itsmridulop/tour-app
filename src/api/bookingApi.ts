import { CreateBookingType, ReponseBookingType } from "@/types/bookingType";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";

class Booking {
    private api: AxiosInstance
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8080/api/v1/bookings',
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    public async createBooking(bookingData: CreateBookingType): Promise<ReponseBookingType> {
        console.log(bookingData)
        try {
            const response: AxiosResponse<ReponseBookingType> = await this.api.post('/', { members: bookingData.members, tour: bookingData.tourId }, {
                headers: {
                    'Authorization': `Bearer ${auth.gettoken()}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}


const booking = new Booking()
export { booking }