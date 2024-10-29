import { useMutation, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../api/authApi"
import { useNavigate } from "react-router-dom"

import toast from "react-hot-toast"

const useLogin = () => {
    const navigate = useNavigate()
    const queryCleint = useQueryClient()

    const { mutate: login } = useMutation({
        mutationFn: (data: { email: string; password: string }) => auth.login(data),
        onSuccess: data => {
            toast.success('Login Successfully')
            queryCleint.setQueryData(['user'], data)
            navigate('/', {
                replace: true
            })
        },
        onError: error => {
            console.error("error")
            toast.error(error.message)
        }
    })
    return { login }
}

export { useLogin }