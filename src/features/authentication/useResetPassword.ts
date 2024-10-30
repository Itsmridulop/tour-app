import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"

import toast from "react-hot-toast";

export const useResetPassword = () => {
    const queryClient = useQueryClient()

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: (data: { token?: string; password: string; confirmPassword: string }) => auth.resetPassword(data),
        onSuccess: () => {
            toast.success('Password reset successfully')
            queryClient.invalidateQueries({
                queryKey: ['user'],
            })
        },
        onError: (error) => {
            toast.error(error.message)
            console.error(error)
        },
    })

    return { resetPassword, isPending }
}