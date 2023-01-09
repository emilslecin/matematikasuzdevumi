import React, {useState, useEffect} from 'react';

const Answerfield = ({activeTask,tasks,user,updateUser, updateActiveTask}) => {

  const [answerInput, updateAnswerInput] = useState('');
  const [answerStatus, updateAnswerStatus] = useState('not');

  useEffect (() => {
    if(activeTask.task_id) updateAnswerStatus('pending')
  }, [activeTask])

  const CheckAnswer = () => {
    if (answerInput===activeTask.task_answer){
      fetch('https://matematikasuzdevumiapi.herokuapp.com/taskpoint', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify ({
        email: user.email
      }),
      })
      .then(response => response.json())
      .then(compl => updateUser({...user,tasks_completed: compl}))
      .catch(err => console.log(err))
      updateAnswerStatus('right')
      updateAnswerInput("");
    }
    else {
      if (!activeTask.task_text) return
      updateAnswerStatus('wrong')
    }
  }

  const NextTask = (activeId) => {
    tasks.forEach((task, i) => {
      if (task.task_id===activeId){
        if(tasks[i+1]){
        updateActiveTask(tasks[i+1])
        updateAnswerStatus('pending')}
        else if(!tasks[i+1]){
          updateAnswerStatus('last')
        }
      }
    })
  }
  
  const ChecSho = () => {
    if(answerStatus==="pending"){return false}
    else{return true}
  }

  return (
    <div className="ml2 flex">
      <div className="w-50">
        <label className="center f4 fw6 ph0 mh0 ">Atbilde :</label >
        <input 
          onChange={(e)=>updateAnswerInput(e.target.value)}
          disabled={ChecSho()}
          value={answerInput}
          className="mt3  input-reset ba b--black-20 pa2  db "
          type="text"
          aria-describedby="name-desc">
        </input>
          <input 
              onClick={()=>{if(answerStatus==='pending'){CheckAnswer()}}}
              disabled={ChecSho()}
              className=" mt3 b  ph4 db pv3 input-reset ba b--black dd  pointer f5 " 
              type="submit" 
              value="Iesniegt atbildi">
          </input>
          <input 
              onClick={()=>{if(activeTask.task_text){updateAnswerStatus('show')}}}
              className=" mt3 b ph4 pv3 db input-reset ba b--black dd pointer f5 " 
              type="submit" 
              disabled={ChecSho()}
              value="Parādīt atbildi">
          </input>
          {/* {activeTask.user_email &&
             <div className='mt2'>Uzdevumu pievienoja: {activeTask.user_email}</div>} */}
          
        </div>
        <div className="w-50 relative h5">
          {answerStatus==='right' &&
           <div>
              <h1 className="center tc fw6 ph0 mh0 green">Pareizi</h1>
            </div>
          }
          {answerStatus==='wrong' && 
          <div>
            <h1 className="center tc fw6 ph0 mh0 red">Nepareizi</h1 >
            <input 
              onClick={()=>{updateAnswerStatus('pending')}}
              className="center mt4 ml4 b br3 pa4 pv3 db input-reset bg-light-yellow ba pointer  f4 " 
              type="submit" 
              value="Mēģināt vēlreiz">
            </input> 
          </div>
          }
          {answerStatus==='show' && 
            <div>
              <h2 className="center  fw6 ph0 mh0 ">Atbilde :  {activeTask.task_answer}</h2>
            </div>
          }
          {answerStatus==='last' &&
           <div>
              <h3 className="center f2 fw6 ph0 mh0 light-black">Šis ir pēdējais uzdevums tēmā!</h3>
            </div>
          }
          <input 
              onClick={()=>{updateAnswerStatus('pending');NextTask(activeTask.task_id) }}
              className="absolute bot mt4 fr b br3 ph4 pv3 db input-reset  ba b--gray dd pointer  f6 " 
              type="submit" 
              value="Nākamais uzd">
          </input> 
        </div>
      
    </div>
  )
}

export default Answerfield

