import React, { useState} from 'react';
import { Link, Navigate  } from "react-router-dom";



const Signin = ({ updateUser, user}) => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [status, updateStatus] = useState("")

  const submitSignin = (e) => {
  if(!email||!password){ updateStatus("emt_fail")}

  e.preventDefault();
    fetch('https://matematikasuzdevumiapi.herokuapp.com/signin', {
      method: 'post',
      headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({
          email: email,
          password: password
        })
    })
    .then(response => response.json())
    .then(res=> {
      if(res.email){
        updateUser(res);
      }
      if(res==="fail"){
        updateStatus("cr_fail");
        
      }
    })
    .catch(err=>console.log(err))
  }

  const passwordType = (e) => {
    e.preventDefault()
    const pwField = document.getElementById("password")
    if(pwField.type==="password"){
      pwField.setAttribute("type", "text");
      document.getElementById("pogga").value = "Slēpt paroli";
    }
    else if (pwField.type==="text"){
      pwField.setAttribute("type", "password")
      document.getElementById("pogga").value = "Rādīt paroli";
    }
  }

  return (
    <main className="pa4 black-80">
      <form className="measure center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Pieslēgties</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">E-pasts</label>
            <input
              onChange={(e)=> updateEmail(e.target.value)}
              value={email}
              autoComplete="on"
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-blue" type="email" name="email-address"  id="email-address"></input>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Parole</label>
            <input 
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70 b--light-blue" 
            type="password"
            id="password"
            onChange={(e)=> updatePassword(e.target.value)}
            value={password}
            autoComplete="on"
            ></input>
            <input className="w-25 fr  ph3 pv2 input-reset ba b--blsack bg-transparent grow pointer f6 dib" type="submit"
           value="Rādīt paroli"
           id="pogga"
           onClick={(e)=>passwordType(e)}>
           </input>
          </div>
          {/* <label  className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" id="chk" ></input> Remember me</label> */}
        </fieldset>
        <div className="">
          <Link
           className="w-30 mt3 link b ph3 pv2 input-reset black tc ba b--black bg-transparent grow pointer f6 dib"
           onClick={submitSignin}
           >Ieiet portālā</Link>
           {user.email && (
          <Navigate to="/HomePage" replace={true} />
        )}
        </div>
        <div className="">
        <Link
           className="w-30 mt3 link b ph3 pv2 input-reset black tc ba b--black bg-transparent grow pointer f6 dib"
           to="/Register"
           >Reģistrēties</Link>
        {/* </div>
        <div className="">
          <div className="lh-copy mt3">
          <div  className="pv2 f6 link dim black db">Forgot your password?</div>
        </div> */}
        </div>
        {
          status==="success" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Reģistrācija notikusi veiksmīgi</label >
          </div>
        }
        {
          status==="cr_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">E-pasta adrese neeksistē vai arī parole nesakrīt</label >
          </div>
        }
        {
          status==="emt_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Visi lauki nav aizpildīti</label >
          </div>
        }
        <Link 
        to="/Tasks"
         onClick={()=>
          updateUser("janka")}
         className="w-70 mt5 link b ph3 pv2 input-reset  tc ba b--black  grow pointer f4 db" //a white
          >Pildīt uzdevumus bez reģistrēšanās</Link>
      </form>
    </main>
  )
}


export default Signin