import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export const useDeleteTour = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: deleteTour, isPending } = useMutation({
        mutationFn: (id: string) => tour.deleteTour(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tours"]
            })
            navigate(-1)
            toast.success('Tour deleted successfully')
        },
        onError: () => {
            toast.error('Error in deleting this tour')
        }
    })

    return { deleteTour, isPending }
}