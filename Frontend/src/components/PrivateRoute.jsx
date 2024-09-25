import React from 'react'
import { Navigate } from 'react-router-dom';
import Layout from './Layout';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ children }) => {
    const {user} = useSelector((state)=>state.user);
    return user ? <Layout>{children}</Layout> : <Navigate to="/login" />
}
export default PrivateRoute