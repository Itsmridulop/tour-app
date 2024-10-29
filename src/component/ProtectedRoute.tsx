import { ReactNode } from "react"
import { auth } from "../api/signupApi"
import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }: { children: ReactNode }) {
    if (!auth.isAuthenticated())
        return <Navigate to="/login" replace={true} />
    return children
}

export default ProtectedRoute
