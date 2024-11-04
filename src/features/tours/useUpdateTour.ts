import { tour } from "@/api/tourApi"
import {  TourType } from "@/types/tourTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useUpdateTour = () => {
    const queryClient = useQueryClient()

    const {mutate: updateTour, isPending} = useMutation({
        mutationFn: ({tourData, id}:{tourData: TourType , id?: string}) => tour.updateTour(tourData, id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tours', 'tour']
            })
            toast.success('Tour is updated successfully')
        },
        onError: (error) => {
            toast.error(`Failed to update tour: ${error.message}`)
        }
    })

    return {updateTour, isPending}
}