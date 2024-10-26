import { createBrowserRouter, RouterProvider } from "react-router-dom"

import AppLayout from './component/AppLayout'
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
