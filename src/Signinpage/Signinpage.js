import React, {} from 'react';
import {Route, Routes,  Outlet } from "react-router-dom";
import Signin from './Components/Signin';
import Register from './Components/Register';
import Title from './Components/Title/Title';

import './Signinpage.css'


const Signinpage = ({user, updateUser}) => {

  return (
    <div className="signinp">
      <Title />
      <Routes>
          <Route path="*" element={<Signin user={user}  updateUser={updateUser}/>} />
          <Route path="Register" element={<Register updateUser={updateUser} /> }/>
        </Routes>
      <Outlet />
    </div>
  )
}

export default Signinpage;