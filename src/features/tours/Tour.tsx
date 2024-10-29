import { useTours } from "./useTours";
import type { Tour } from "../../types/tourTypes";

import TourCard from "./TourCard";
import Spinner from "../../component/Spinner";

function Tour() {
    const { tours, isLoading } = useTours();

    if (isLoading) return <Spinner />;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-grow flex flex-col items-center justify-center text-xl">
                <div className="grid grid-cols-1 mt-32 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {tours?.data && tours.data.map((tour: Tour ) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Tour;
