import { useTours } from "./useTours";
import type { TourType } from "../../types/tourTypes";
import { useState } from "react";
import { useCreateTour } from "./useCreateTour";

import TourCard from "./TourCard";
import Spinner from "../../component/Spinner";
import Modal from "@/component/Modal";
import TourEditForm from "./EditTourForm";
import Filter from "@/component/Filter";

function Tour() {
    const [queryStr, setQueryStr] = useState<string>(" ")

    const { tours, isLoading } = useTours(queryStr);
    const { createTour } = useCreateTour();

    const handleFilterChange = (newQueryStr: string) => {
        setQueryStr(newQueryStr);
    };


    if (isLoading) return <Spinner />;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex justify-between items-center w-full px-4 py-6">
                <Filter onFilterChange={handleFilterChange} />
                <Modal>
                    <Modal.Open opens="createTour">
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-green-700 transition-colors"
                        >
                            Create New Tour
                        </button>
                    </Modal.Open>
                    <Modal.Window name="createTour">
                        <TourEditForm updationFn={createTour} title="Create Tour" />
                    </Modal.Window>
                </Modal>
            </div>
            <main className="flex-grow flex flex-col items-center justify-center text-xl">
                <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {tours?.data && tours.data.map((tour: TourType) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Tour;
