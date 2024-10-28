import { useMutation } from "@tanstack/react-query"
import { LoginUserType } from "../../types/userType"
import { auth } from "../../api/signupApi"

const useLogin = () => {
    const { mutate: login } = useMutation({
        mutationFn: (data: LoginUserType) => auth.login(data),
        onSuccess: () => {
            console.log("success")
        },
        onError: () => {
            console.log("error")
        }
    })
    return { login }
}

export { useLogin }