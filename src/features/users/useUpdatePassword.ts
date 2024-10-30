import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"
import { UserPasswordType } from "../../types/userType"

import toast from "react-hot-toast"

export const useUpdatePassword = () => {
    const queryClient = useQueryClient()
    const { mutate: updatePassword, isPending } = useMutation({
        mutationFn: (data: UserPasswordType) => auth.updatePassword(data),
        onSuccess: ()  => {
            toast.success('Your Password ain updated successfully')
            queryClient.invalidateQueries({
                queryKey: ['user']
            })
        },
        onError: error => {
            toast.error(error.message)
            console.error(error)
        }
    })
    return { updatePassword, isPending }
}