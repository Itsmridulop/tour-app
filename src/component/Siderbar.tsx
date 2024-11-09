import { useState } from "react"
import { Button } from "./Button"
import { FaBars, FaMapMarkerAlt, FaTimes } from "react-icons/fa"
import { ScrollArea } from "./ScrollArea"
import { Card, CardContent, CardHeader, CardTitle } from "./Card"
import { useMonthlyPlan } from "@/features/tours/useMonthlyPlan"

function Siderbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

    const { monthlyPlan } = useMonthlyPlan()
    const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'October', 'November', 'December']

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="icon"
                className="fixed bg-transparent border-transparent top-12 left-5 z-50 hover:bg-transparent"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
                {isSidebarOpen ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
            </Button>

            <aside
                className={`fixed top-0 left-0 h-screen w-80 bg-background border-r shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <ScrollArea className="h-full mt-16">
                    <div className="p-4">
                        <h2 className="text-2xl font-bold mb-4">Monthly Plan</h2>
                        {monthlyPlan?.data.map((data) => (
                            <Card key={data.month} className="mb-4">
                                <CardHeader>
                                    <CardTitle className="capitalize">
                                        {monthArr[data.month - 1]}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">Number of Tours</span>
                                            <span>{data.numTour}</span>
                                        </div>
                                        <div className="space-y-1">
                                            <ul className="space-y-2 mt-2">
                                                {data.tours.map((tour, index) => (
                                                    <li key={index} className="flex items-center gap-2 text-gray-800">
                                                        <FaMapMarkerAlt className="text-gray-500" />
                                                        <span className="text-sm font-medium">{tour}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            </aside>
        </div>
    )
}

export default Siderbar
