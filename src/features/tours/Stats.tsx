import { useStats } from "./useStats"
import { Card, CardContent, CardHeader, CardTitle } from "@/component/Card"
import { FaStar } from "react-icons/fa"

import Spinner from "@/component/Spinner"

function Stats() {
    const { stats, isLoading } = useStats()

    const difficultyOrder = ["easy", "medium", "difficult"]
    const sortedData = stats?.data.sort((a, b) =>
        difficultyOrder.indexOf(a._id) - difficultyOrder.indexOf(b._id)
    )

    if (isLoading) return <Spinner />

    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Tour Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {sortedData?.map((difficulty) => (
                    <Card key={difficulty._id} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600">
                            <CardTitle className="text-white capitalize">{difficulty._id} Tours</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Average Rating</span>
                                    <div className="flex items-center">
                                        <FaStar className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                                        <span className="font-bold">{difficulty.avgRating.toFixed(1)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Average Price</span>
                                    <span className="font-bold">${difficulty.avgPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Price Range</span>
                                    <span className="font-bold">${difficulty.minPrice} - ${difficulty.maxPrice}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Number of Ratings</span>
                                    <p>{difficulty.numRatings}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Number of Tours</span>
                                    <p>{difficulty.numTours}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default Stats
