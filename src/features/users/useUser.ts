import { useQuery } from "@tanstack/react-query"
import { auth } from "../../api/authApi"

const useUser = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: () => auth.getCurrentUser()
    })
    return { user, isLoading }
}

export { useUser }