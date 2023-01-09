import React from 'react';
import { useNavigate } from "react-router-dom";


const Choicedotask = ({ user}) => {

  let navigate = useNavigate();

  const Titl = () => {
    if(user.email) return
    return "Login to access"
  }

  return (
    <div className="bg-transparent mt5 w-60 tc center flex-column flex">
      <div className="h5 w-70 center mv3">
        Šajā sadaļā Jūs varat izvēlēties starp uzdevumu pildīšanu un to pievienošanu
        <h1 className="f1 pv3 ba br4 n f2-m fw2 mt5 black-90 ">
          Jūs esat pievienojies kā <div>{user.username}</div> 
        </h1>
      </div>
      <div className="h5">
      </div>
      <div className="f5 f4-m f3-l fw2  black-50 mv3 lh-copy">
        <input
           onClick={()=> navigate("/Tasks")}
           className="pa3 a b--dark-blue ph6 br1 ba  tc pointer b--grey"
           type="submit"
           value="    Sākt pildīt uzdevumus    "
          >
        </input>
      </div>
      <div className="f5  f4-m  f3-l fw2  black-50 mv3 lh-copy">
        <input
           onClick={()=> navigate("/TaskAdd")}
           disabled={!user.email}
           title={Titl()}
           className="pa3 a b--dark-blue br1 center ph6  ba  tc pointer b--grey"
           type="button"
           value="Pievienot savus uzdevumus"
           >
        </input>
      </div>
    </div>
  )
}

export default Choicedotask

