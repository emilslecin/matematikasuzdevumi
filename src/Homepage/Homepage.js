import React,{} from 'react';

import Choisedotask from './Components/Choisedotask';


import './homepage.css'


const Homepage = ({ user}) => {


  return (
    <div >
      <Choisedotask  user={user} />
    </div>
  );
}

export default Homepage;