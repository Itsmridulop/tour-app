import { Link } from "react-router-dom";
import { auth } from "../api/authApi";
import { useLogout } from "../features/authentication/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "@/types/userType";

import AllUserLinkWapper from "./AllUserLinkWapper";
import UserPhoto from "./UserPhoto";

function Navbar() {
  const { logout } = useLogout();

  const queryClient = useQueryClient();
  const user: ResponseType | undefined = queryClient.getQueryData(['user'])
  const isAuth = auth.isAuthenticated();

  return (
    <nav className="flex justify-between shadow-md w-[98vw] items-center bg-zinc-700 m-6 px-8 py-4 text-white">
      <div className="flex-1 space-x-6">
        {isAuth && (
          <>
            <Link to="/">ALL TOURS</Link>
            <AllUserLinkWapper />
          </>
        )}
      </div>

      <div className="flex-1 flex justify-center">
        <div>
          <img
            src="src/public/img/logo-white.png"
            alt="Logo"
            className="h-12 p-1"
          />
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center space-x-6">
        {!isAuth && <Link to="/login">LOG IN</Link>}
        {!auth.isAuthenticated() ? (
          <Link
            to="/signup"
            className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
          >
            SIGN UP
          </Link>
        ) : (
          <button
            className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
            onClick={() => logout()}
          >
            LOG OUT
          </button>
        )}
        <Link
          to="/users"
          className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-gray-800 transition"
        >
          {(isAuth && user?.data.photo) && <UserPhoto imgSrc={user.data.photo} />}
          {(isAuth && !user?.data.photo) && <UserPhoto imgSrc={'src/public/img/users/default.jpg'} />}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
