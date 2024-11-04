import { useQuery } from "@tanstack/react-query"
import { tour } from "../../api/tourApi"

const useTours = (queryStr: string) => {
    const { data: tours, isLoading, isError } = useQuery({
        queryKey: ['tours', queryStr],
        queryFn: () => tour.getAllTours(queryStr)
    })
    return { tours, isLoading, isError }
}

export { useTours }