import { review } from "@/api/reviewApi";
import { useMutation } from "@tanstack/react-query"

import toast from "react-hot-toast";

export const useDeleteReview = () => {
    const {mutate: deleteReview, isPending} = useMutation({
        mutationFn: (data: {tourId: string; reviewId: string}) => review.deleteReview(data.tourId, data.reviewId),
        onSuccess: () => {
            toast.success('Review is deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete review')
        }
    })

    return {deleteReview, isPending}
}