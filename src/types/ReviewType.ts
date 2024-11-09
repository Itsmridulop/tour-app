export interface ReviewType {
    rating: number;
    _id?: string
    review: string;
    createdAt?: string;
 user?: {_id: string};
    tourId?: string
}

export interface TourReviewType {
    rating: number;
    review: string;
    user: {
        _id: string;
        name: string;
        photo: string;
    },
    createdAt: string;
    tour: string;
    _id: string
}

export interface ReviewReturnType {
    status: string;
    data: {
        rating: number;
        review: string;
        user: string;
        tour: string;
        createdAt: string;
        id: string
    }
}