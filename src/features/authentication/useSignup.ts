import { useMutation } from "@tanstack/react-query"
import { SignupUserType } from "../../types/userType"
import { auth } from "../../api/signupApi"

const useSignup = () => {
    const { mutate: signup } = useMutation({
        mutationFn: (userData: Partial<SignupUserType>) => auth.signup(userData),
        onSuccess: () => {
            console.log('success')
        },
        onError: () => {
            console.log('error')
        }
    })
    return { signup }
}

export { useSignup }