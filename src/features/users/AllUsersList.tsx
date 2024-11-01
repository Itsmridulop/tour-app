import { useUsers } from "./useUsers";

import Spinner from "../../component/Spinner";
import UserCard from "./UserCard";

export default function UserList() {
  const { users, isPending } = useUsers()

  if (isPending) return <Spinner />

  return (
    <div className="min-h-screen flex mt-18 flex-col bg-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-center items-center h-14 px-6">
          <h1 className="text-2xl w-screen font-semibold text-center">User List</h1>
          <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded w-48 hover:bg-blue-600 transition">
            Create New User
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(users?.data) && users.data.map((user) => ( user.role === 'admin' ||
            <UserCard key={user._id} user={user}/>
          ))}
        </div>
      </div>
    </div>
  );
}
