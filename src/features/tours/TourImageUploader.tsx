import React, { Dispatch, SetStateAction } from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from "../../component/Label"
import { Input } from "../../component/Input"
import { Button } from "../../component/Button"
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { CreateTourType } from '@/types/tourTypes';

interface TourImagesUploadProps {
    control: Control<CreateTourType>;
    imagesArr?: (File | string)[]; 
    setter: Dispatch<SetStateAction<(string | File)[] | undefined>>
}

const TourImagesUpload: React.FC<TourImagesUploadProps> = ({ control, imagesArr, setter }) => {

    const handleImageChange = (index: number, file: File | string) => {
        const updatedImages = [...imagesArr || []];
        updatedImages[index] = file;
        setter(updatedImages);
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = imagesArr?.filter((_, i) => i !== index);
        setter(updatedImages);
    };

    const handleAddImage = () => {
        setter([...imagesArr || [], new File([], '')]); 
    };

    return (
        <div className="space-y-4">
            <Label>Tour Images</Label>
            {imagesArr?.map((image, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <Controller
                        name={`images.${index}`}
                        control={control}
                        render={() => (
                            <>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                const file = e.target.files[0];
                                                handleImageChange(index, file); 
                                            }
                                        }}
                                        className="border rounded-md p-2"
                                    />

                                    {image && typeof image === 'string' && image.length > 0 && (
                                        <img
                                            src={`/src/public/img/tours/${image}`}
                                            alt={`Image ${index + 1}`}
                                            className="h-10 w-10 object-cover rounded-md border border-gray-300"
                                        />
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDeleteImage(index)} 
                                >
                                    <MinusCircledIcon className="h-4 w-4" />
                                </Button>
                            </>
                        )}
                    />
                </div>
            ))}
            <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddImage} 
                className="flex items-center space-x-2"
            >
                <PlusCircledIcon className="h-4 w-4" />
                <span>Add Image</span>
            </Button>
        </div>
    );
};

export default TourImagesUpload;
