import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import AppLayout from './component/AppLayout'
import Login from "./features/authentication/Login"
import Signup from "./features/authentication/Signup"
import ProtectedRoute from "./component/ProtectedRoute"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/',
        element: <ProtectedRoute>
          <div>Home</div>
        </ProtectedRoute>
      }
    ]
  }
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools  initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
          position="top-center"
          gutter={12}
          containerStyle={
            {
              margin: "8px"
            }}
          toastOptions={
            {
              success: {
                duration: 1000
              },
              error: {
                duration: 3000
              },
              style: {
                fontSize: '16px',
                maxWidth: '500px',
                padding: '16px 24px',
                backgroundColor: '#b7b7b7',
                color: '#303030'
              }
            }
          }
        />
    </QueryClientProvider>
  )
}

export default App
