import { ReviewType } from "./ReviewType";
import { UserDataType } from "./userType";

export interface TourType {
    startLocation: {
        type: string;
        coordinates: [number, number];
        address: string;
        description: string;
    };
    _id: string;
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    summary: string;
    description: string;
    imageCover: string;
    images: string[];
    startDates: string[];
    secretTour: boolean;
    locations: Array<{
        type?: string;
        coordinates?: [number, number];
        description: string;
        day: number;
        _id?: string;
        id?: string;
    }>;
    guides?: UserDataType[];
    slug: string;
    discount?: number;
    reviews: ReviewType[];
    durationWeek: number;
    id: string;
}

export interface CreateTourType {
    startLocation: {
        type?: string;
        coordinates?: [number, number];
        address?: string;
        description?: string;
    };
    _id: string;
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    summary: string;
    description: string;
    imageCover: string | File;
    images?: File[] | string[];
    startDates: string[];
    secretTour: boolean;
    locations: Array<{
        type?: string;
        coordinates?: [number, number];
        description: string;
        day: number;
        _id?: string;
        id?: string;
    }>;
    guides: string[];
    slug: string;
    discount?: number;
    reviews: ReviewType[];
    durationWeek: number;
    id: string;
}

export interface TourResponseType {
    status: string;
    data: TourType;
}

export interface TourResponse {
    status: string;
    results: number;
    data: TourType[];
}

export interface Statstype {
    status: string;
    data: {
        _id: string,
        avgRating: number;
        avgPrice: number;
        minPrice: number;
        maxPrice: number,
        numRatings: number;
        numTours: number;
    }[]
}

export interface MonthlyPlanType {
    status: string;
    results: number;
    data: {
        numTour: number;
        tours: [string];
        month: number
    }[]
}



// {
//     "status": "success",
//     "results": 10,
//     "data": [
//         {
//             "numTour": 1,
//             "tours": [
//                 "The Wine Taster"
//             ],
//             "month": 2
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The City Wanderer",
//                 "The Star Gazer"
//             ],
//             "month": 3
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The Wine Taster",
//                 "The Forest Hiker"
//             ],
//             "month": 4
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The City Wanderer",
//                 "The Park Camper"
//             ],
//             "month": 5
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The Sea Explorer",
//                 "The City Wanderer"
//             ],
//             "month": 6
//         },
//         {
//             "numTour": 3,
//             "tours": [
//                 "The Sea Explorer",
//                 "The Sports Lover",
//                 "The Forest Hiker"
//             ],
//             "month": 7
//         },
//         {
//             "numTour": 1,
//             "tours": [
//                 "The Sea Explorer"
//             ],
//             "month": 8
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The Sports Lover",
//                 "The Wine Taster"
//             ],
//             "month": 9
//         },
//         {
//             "numTour": 2,
//             "tours": [
//                 "The Star Gazer",
//                 "The Forest Hiker"
//             ],
//             "month": 10
//         },
//         {
//             "numTour": 1,
//             "tours": [
//                 "The Northern Lights"
//             ],
//             "month": 12
//         }
//     ]
// }