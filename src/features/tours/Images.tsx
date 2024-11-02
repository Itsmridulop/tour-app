import React from "react";

interface ImageGalleryProps {
    images: string[];
    renderImage: (image: string, index: number) => React.ReactNode;
}

const Images: React.FC<ImageGalleryProps> = ({ images, renderImage }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Tour Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                        {renderImage(image, index)} // Use the render prop here
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Images;
