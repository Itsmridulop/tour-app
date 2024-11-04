import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { Button } from "../../component/Button"
import { Input } from "../../component/Input"
import { Textarea } from "../../component/Textarea"
import { Switch } from "../../component/Switch"
import { Label } from "../../component/Label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../component/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../component/Tabs"
import { ScrollArea } from "../../component/ScrollArea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../component/Accordion"
import { CreateTourType, TourType } from '@/types/tourTypes'
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useUpdateTour } from './useUpdateTour'

import TourImagesUpload from './TourImageUploader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function TourEditForm({ tour, onClose }: { tour?: TourType; onClose?: () => void }) {
    const [images, setImages] = useState<(string | File)[] | undefined>(tour?.images)
    const { control, watch, reset, handleSubmit, register, formState: { errors } } = useForm<CreateTourType | TourType>({
        defaultValues: tour
    })
    const { id } = useParams()
    const { fields: locationFields, append: appendLocation, remove: removeLocation } = useFieldArray({
        control,
        name: "locations"
    })

    const { updateTour } = useUpdateTour()

    const handleFetchLocation = async (address?: string) => {
        const apiKey = 'a225fe80e865411cbcf7de42cc45d59f';
        const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`;

        try {
            const response = await axios.get(url);
            return response.data.features[0].geometry.coordinates
        } catch (error) {
            console.log(error)
        }
    };

    const price = watch("price");

    const onSubmit = async (data: CreateTourType | TourType) => {
        onClose?.()
        const parsedImageObj = images?.map((image) => {
            if (typeof image === 'string') return image;
            else return image.name;
        });


        const locationObj = await Promise.all((tour?.locations || []).map(async location => {
            const coord = await handleFetchLocation(location.description);
            return {
                ...location,
                coordinates: coord
            };
        }));

        const startLocationCoord = await handleFetchLocation(tour?.startLocation.address)
        const startLocaationObj: {
            type?: string;
            coordinates?: [number, number];
            address?: string;
            description?: string;
        } = {
            ...tour?.startLocation,
            coordinates: startLocationCoord
        }
        const tourData: TourType = {
            ...data,
            discount: data.discount && data.discount * 1,
            images: [...parsedImageObj || []],
            locations: [...locationObj || []],
            startLocation: { ...startLocaationObj }
        };
        console.log(tourData)

        updateTour({ tourData, id }, {
            onSettled: () => reset()
        });

    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-[49.49rem] w-[33.125rem] flex flex-col">
            <Card className="flex-grow flex flex-col border-transparent shadow-sm">
                <CardHeader>
                    <CardTitle>Edit Tour: <Controller name="name" control={control} render={({ field }) => <span>{field.value}</span>} /></CardTitle>
                    <CardDescription>Make changes to your tour information here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow overflow-hidden">
                    <Tabs defaultValue="basic" className="h-full flex flex-col">
                        <TabsList className="mb-4">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="dates">Dates</TabsTrigger>
                            <TabsTrigger value="locations">Locations</TabsTrigger>
                            {/* <TabsTrigger value="guides">Guides</TabsTrigger> */}
                        </TabsList>
                        <ScrollArea className="flex-grow">
                            <div className="h-full flex items-center justify-center">
                                <div className="w-full h-full max-w-3xl px-4">
                                    <TabsContent value="basic" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center h-full">
                                        <div className="space-y-4 flex flex-col justify-evenly h-full w-full">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Tour Name</Label>
                                                    <Controller
                                                        name="name"
                                                        control={control}
                                                        defaultValue={tour?.name}
                                                        render={({ field }) => (
                                                            <Input
                                                                {...field}
                                                                {...register("name", {
                                                                    required: "This field is require",
                                                                    min: {
                                                                        value: 10,
                                                                        message: "Name must be at least 10 characters long",
                                                                    },
                                                                    max: {
                                                                        value: 40,
                                                                        message: "Name must not be long from 40 characters long",
                                                                    }
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="duration">Duration (days)</Label>
                                                    <Controller
                                                        name="duration"
                                                        control={control}
                                                        defaultValue={tour?.duration}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                {...register("duration", {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'A tour must have a duration',
                                                                    },
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'Duration must be at least 1 day',
                                                                    },
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="maxGroupSize">Max Group Size</Label>
                                                    <Controller
                                                        name="maxGroupSize"
                                                        control={control}
                                                        defaultValue={tour?.maxGroupSize}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                {...register("maxGroupSize", {
                                                                    required: {
                                                                        value: true,
                                                                        message: 'A tour must have a group size',
                                                                    },
                                                                    min: {
                                                                        value: 1,
                                                                        message: 'Group size must be at least 1',
                                                                    },
                                                                })}
                                                            />
                                                        )}
                                                    />
                                                    {errors.maxGroupSize && <p className="text-red-500">{errors.maxGroupSize.message}</p>}
                                                </div>
                                                <div className="space-y-4 flex flex-col">
                                                    <Label htmlFor="difficulty">Difficulty</Label>
                                                    <Controller
                                                        name="difficulty"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: 'A tour must have a difficulty',
                                                            },
                                                            validate: (value) =>
                                                                ['easy', 'medium', 'difficult'].includes(value) || 'Difficulty is either easy, medium, or difficult',
                                                        }}
                                                        render={({ field }) => (
                                                            <select onChange={(e) => field.onChange(e.target.value)} value={field.value} className="border border-gray-300 rounded-md p-2 transition duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-black bg-white hover:bg-gray-100">
                                                                <option value="" disabled>Select difficulty</option>
                                                                <option value="easy">Easy</option>
                                                                <option value="medium">Medium</option>
                                                                <option value="difficult">Difficult</option>
                                                            </select>
                                                        )}
                                                    />
                                                    {errors.difficulty && <p className="text-red-500">{errors.difficulty.message}</p>}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="price">Price</Label>
                                                    <Controller
                                                        name="price"
                                                        control={control}
                                                        rules={{
                                                            required: {
                                                                value: true,
                                                                message: 'A tour must have a price',
                                                            },
                                                            validate: (value) => value > 0 || 'Price must be a positive number',
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                defaultValue={field.value}
                                                                min={0}
                                                            />
                                                        )}
                                                    />
                                                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="discount">Discount</Label>
                                                    <Controller
                                                        name="discount"
                                                        control={control}
                                                        rules={{
                                                            validate: {
                                                                required: value => value !== undefined || 'Discount is required',
                                                                isLessThanPrice: value => (value && value < price) || 'Discount must be lesser than actual price.'
                                                            },
                                                        }}
                                                        render={({ field }) => (
                                                            <Input
                                                                type="number"
                                                                {...field}
                                                                defaultValue={field.value}
                                                                min={0}
                                                            />
                                                        )}
                                                    />
                                                    {errors.discount && <p className="text-red-500">{errors.discount.message}</p>}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Controller
                                                    name="secretTour"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    )}
                                                />
                                                <Label htmlFor="secretTour">Secret Tour</Label>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="details" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full">
                                            <div className="space-y-2">
                                                <Label htmlFor="summary">Summary</Label>
                                                <Controller
                                                    name="summary"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have a summary',
                                                        minLength: {
                                                            value: 10,
                                                            message: 'Summary should be 10 character long'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <Textarea
                                                            {...field}
                                                            defaultValue={field.value}
                                                            className={errors.summary ? 'border-red-500' : ''}
                                                        />
                                                    )}
                                                />
                                                {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Controller
                                                    name="description"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have a description',
                                                        minLength: {
                                                            value: 20,
                                                            message: 'Description should be 20 character long'
                                                        }
                                                    }}
                                                    render={({ field }) => (
                                                        <Textarea
                                                            {...field}
                                                            defaultValue={field.value}
                                                            className={`h-96 ${errors.description ? 'border-red-500' : ''} `}
                                                        />
                                                    )}
                                                />
                                                {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="images" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full">
                                            <div className="space-y-2">
                                                <Label htmlFor="imageCover">Cover Image</Label>
                                                <Controller
                                                    name="imageCover"
                                                    control={control}
                                                    rules={{
                                                        required: 'A tour must have an image cover',
                                                    }}
                                                    render={({ field }) => (
                                                        <>
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    if (e.target.files) {
                                                                        field.onChange(e.target.files[0]);
                                                                    }
                                                                }}
                                                            />
                                                            {tour?.imageCover && (
                                                                <img
                                                                    src={`/src/public/img/tours/${tour.imageCover}`}
                                                                    alt="Current Cover"
                                                                    className="mt-2 h-32 w-32 object-cover rounded"
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                />
                                                {errors.imageCover && <p className="text-red-500">{errors.imageCover.message}</p>}
                                            </div>
                                            {tour?.images && <TourImagesUpload control={control} imagesArr={images} setter={setImages} />}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="dates" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center h-full">
                                        <div className="space-y-4 flex flex-col justify-evenly h-full w-full">
                                            <Label className='text-xl'>Start Dates</Label>
                                            <Controller
                                                name="startDates"
                                                control={control}
                                                render={({ field }) => (
                                                    <>
                                                        {field.value.map((date, index) => (
                                                            <Input
                                                                key={index}
                                                                type="date"
                                                                value={new Date(date).toISOString().split('T')[0]}
                                                                onChange={(e) => {
                                                                    const newDates = [...field.value];
                                                                    newDates[index] = new Date(e.target.value).toISOString();
                                                                    field.onChange(newDates);
                                                                }}
                                                                className="mb-2"
                                                                defaultValue={new Date(date).toISOString().split('T')[0]}
                                                            />
                                                        ))}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="locations" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-6 w-full">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>Start Location</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="startLocationAddress">Address</Label>
                                                        <Controller
                                                            name="startLocation.address"
                                                            control={control}
                                                            rules={{ required: 'Address is required' }}
                                                            render={({ field, fieldState }) => (
                                                                <Input
                                                                    {...field}
                                                                    defaultValue={field.value}
                                                                    className={fieldState.invalid ? 'border-red-500' : ''}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="startLocationDescription">Description</Label>
                                                        <Controller
                                                            name="startLocation.description"
                                                            control={control}
                                                            rules={{ required: 'Description is required' }}
                                                            render={({ field, fieldState }) => (
                                                                <Input
                                                                    {...field}
                                                                    defaultValue={field.value}
                                                                    className={fieldState.invalid ? 'border-red-500' : ''}
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                            <Card className='overflow-scroll h-72'>
                                                <CardHeader>
                                                    <CardTitle>Tour Locations</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <Accordion type="single" collapsible className="w-full">
                                                        {locationFields.map((location, index) => (
                                                            <AccordionItem key={location.id} value={`location-${index}`}>
                                                                <AccordionTrigger>Location {index + 1}: {location.description || "No Description"}</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <div className="space-y-4 pt-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`location-${index}-description`}>Description</Label>
                                                                            <Controller
                                                                                name={`locations.${index}.description`}
                                                                                control={control}
                                                                                rules={{ required: "Description is required" }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <>
                                                                                        <Input {...field} />
                                                                                        {error && <p className="text-red-500">{error.message}</p>}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor={`location-${index}-day`}>Day</Label>
                                                                            <Controller
                                                                                name={`locations.${index}.day`}
                                                                                control={control}
                                                                                rules={{
                                                                                    required: "Day is required",
                                                                                    min: { value: 1, message: "Day must be at least 1" }
                                                                                }}
                                                                                render={({ field, fieldState: { error } }) => (
                                                                                    <>
                                                                                        <Input type="number" {...field} />
                                                                                        {error && <p className="text-red-500">{error.message}</p>}
                                                                                    </>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            size="icon"
                                                                            onClick={() => removeLocation(index)}
                                                                        >
                                                                            <MinusCircledIcon className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => appendLocation({ description: "", day: 1 })}
                                                        className="mt-4 flex items-center space-x-2"
                                                    >
                                                        <PlusCircledIcon className="h-4 w-4" />
                                                        <span>Add Location</span>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>
                                    {/* <TabsContent value="guides" className="mt-0 data-[state=active]:flex data-[state=active]:items-center data-[state=active]:justify-center">
                                        <div className="space-y-4 w-full">
                                            <Label>Tour Guides</Label>
                                            {tour?.guides && tour.guides.map((field, index) => (
                                                <div key={index} className="flex items-center space-x-2">
                                                    <Input
                                                        // defaultValue={field}
                                                        placeholder={`Guide ${index + 1}`}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() => removeGuide(index)}
                                                    >
                                                        <MinusCircledIcon className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => appendGuide("")}
                                            >
                                                <PlusCircledIcon className="h-4 w-4 mr-2" />
                                                Add Guide
                                            </Button>
                                        </div>
                                    </TabsContent> */}
                                </div>
                            </div>
                        </ScrollArea>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button type="submit" className="bg-green-500 hover:bg-green-600">Save Changes</Button>
                </CardFooter>
            </Card>
        </form>
    )
}


// {
//     "startLocation": {
//         "type": "Point",
//         "coordinates": [
//             -73.985141,
//             40.75894
//         ],
//         "address": "Manhattan, NY 10036, USA",
//         "description": "NYC, USA"
//     },
//     "_id": "67156aa8100a7b5a4a1617d5",
//     "name": "The City Wanderer",
//     "duration": 9,
//     "maxGroupSize": 20,
//     "difficulty": "easy",
//     "ratingsAverage": 4.6,
//     "ratingsQuantity": 5,
//     "price": 1197,
//     "summary": "Living the life of Wanderlust in the US' most beatiful cities",
//     "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit amet.\nConsectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat!",
//     "imageCover": "tour-4-cover.jpg",
//     "images": [
//         "tour-4-1.jpg",
//         "tour-4-2.jpg",
//         "tour-4-3.jpg"
//     ],
//     "startDates": [
//         "2021-03-11T10:00:00.000Z",
//         "2021-05-02T09:00:00.000Z",
//         "2021-06-09T09:00:00.000Z"
//     ],
//     "secretTour": false,
//     "locations": [
//         {
//             "type": "Point",
//             "coordinates": [
//                 -73.967696,
//                 40.781821
//             ],
//             "description": "New York",
//             "day": 1,
//             "_id": "67156aa8100a7b5a4a1617d6",
//             "id": "67156aa8100a7b5a4a1617d6"
//         },
//         {
//             "type": "Point",
//             "coordinates": [
//                 -118.324396,
//                 34.097984
//             ],
//             "description": "Los Angeles",
//             "day": 3,
//             "_id": "67156aa8100a7b5a4a1617d7",
//             "id": "67156aa8100a7b5a4a1617d7"
//         },
//         {
//             "type": "Point",
//             "coordinates": [
//                 -122.408865,
//                 37.787825
//             ],
//             "description": "San Francisco",
//             "day": 5,
//             "_id": "67156aa8100a7b5a4a1617d8",
//             "id": "67156aa8100a7b5a4a1617d8"
//         }
//     ],
//     "guides": [],
//     "slug": "the-city-wanderer",
//     "durationWeek": 1.2857142857142858,
//     "reviews": [],
//     "id": "67156aa8100a7b5a4a1617d5"
// }