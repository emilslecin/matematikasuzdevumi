import React, {useState} from 'react';
import { useNavigate  } from "react-router-dom";


const Register = () => {
  const [email, updateEmail] = useState('');
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [status, updateStatus] = useState("")

  let navigate = useNavigate();
  const submitRegister = (e) => {
    e.preventDefault();
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
    const emailRegex = new RegExp('[^@]+@[^@]+.[^@]+')
    
    if(!username)return updateStatus("emt_fail")
    if(!emailRegex.test(email)) return updateStatus("email_fail")
    if(!passwordRegex.test(password)) return updateStatus("password_fail")
    
    email.replace(new RegExp('\\s+'), "")

    fetch('https://matematikasuzdevumiapi.herokuapp.com/register', {
      method: 'post',
      headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({
          email: email,
          username: username,
          password: password
        })
    })
    .then(response => response.json())
    .then(res=> {
      if(res.email){
       navigate("/");
      }
      if(res==="cant"){
        updateStatus("use_fail")
      }
    })
    .catch(err=>console.log(err))
  }
  //Maina paroles redzamību
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
          <legend className="f4 fw6 ph0 mh0">Reģistrēties</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">E-pasts</label>
            <input
             className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-blue"
             type="email"
             name="email-address"
             id="email-address"
             onChange={(e)=> updateEmail(e.target.value)}
             autoComplete="on"
             ></input>
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Parole <span className='f7'>(Jāiekļauj 8 rakstzīmes, lielo un mazo burtu un ciparu)</span></label>
            <input 
            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-70 b--light-blue" 
            type="password"
            name="password"  
            id="password"
            onChange={(e)=> updatePassword(e.target.value)}
            autoComplete="on"
            ></input>
            <input className="w-25 fr  ph3 pv2 input-reset ba b--blsack bg-transparent grow pointer f6 dib" type="submit"
           value="Rādīt paroli"
           id="pogga"
           onClick={(e)=>passwordType(e)}>
           </input>
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="username">Lietotājvārds</label>
            <input 
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 b--light-blue" 
            onChange={(e)=> updateUsername(e.target.value)}
            autoComplete="on"></input>
          </div>
          </fieldset>
        {
        status==="use_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">E-pasta adrese jau tiek izmantota!</label >
          </div>
        }
        {
        status==="emt_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Visi lauki nav aizpildīti!</label >
          </div>
        }
        {
        status==="email_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">E-pasts nepareizi ievadīts!</label >
          </div>
        }
        {
        status==="password_fail" &&
          <div className="mt2">
            <label className="center f4 fw6 ph0  mh0 ">Parole nav vismaz 8 rakstzīmes gara vai neiekļauj vismaz vienu lielo burtu,  mazo burtu un skaitli!</label >
          </div>
        }
        <div className="">
          <input className="w-30 mt3 b ph3 pv2 input-reset ba b--blsack bg-transparent grow pointer f6 dib" type="submit"
           value="Reģistrēties"
           onClick={submitRegister}>
           </input>
           <input className="w-30 fr mt3 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="button"
           value="Ieiet portālā"
           onClick={()=>navigate("/")}>
           </input>
        </div>
      </form>
    </main>
  )
}


export default Register