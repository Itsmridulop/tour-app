import { review } from "@/api/reviewApi"
import { ReviewReturnType, ReviewType } from "@/types/ReviewType"
import { useMutation } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateReviews = () => {
    const { mutate: createReview, isPending } = useMutation({
        mutationFn: (reviewData: ReviewType) => review.createReviews(reviewData),
        onSuccess: (data) => {
            toast.success('Your review is added successfully')
            return data
        },
        onError: error => {
            toast.error('Failed to add review')
            throw error
        }
    })

    const createReviewWithCallback = (reviewData: ReviewType, onSuccess?: (data: ReviewReturnType) => void) => {
        createReview(reviewData,  {
            onSuccess: (data) => {
                if (onSuccess) onSuccess(data);
            },
        })

    }
    return { createReview: createReviewWithCallback, isPending }
}