import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouteDoctor = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === "DOCTOR") {
    return children
  }
  if (role === "ADMIN"){
    return <Navigate to='/dashboard' replace />
  }
  if (role === "PATIENT"){
    return <Navigate to='/' replace />
  }
  return <Navigate to='/login' replace />
}

export default ProtectedRouteDoctor