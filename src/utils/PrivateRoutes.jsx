import React from 'react'
// this utils give me user if not get user then go to login , its utils work if user not login so they not visit any pages ,
// if user login successfull then Verify user by matching JWT token in authMiddlware.js Backend
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'


const PrivateRoutes = ({ children }) => {

  const { user, loading } = useAuth()
  if (loading) {
    return <div>Loading.....</div>
  }

  return user ? children : <Navigate to="/login" />

}

export default PrivateRoutes