import React,{useState, useEffect} from 'react';
import Searchtask from './Components/Searchtask/Searchtask';
import Tasklist from './Components/Tasklist/Tasklist';
import Profile from './Components/Profile';



const Leftside = ({activeTheme, updateActiveTheme, updateActiveTask, tasks, user}) => {

  const [themes, updateThemes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch('https://matematikasuzdevumiapi.herokuapp.com/themes', { signal })
    .then(response => response.json())
    .then(themess => updateThemes(themess))
    .catch(err => {
      if(err.name === "AbortError"){
      }
      else(console.log(err))
    })
      

    return () => {controller.abort()
    }
  },[]);
  

    
    
  return (
    <div className="br ffff flex flex-column">
      <div className=''>
     	  <Profile user={user}/>
      </div>
      <div className=''>
     	  <Searchtask themes={themes} updateActiveTheme={updateActiveTheme}/>
      </div>
      <div className=' '>
     	  <Tasklist themes={themes} tasks={tasks} updateActiveTask={updateActiveTask} activeTheme={activeTheme} updateActiveTheme={updateActiveTheme}/>
      </div>
    </div>
  );
}

export default Leftside;