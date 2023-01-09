import React from 'react';


const Taskheader = ({activeTask, activeTheme}) => {
  return (
    <div className="mt5 measure center">
      <div className="f2 mb3 tc fw6 ph0 mh0">{activeTask.task_name}</div >
      {activeTheme.theme_name&&
      <div className="f4 fw6 ph0 mh0">{activeTheme.theme_name} - {activeTheme.theme_class}. Klase</div >
      }
    </div>
  )

}


export default Taskheader

