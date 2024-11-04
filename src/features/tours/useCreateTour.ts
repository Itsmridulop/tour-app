import { tour } from "@/api/tourApi"
import { CreateTourType } from "@/types/tourTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import toast from "react-hot-toast"

export const useCreateTour = () => {
    const queryClient = useQueryClient()

    const { mutate: createTour, isPending } = useMutation({
        mutationFn: ({ tourData }: { tourData: CreateTourType }) => tour.createTour(tourData),
        onSuccess: () => {
            toast.success('Tour is added successfully')
            queryClient.invalidateQueries({
                queryKey: ['tours']
            })
        },
        onError: (error) => {
            toast.error(`Error adding tour: ${error.message}`)
        }
    })
    return { createTour, isPending }
}