export interface Tour {
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
        type: string;
        coordinates: [number, number];
        description: string;
        day: number;
        _id: string;
        id: string;
    }>;
    guides: [{
        name: string;
        photo: string;
        email: string
    }] | [string] | undefined;
    slug: string;
    durationWeek: number;
    id: string;
}

export interface TourResponse {
    status: string;
    results: number;
    data: Tour[];
}
