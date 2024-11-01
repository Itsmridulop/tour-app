import { FaTrash } from "react-icons/fa";
import { UserDataType } from "../../types/userType"

const roleColor = (role: string) => {
    switch (role) {
        case "admin":
            return "bg-blue-100 text-blue-700";
        case "user":
            return "bg-gray-100 text-gray-700";
        case "guide":
            return "bg-green-100 text-green-700";
        case "lead-guide":
            return "bg-purple-100 text-purple-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};


function UserCard({ user }: { user: UserDataType }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img src={`/src/public/img/users/${user.photo}`} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColor(user.role)}`}>
                    {user.role}
                </span>
                <button
                    // onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition"
                >
                    <FaTrash className="h-5 w-5" />
                    <span className="sr-only">Delete user</span>
                </button>
            </div>
        </div>
    )
}

export default UserCard
