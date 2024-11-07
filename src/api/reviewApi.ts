import { ReviewReturnType, ReviewType } from "@/types/ReviewType";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { auth } from "./authApi";

class Review {
    private api: AxiosInstance
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:8080/api/v1',
            headers: {
                'Content-Type': 'Application/json'
            }
        })
    }

    public async createReviews(reviewData: ReviewType): Promise<ReviewReturnType> {
        try {
            const response: AxiosResponse<ReviewReturnType> = await this.api.post(`/tours/${reviewData.tourId}/reviews`, {
                review: reviewData.review,
                rating: reviewData.rating
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.gettoken()}`
                }
            })
            return response.data
        } catch (error) {
            console.error('Error in create your review', error)
            throw error
        }
    }
}

const review = new Review()
export { review }