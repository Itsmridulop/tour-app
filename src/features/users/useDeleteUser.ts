import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"
import toast from "react-hot-toast"

export const useDeleteUser = () => {
    const queryClient = useQueryClient()

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (id: number) => user.deleteUser(id),
        onSuccess: () => {
            toast.success('User is deleted successfully')
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        },
        onError: () => {
            toast.error('Error in deleting this user')
        }
    })
    
    return { deleteUser, isPending }
}