import React from "react";
import { ReviewType } from "../../types/ReviewType";

interface ReviewSectionProps {
    reviews?: ReviewType[];
    renderReview: (review: ReviewType) => React.ReactNode;
}

const Reviews: React.FC<ReviewSectionProps> = ({ reviews, renderReview }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Review</h2>
            <div className="bg-gray-100 p-4 rounded-lg mt-2">
                {(reviews && reviews.length > 0) ? (
                    renderReview(reviews[0]) 
                ) : (
                    <p>No reviews yet</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;