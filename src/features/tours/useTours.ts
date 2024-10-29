import { useQuery } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"

const useTours = () => {
    const { data: tours, isLoading, isError } = useQuery({
        queryKey: ['tours'],
        queryFn: () => tour.getAllTours()
    })
    return { tours, isLoading, isError }
}

export { useTours }