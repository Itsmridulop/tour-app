import { useTours } from "./useTours";
import type { TourType } from "../../types/tourTypes";
import { useState } from "react";
import { useCreateTour } from "./useCreateTour";

import TourCard from "./TourCard";
import Spinner from "../../component/Spinner";
import Modal from "@/component/Modal";
import TourEditForm from "./EditTourForm";
import Filter from "@/component/Filter";
import Sort from "@/component/Sort";

export interface QueryType {
    filterValue: string;
    filterField: string;
    sortBy: string
}

function Tour() {
    const [queryStr, setQueryStr] = useState<QueryType>({ filterField: "", filterValue: "", sortBy: "" });

    const { tours, isLoading } = useTours((queryStr.filterField && queryStr.filterValue) || queryStr.sortBy ? `${queryStr.filterField}`+ (queryStr.filterField === 'difficulty' ? "" : '[lte]') + `=${queryStr.filterValue}&sort=${queryStr.sortBy}` : " ");
    const { createTour } = useCreateTour();

    const handleFilterChange = (query: QueryType) => {
        setQueryStr(query)
    }

    const handleSortChange = (query: QueryType) => {
        setQueryStr(query)
    }

    if (isLoading) return <Spinner />;

    return (
        <div className="flex flex-col min-h-screen text-white">
            <div className="flex justify-between items-center w-full px-4 py-6 shadow-md space-x-4">
                <Filter onFilterChange={handleFilterChange} queryObj={queryStr} />
                <Sort onSortChange={handleSortChange} queryObj={queryStr} />
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

            <main className="flex-grow flex flex-col items-center text-xl p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
                    {tours?.data && tours.data.map((tour: TourType) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Tour;
