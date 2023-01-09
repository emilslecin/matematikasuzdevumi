import React, {useState} from 'react';
//import './Problem.css';

const Problem = () => {
    const [hasProblem, updateHasProblem] = useState(false);
    const [problemName, updateProblemName] = useState("");
    const [problemDescription, updateProblemDescription] = useState("");
    const [problemStatus, updateProblemStatus] = useState("");

    
    document.addEventListener('click', function handleClickOutsideBox(event) {
      if(event.target.id==='problem')return
      updateHasProblem(false)
      updateProblemStatus("")})
    
      const submitProblem = () => {
        if(!problemDescription||!problemName){return updateProblemStatus("credital")}
        fetch('https://matematikasuzdevumiapi.herokuapp.com/problem', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify ({
        name: problemName,
        description: problemDescription
      })})
      .then(resp=> resp.json())
      .then(res=>{ 
        if(res.problem_name){
          updateProblemStatus("success")
          setTimeout(()=>
          updateHasProblem(false), 2000)
          updateProblemDescription("")
          updateProblemName("")
        }
      else {updateProblemStatus("db")}})
    }
  return( 
        hasProblem ?  
        (<div id="problem" className="dib fixed shadow-5 br3 ba center mt7 poscent bg-light-yellow" >
          <h3 id="problem" className='tc'>Lūdzu pastāsti, kas nav labi</h3>
          <label id="problem" className="ml4 ">Problēma</label>
          <input id="problem"
          placeholder="Problēma"
          onChange={(e)=>updateProblemName(e.target.value)}
          value={problemName}
          className="mv3 ml3 input-reset ba bg-light-blue pa2 db "
          type="text"
          autoComplete='off'
          aria-describedby="name-desc">
        </input>
        <label id="problem" className="ml4 ">Problēmas apraksts</label>
          <input  id="problem"
          autoComplete='off'
          onChange={(e)=>updateProblemDescription(e.target.value)}
          value={problemDescription}
          placeholder="Problēmas apraksts"
          className="mv3 ml3 input-reset ba bg-light-blue pa2 db "
          type="text"
          aria-describedby="name-desc">
        </input>
        <input id="problem"
          onClick={submitProblem}
            className=" ml3 f5 link mt2 ph3 pv2 mb2 dib white bg-dark-blue" 
            
            type="submit" 
            value="Iesniegt">
        </input>
        
        {problemStatus==="success" && 
        <h1 className=" fr mr4 mt2 fw6 ph0  green">Izdevās</h1>
        }
        {problemStatus==="credital" && 
        <h1 className="fr mt2 fw6 ph0 f3 dib w-50 red">Visi laiki nav aizpildīti</h1>
        }
        {problemStatus==="db" && 
        <h1 className="fr mt2 fw6 ph0 f3 dib w-50 red">Ķļūda pievienošanā</h1>
        }
         </div>)
        :
        <input 
        id="problem"
            onClick={()=>{updateHasProblem(true); updateProblemStatus("")}}
              className="fixed f6 link pointer ph3 pv2 mb2 dib white bg-dark-blue" 
              style={{bottom: 60, right:10}}
              type="submit" 
              value="Kaut kas nestrādā? Pastāsti!">
        </input> 
      
  )
}

export default Problem