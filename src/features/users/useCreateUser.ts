import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"

import toast from "react-hot-toast"

export const useCreateUser = () => {
    const queryClient = useQueryClient()

    const { mutate: createUser, isPending } = useMutation({
        mutationFn: (userData: FormData) => user.createUser(userData),
        onSuccess: () => {
            toast.success('New user created successfully')
            queryClient.invalidateQueries({
                queryKey: ['all-users']
            })
        },
        onError: () => {
            toast.error('Error in creating this user')
        }
    })
    return { createUser, isPending }
}