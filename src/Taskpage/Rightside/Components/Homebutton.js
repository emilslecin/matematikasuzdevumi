import React from 'react';
import { useNavigate } from "react-router-dom";


const Homebutton = ({ updateUser, user}) => {
  let navigate = useNavigate();
  const Teksts = ()=> {
    if(user.email){return "Iziet"}
    else return "Reģistrēties"
  }
  return (
    <>
      <div className="">
        <input
          onClick={() =>{ updateUser(''); navigate("/")}} 
          className="fr tc ma2 f6 link dim ba bw1 ph3 pv2 mb2 dib dark-gray"
          type="submit" 
          value={Teksts()}></input>
      </div>
      {user.email&&
      <div className="">
        <input 
         onClick={() => navigate("/HomePage")}
         className="fr trasparent tc ma2 f6 link dim o-50 ba bw1 ph3 pv2 mb2 dib dark-gray"
         type="submit" 
         value="Izvēlne"></input>
       </div>
      }
   </>
  )

}


export default Homebutton