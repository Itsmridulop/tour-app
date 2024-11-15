export interface CreateBookingType {
    members: number;
    tourId?: string
}

export interface ReponseBookingType {
    status: string,
    data: {
        tour: string,
        user: string,
        members: number,
        createdAt: Date,
        paid: boolean
    }
}