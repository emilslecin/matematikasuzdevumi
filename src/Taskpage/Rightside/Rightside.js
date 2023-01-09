import React from 'react';
import Homebutton from './Components/Homebutton';
import Tutorial from './Components/Tutorial';



const Rightside = ({updateUser, user}) => {

  return (
    <div >
      <Homebutton updateUser={updateUser} user={user}/>
      <Tutorial />
    </div>
  );
}

export default Rightside;