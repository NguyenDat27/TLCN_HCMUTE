import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteAdmin = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === "ADMIN") {
    return children
  }
  if (role === "DOCTOR"){
    return <Navigate to='/doctor' replace />
  }
  if (role === "PATIENT"){
    return <Navigate to='/' replace />
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRouteAdmin