import { useMutation, useQueryClient } from "@tanstack/react-query"
import { UserProfileType } from "../../types/userType"
import { auth } from "../../api/authApi"
import toast from "react-hot-toast"

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    const { mutate: updateProfile, isPending } = useMutation({
        mutationFn: (data: Partial<UserProfileType>) => auth.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            })
            toast.success('Your profile is updated successfully')
        },
        onError: error => {
            console.error(error)
            toast.error(error.message)
        }
    })
    return { updateProfile, isPending }
}