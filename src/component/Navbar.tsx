import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="flex justify-between absolute w-[98vw] items-center bg-zinc-700 m-6 px-8 py-4 text-white">
      
      <div className="flex-1">
        <Link to="/">
          ALL TOURS
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div >
          <img src="src/public/img/logo-white.png" alt="Logo" className="h-12 p-1" />
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center space-x-6">
        <Link to="/login">
          LOG IN
        </Link>
        <Link
          to="/signup"
          className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
        >
          SIGN UP
        </Link>
      </div>

    </nav>
  )
}

export default Navbar
