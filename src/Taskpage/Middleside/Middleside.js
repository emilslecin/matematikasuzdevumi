import React from 'react';
import Taskfield from './Components/Taskfield';
import Taskheader from './Components/Taskheader';
import Answerfield from './Components/Answerfield';


import './Middlepage.css'


const Middleside = ({activeTheme,tasks, updateUser, activeTask, updateActiveTask, user}) => {


  return (
    <div>
     <Taskheader activeTask={activeTask} activeTheme={activeTheme}/>
      <Taskfield task={activeTask}/>
      <Answerfield tasks={tasks} updateUser={updateUser} user={user} updateActiveTask={updateActiveTask} activeTask={activeTask}/>
    </div>
  );
}

export default Middleside;