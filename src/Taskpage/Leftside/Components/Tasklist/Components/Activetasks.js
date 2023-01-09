import React from 'react';
//import './Classform.css'

const Activetasks = ({activeTheme, tasks, updateActiveTask}) => {

  return (
	  <>
      <h3 className="f3 b nosaukums tc mt0 pt3 db mb0 mh2 blue">{activeTheme.theme_name}</h3>
      <ul className="pl3 list center mt0 cx scroll2">
        { tasks.map((task, i)=>{
        return <li key={i} className="f5 pointer"  onClick={()=> updateActiveTask(task)}>{task.task_name} <span className="fr mr2 f6">{task.task_level}/5</span> </li>})
        }
      </ul>
      
    </>
	)

}


export default Activetasks