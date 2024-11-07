import { review } from "@/api/reviewApi"
import { ReviewType } from "@/types/ReviewType"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateReviews = () => {
    const queryClient = useQueryClient()
    const { mutate: createReview, isPending } = useMutation({
        mutationFn: (reviewData: ReviewType) => review.createReviews(reviewData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tour'] })
            toast.success('Your review is added successfully')
        },
        onError: () => {
            toast.error('Failed to add review')
        }
    })
    return { createReview, isPending }
}