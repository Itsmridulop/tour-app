import { useMutation, useQueryClient } from "@tanstack/react-query"
import { user } from "../../api/userApi"
import { CreateUserType } from "../../types/userType"

import toast from "react-hot-toast"

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    const { mutate: updateUser, isPending } = useMutation({
        mutationFn: ({ userData, id }: { userData: Partial<CreateUserType>; id?: string }) => user.updateUser({ userData, id }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["last-user"]
            })
            toast.success('User data is updated successfully')
        },
        onError: () => {
            toast.error('Failed to update user data')
        }
    })

    return { updateUser, isPending }
}