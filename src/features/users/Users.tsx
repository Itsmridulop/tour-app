import { useUser } from "./useUser";

import Spinner from "../../component/Spinner";
import Modal from "../../component/Modal";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UpdateProfileForm from "./UpdateProfileForm";

function Users() {
    const { user, isLoading } = useUser()
    if (isLoading) return <Spinner />;

    const role = user?.data.role;
    const badgeText = role === 'guide' ? 'Guide'
        : role === 'lead-guide' ? 'Lead Guide'
            : role === 'admin' ? 'Admin'
                : null;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
                <h1 className="text-5xl font-bold mb-6">Your Profile</h1>

                <div className="relative w-32 h-32 mb-4">
                    <img
                        src={`src/public/img/users/${user?.data.photo}`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover shadow-md"
                    />
                    {badgeText && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                            {badgeText}
                        </span>
                    )}
                </div>

                <div className="mb-8">
                    <p className="text-2xl font-medium">{user?.data.name}</p>
                    <p className="text-gray-500">{user?.data.email}</p>
                </div>

                <div className="flex space-x-4">
                    <Modal>
                        <Modal.Open opens='updateProfile'>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                                Update Profile
                            </button>
                        </Modal.Open>
                        <Modal.Window name="updateProfile">
                            <UpdateProfileForm user={user?.data} />
                        </Modal.Window>
                        <Modal.Open opens="updatePassword">
                            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow hover:bg-gray-400 transition">
                                Update Password
                            </button>
                        </Modal.Open>
                        <Modal.Window name="updatePassword">
                            <UpdatePasswordForm />
                        </Modal.Window>
                    </Modal>
                </div>
            </main>
        </div>
    );
}

export default Users;
