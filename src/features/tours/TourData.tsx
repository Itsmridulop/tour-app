import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaStar, FaDollarSign, FaMountain, FaPaperPlane, FaEdit, FaTrash } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useTour } from "./useTour";
import { useParams } from "react-router-dom";
import { ReviewType } from "../../types/ReviewType";
import { UserDataType } from "../../types/userType";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Spinner from "../../component/Spinner";
import Images from "./Images";
import Guides from "./Guides";
import Reviews from "./Reviews";

L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
});

export default function TourData() {
    const { id } = useParams()
    const { tourData, isLoading } = useTour(id || "")

    if (isLoading) return <Spinner />

    const position: [number, number] = [tourData?.data.startLocation.coordinates[1] ?? 0, tourData?.data.startLocation.coordinates[0] ?? 0];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                    <img
                        src={`/src/public/img/tours/${tourData?.data.imageCover}`}
                        alt={tourData?.data.name}
                        className="rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white">{tourData?.data.name}</h1>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 border border-green-600 rounded">
                            <FaClock className="mr-1" /> {tourData?.data.duration} days
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded">
                            <FaMapMarkerAlt className="mr-1" /> {tourData?.data.startLocation.description}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-purple-600 border border-purple-600 rounded">
                            <FaUsers className="mr-1" /> Max {tourData?.data.maxGroupSize} people
                        </span>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-600 border border-yellow-600 rounded">
                            <FaMountain className="mr-1" /> {tourData?.data.difficulty ?
                                tourData.data.difficulty.charAt(0).toUpperCase() + tourData.data.difficulty.slice(1)
                                : 'Not specified'}
                        </span>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold">Tour Overview</h2>
                            <p className="mt-2 text-gray-700">{tourData?.data.summary}</p>
                            <div className="mt-4 flex items-center">
                                <FaStar className="mr-1 text-yellow-500" />
                                <span className="font-bold">{tourData?.data.ratingsAverage}</span>
                                <span className="ml-1 text-gray-500">({tourData?.data.ratingsQuantity} reviews)</span>
                            </div>
                            <div className="mt-2 flex items-center">
                                <FaDollarSign className="mr-1 text-green-500" />
                                <span className="text-2xl font-bold">{tourData?.data.price}</span>
                                <span className="ml-1 text-gray-500">per person</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Tour Description</h2>
                            <p className="mt-2 text-gray-700">{tourData?.data.description}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Start Location</h2>
                        <p className="mt-2 text-gray-700">{tourData?.data.startLocation.address}</p>
                        <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <MapContainer center={position} zoom={17} className="w-full h-full">
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={position} icon={customMarkerIcon}>
                                    <Popup>{tourData?.data.startLocation.address}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    {tourData?.data.images && <Images images={tourData?.data.images}
                        renderImage={(image: string, index: number) => (
                            <img
                                src={`/src/public/img/tours/${image}`}
                                alt={`Tour image ${index + 1}`}
                                className="transition-transform duration-300 hover:scale-110"
                            />
                        )}
                    />}

                    <Guides
                        guides={tourData?.data.guides}
                        renderGuide={(guide: UserDataType) => (
                            <>
                                <img
                                    src={`/src/public/img/users/${guide.photo ?? 'default.jpg'}`}
                                    alt={guide.name}
                                    className="h-10 w-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold">{guide.name}</p>
                                    <p className="text-sm text-gray-500">{guide.role}</p>
                                </div>
                            </>
                        )}
                    />

                    <Reviews
                        reviews={tourData?.data.reviews}
                        renderReview={(review: ReviewType) => (
                            <>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500" />
                                    <span className="font-bold ml-1">{review.rating}</span>
                                </div>
                                <p className="mt-2">{review.review}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Reviewed on {new Date(review.createdAt ?? Date.now()).toLocaleDateString()}
                                </p>
                            </>
                        )}
                    />
                </div>

                <div className="flex flex-col items-start p-4">
                    <h2 className="text-lg font-semibold mb-2">Tour Dates</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {tourData?.data.startDates.map((date, index) => (
                            <span
                                key={index}
                                className="flex items-center bg-gray-200 text-primary px-2 py-1 rounded-lg text-sm font-medium"
                            >
                                <FaCalendarAlt className="mr-1 h-3 w-3" />
                                {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        ))}
                    </div>

                    <h2 className="text-lg font-semibold mb-2 mt-6">Tour Locations</h2>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {tourData?.data.locations.map((location, index) => (
                            <div key={index} className="p-2 border border-gray-200 rounded-lg">
                                <h3 className="text-sm font-medium">{location.description}</h3>
                                <p className="text-xs text-gray-600">Day {location.day}</p>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex space-x-4">
                            <button className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition transform hover:scale-105">
                                <FaPaperPlane className="mr-2" />
                                Book Now
                            </button>
                            <button className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition transform hover:scale-105">
                                <FaEdit className="mr-2" />
                                Edit Tour
                            </button>
                            <button className="flex items-center bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition transform hover:scale-105">
                                <FaTrash className="mr-2" />
                                Delete Tour
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}