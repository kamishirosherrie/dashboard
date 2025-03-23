import { Navigate } from 'react-router-dom'

const ProctectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('user')

    return isAuthenticated ? children : <Navigate to="/login" />
}

export default ProctectedRoute
