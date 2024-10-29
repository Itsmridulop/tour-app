import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

const useLogout = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate: logout } = useMutation({
        mutationFn: () => Promise.resolve(auth.logout()),
        onSuccess: () => {
            navigate('/login')
            queryClient.removeQueries()
            toast.success('Logout successfully')
        },
        onError: error => {
            console.error(error)
            toast.error(error.message)
        }
    })
    return { logout }
}

export { useLogout }