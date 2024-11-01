import { Link } from "react-router-dom"
import { useUser } from "../features/users/useUser"

function AllUserLinkWapper() {
    const { user } = useUser()
    if(!(user?.data.role === 'admin')) return null
    return <Link to="/allusers">ALL USERS</Link>
}

export default AllUserLinkWapper
