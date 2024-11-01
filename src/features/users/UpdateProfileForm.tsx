import { useForm } from "react-hook-form"
import { UserProfileType, UserDataType } from "../../types/userType";
import { useUpdateProfile } from "./useUpdateProfile";

function UpdateProfileForm({ user, onClose }: { user: UserDataType | undefined; onClose?: () => void }) {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<UserProfileType>();
    const { updateProfile } = useUpdateProfile()

    const submitHandler = (data: Partial<UserProfileType>) => {
        if (data.name === user?.name && data.photo?.length === 0) return
        updateProfile(data, {
            onSettled: () => reset(),
            onSuccess: () => onClose?.(),
        })
    }

    return (
        <div className="max-w-md mx-auto p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Update Profile</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={user?.name}
                        placeholder="Enter your name"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('name')}
                    />
                </div>
                {errors?.name?.message && <div>{errors.name.message}</div>}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="profilePhoto">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        id="profilePhoto"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-200"
                        {...register('photo')}
                    />
                    {errors?.photo?.message && <div>{errors.photo.message}</div>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200"
                >
                    Update Profile
                </button>
            </form>
        </div>
    )
}

export default UpdateProfileForm
