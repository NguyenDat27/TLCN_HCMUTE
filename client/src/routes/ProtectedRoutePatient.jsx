import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutePatient = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === "PATIENT") {
    return children
  }
  if (role === "ADMIN"){
    return <Navigate to='/dashboard' replace />
  }
  if (role === "DOCTOR"){
    return <Navigate to='/doctor' replace />
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRoutePatient