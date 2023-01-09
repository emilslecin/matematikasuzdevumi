import React,{useEffect, useState} from 'react';
import { MathfieldElement} from 'mathlive';


const Taskfield = ({task}) => {
  
  const [type, updateType] = useState(false)
  useEffect(()=> {
    const mfe = new MathfieldElement();
    document.addEventListener("DOMContentLoaded", () => mfe.renderMathInDocument());
    
  }, [])
  
  useEffect(()=> {
    if(task.task_text.startsWith('\\text'))return updateType(true)
    updateType(false)
    if(!document.getElementById('mf'))return
    document.getElementById('mf').value = task.task_text;
    },[task])
  
  
  // console.log(document.getElementById("mf").value)
  // console.log(task.task_text)

  return (
    <section className="center mw5 mw6-ns p  br3 mv4">
      <div className="pa3 mb2 bg-washed-blue ba br3 b--black-50 ">
        {
          type ? 
        <p className='' id="tt">
          {task.task_text.replace("\\text", "")}
        </p>
        :
        <math-field
         read-only
       id="mf"
        style={{width:500}}
        value={task.task_text}
        >
      {task.task_text}
       
        </math-field> 
      // <math-field value="e^{i\pi}"></math-field>
    }

      </div>
      {task.task_level &&
        <p className="pb2 f6 pl2" >Sarežģītība: {task.task_level}</p>
      }
    </section>
  )
}


export default Taskfield