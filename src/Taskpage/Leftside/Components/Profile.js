import React from 'react';


const Profile = ({user}) => {
  return (
    user.username ?
	  <section className="bb a profile  mw5 mw7-ns  pa3 ">
      <h1 className="mt0 mb5 tc">{user.username}</h1>
      <div className="f4"> Izpildītie uzdevumi: {user.tasks_completed}</div>
      <div className="f4 mv2"> Pievienotie uzdevumi : {user.tasks_added}</div>
    </section>
    : 
    <section className="bb profile a mw5 mw7-ns  pa3">
      <h2 className="mt0 mb5 tc">Ieej portālā, lai saglabātu savu progresu un pievienotu savus uzdevumus</h2>
    </section>
    
      

	)

}


export default Profile