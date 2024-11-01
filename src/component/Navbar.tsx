import { Link } from "react-router-dom"
import { auth } from "../api/authApi"
import { useLogout } from "../features/authentication/useLogout"
import { CiUser } from "react-icons/ci";

import AllUserLinkWapper from "./AllUserLinkWapper";

function Navbar() {
  const { logout } = useLogout()

  return (
    <nav className="flex justify-between  w-[98vw] items-center bg-zinc-700 m-6 px-8 py-4 text-white">

      <div className="flex-1 space-x-6">
        {auth.isAuthenticated() && (
          <>
            <Link to="/">ALL TOURS</Link>
            <AllUserLinkWapper />
          </>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        <div >
          <img src="src/public/img/logo-white.png" alt="Logo" className="h-12 p-1" />
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center space-x-6">
        {!auth.isAuthenticated() &&
          <Link to="/login">
            LOG IN
          </Link>
        }
        <Link
          to="/signup"
          className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
        >
          {auth.isAuthenticated() ?
            <button onClick={() => logout()}>
              LOG OUT
            </button> : 'SIGN UP'}
        </Link>
        <Link to='/users' className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-gray-800 transition">
          <CiUser className="text-2xl" />
        </Link>
      </div>
    </nav >
  )
}

export default Navbar
