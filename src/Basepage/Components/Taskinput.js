import React, {useState, useEffect} from 'react';
import { MathfieldElement} from 'mathlive';


const Taskinput = ({taskId,updateUser, user}) => {

  
  const [taskName, updateTaskName] = useState('');
  const [taskText, updateTaskText] = useState('');
  const [taskInfo, updateTaskInfo] = useState('');
  const [taskAnswer, updateTaskAnswer] = useState('');
  const [taskLevel, updateTaskLevel] = useState(1);
  const [submitStatus, updateSubmitStatus] = useState('pending');

  const SendTask = (a) => {
    a.preventDefault();
    if(document.getElementById("typz").value==="Uzdevums ar tekstu")updateTaskText("\\"+ "text" +taskInfo)
    else(updateTaskText(taskText=>"\\"+taskText))
    if(!taskName || !taskText ||!taskAnswer || !taskId || !user.email|| !taskLevel){
      return updateSubmitStatus('wrong');
    }
    console.log(taskText)
    fetch('https://matematikasuzdevumiapi.herokuapp.com/addtask', {
      method : 'post',
      headers : {'Content-type' : 'application/json'},
      body : JSON.stringify({
        name: taskName,
        text: taskText,
        info: taskInfo,
        answer: taskAnswer,
        theme: taskId,
        email: user.email,
        level: taskLevel
      })})
      .then(response => response.json())
      .then(task => {
        if(task.tasks_added){
          updateSubmitStatus('right');
          updateUser({...user, tasks_added: task.tasks_added})
          updateTaskAnswer(""); updateTaskName(""); updateTaskText(""); updateTaskInfo(""); 
          document.getElementById('mf').value = "";
        }
        else if (!task.task_id){
          updateSubmitStatus('db')
      }
    })
  }
  useEffect(()=> {
    const mfe = new MathfieldElement();
    document.addEventListener('DOMContentLoaded', () =>   
    mfe.renderMathInDocument()
    );
    if(!document.getElementById('mf')) return
    document.getElementById('mf').addEventListener('input',()=> {
      updateTaskText(document.getElementById('mf').value)      
    } )
  }, [])
  
  //Pievieno klaviaturu
  if(document.getElementById("mf")){
    document.getElementById("mf").setOptions({
      virtualKeyboardMode: "manual",
        virtualKeyboards: "numeric symbols"
    });

  }

  return (   
    <div className="mr4 inpt">
      <div className="">
        <form className="pa4 black-80">
        <label className="center f4 fw6 ph0 mh0 ">Uzdevuma Nosaukums <span className='f7'>(Tas, ko rāda izvēloties uzdevumus)</span></label >
        <input 
          onChange={(field)=> updateTaskName(field.target.value)}
          className="mt3 w-60 br2 input-reset mb3 ba b--black-40 pa2 db "
          value={taskName}
          type="text"
          aria-describedby="name-desc"
          placeholder="Nosaukums">
        </input>
        <label className="center f4 fw6 ph0 ">Uzdevums <span className='f7'>(Pats uzdevums, zemāk ir jāizvēlas uzdevuma veids)</span></label >
          <br></br>
        <label className="center f4 fw6 ph0 mh0 ">Uzdevuma veids </label >
          <br></br>
          <select
          id="typz"
           className="db w-50 f5 mt2">
                <option value="Matemātiska izteiksme">Matemātiska izteiksme</option>
                <option value="Uzdevums ar tekstu">Uzdevums ar tekstu</option>
              </select>
         <br></br> <label className="center f5 fw6 ph0 mh0 ">Uzdevums ar matamātisku izteiksmi</label >
        <div className="mt2 db border-box hover-black mw6   f3 ba b--black-50 pa2 br2 mb2" >
            <math-field virtual-keyboard-mode="manual"
              //onChange={(field)=> console.log("a")}
              id="mf" 
              
              name="comment"
              className="mt2 db border-box hover-black w-100 h4 measure ba b--black-50 pa2 br2 mb2"
              aria-describedby="comment-desc"
              placeholder="Teksts"> 
             </math-field>
        </div>
        <label className="center f5 fw6 ph0 mh0 ">Uzdevums ar tekstu</label >
            <textarea 
              onChange={(field)=> updateTaskInfo(field.target.value)}
              id="comment" 
              name="comment"
              value={taskInfo}
              className="mt2 db border-box hover-black w-100 h4 measure ba b--black-50 pa2 br2 mb2"
              aria-describedby="comment-desc"
              placeholder="Teksts">
             </textarea>
             <label className="center f4 fw6 ph0 mh0 ">Uzdevuma atbilde <span className='f7'>(Tava izdomātā uzdevuma atbilde)</span></label >
          <input 
            onChange={(field)=> updateTaskAnswer(field.target.value)}
            className="mt3 w-60 br2 input-reset mb3 ba b--black-50 pa2 db "
            type="text"
            value={taskAnswer}
            aria-describedby="name-desc"
            placeholder="Atbilde">
          </input>
          <div>
              <label className="center f4 fw6 ph0 mh0 ">Uzdevuma grūtības pakāpe skalā no 1 līdz 5 <span className='f7'>(Uzdevuma sarežģītība izvēlētajai klasei)</span></label >
              <select onChange={(e)=>updateTaskLevel(e.target.value)} className="db w-50 f4 mt2">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          <input 
              onClick={SendTask}
              className=" mt4 b br3 pa4 pv2 db input-reset  ba b--black bg-transparent pointer  f4 " 
              type="submit" 
              value="Pievienot uzdevumu">
            </input> 
            
        </form>
          {submitStatus==='right' &&
           <div>
              <h1 className="center tc fw6 ph0  green">Uzdevums veiksmīgi pievienots</h1>
            </div>
          }
          {submitStatus==='wrong' && 
          <div>
            <h1 className="center tc fw6 ph0  red">Kāda no vērtībām trūkst</h1>
          </div>
          }
          {submitStatus==='db' && 
          <div>
            <h1 className="center tc fw6 ph0 mh0 red">Problēma ar datubāzi</h1>
          </div>
          }  
        </div>
      </div>
  )
}


export default Taskinput

