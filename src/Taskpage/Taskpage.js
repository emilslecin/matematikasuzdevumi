import React, {useState, useEffect} from 'react';

import Leftside from './Leftside/Leftside';
import Middleside from './Middleside/Middleside';
import Rightside from './Rightside/Rightside';




import './Taskpage.css'



const Taskpage = ({updateUser, updatePath, user}) => {
  const [activeTheme, updateActiveTheme] = useState(['Uzdevuma tēma', 0]);
  const [activeTask, updateActiveTask] = useState({task_name : 'Uzdevuma nosaukums', task_text:'Uzdevums'});
  const [tasks, updateTasks] = useState([])
  
  useEffect(() => {
    if (activeTheme[1]===0)return
    
    fetch('https://matematikasuzdevumiapi.herokuapp.com/tasks', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify ({
        id: activeTheme.theme_id
      }),
    })
    .then(response => response.json())
    .then(taskss => updateTasks(taskss))
    .catch(err => {(console.log(err))
    })
    return () => {
    }
  },[activeTheme]);

  return (
    <div className="container ffff">
        <div className=" aa">
          <Leftside user={user} activeTheme={activeTheme} tasks={tasks} updateActiveTheme={updateActiveTheme} updateActiveTask={updateActiveTask}/>
        </div>
        <div className=" pa2">
          <Middleside tasks={tasks} user={user} updateUser={updateUser} activeTheme={activeTheme} activeTask={activeTask} updateActiveTask={updateActiveTask} updateActiveTheme={updateActiveTheme}/>
        </div>
        <div className=" pa2">
          <Rightside updateUser={updateUser} user={user}/>
        </div>
    </div>

  );
}

export default Taskpage;