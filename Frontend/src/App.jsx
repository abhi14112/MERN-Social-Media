import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./screens/Login.jsx";
import Signup from "./screens/Signup.jsx";
import Home from './screens/Home.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from "./components/Profile.jsx"
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<PrivateRoute>
          <Home/>
        </PrivateRoute>} />
        <Route path='/profile'
          element={<PrivateRoute>
            <Profile/>
          </PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}
export default App;