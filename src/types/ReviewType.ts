export interface ReviewType {
    rating: number;
    review: string;
    createdAt?: string;
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
    id: string
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


// [
//     {
//         "_id": "672d0e93cdc2f89cac521f8a",
//         "rating": 3,
//         "review": "dsadsadsafads",
//         "user": {
//             "_id": "5c8a1dfa2f8fb814b56fa181",
//             "name": "Lourdes Browning",
//             "photo": "user-2.jpg"
//         },
//         "tour": "6729200efc60a5db5747f40e",
//         "createdAt": "2024-11-07T19:01:39.704Z",
//         "id": "672d0e93cdc2f89cac521f8a"
//     }
// ]