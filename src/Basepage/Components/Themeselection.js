import React,{useState, useEffect} from 'react';
const Themeselection = ({updateTaskId, taskId}) => {
  const [themes, updateThemes] = useState([{theme_id: 1, theme_name: 'Tēmas nosaukums', theme_class: 'Klase'}]);
  const [show, updateShow] = useState([true,true,true,true,true,true,true,true,true,true,true,true]);

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
    return () => {
      controller.abort();
    }
  },[]);

const A = (ind) => {
     let arr = [];
    show.forEach((value, i) => {
      if(i===(ind-1)){
        arr.push(true)
      }
      else{
        arr.push(value) 
      }
    })
    updateShow(arr)
  }
  useEffect(() => {
    if(taskId&&document.getElementById(taskId)){
      document.getElementById(taskId).classList.add('ba', 'pr2', 'tc', 'b--green');
      themes.forEach((theme, i) => {
        if(theme.theme_id !== taskId&&document.getElementById(theme.theme_id)){
          document.getElementById(theme.theme_id).classList.remove('ba', 'pr2', 'tc', 'b--green')
        }
      })
    }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskId, show])

   const [showBar, updateShowBar] = useState(true);
   const [searchField, updateSearchField] = useState("");

  document.addEventListener('click', function handleClickOutsideBox(event) {
  if(event.target.id==='aa'){
    updateShowBar(true)
  }
  else{updateShowBar(false)} });

  const classes = [1,2,3,4, 5, 6, 7, 8, 9, 10 ,11, 12];
    
  const ShowWitch = (ind) => {
    let arr = [];
    show.forEach((value, i) => {
      if(i===ind){
        arr.push(!value)
      }
      else{
        arr.push(value) 
      }
    })

    updateShow(arr)
  }

  

    return(
        <div className="mt3 ml3  theme">
         <label className="center f4  fw6 ph0 mh0 ">Uzdevuma tēma</label >

        <div id="aa">
         <input 
             id="aa"
              autoComplete="off" 
              placeholder='Meklēt tēmu'
            onChange={(field)=> updateSearchField(field.target.value)}
            onClick={()=>updateShowBar(true)}
            className="mt3 w-100 input-reset ba b--black-20 pa2  db "
            type="text"
            aria-describedby="name-desc">
          </input>
          
          <div className="c whel b--green bg-white overflow-x-hidden mt1 absolute ph1">
            { showBar &&
              themes.filter(theme => {
                return theme.theme_name.toLowerCase().startsWith(searchField.toLowerCase())&&searchField
              })
              .map((theme, i) => {
                  return (
                      <div 
                      key={i}
                        onClick={()=>{A(theme.theme_class);updateShowBar(false);updateTaskId(theme.theme_id)}}
                        className="ba whel pv1 b--black-50 mv1"
                      >
                        {theme.theme_name}   
                    </div>
                  );
                })
            }
          </div>
        </div>
        <div className='cx scroll3 '>
        {
          classes.map((classs, i) => {
            return (
              <div key={i} className="mt3 mr3">
              <h3 onClick={() => ShowWitch(i)}  className="f5 b pointer mv2 ml1   black">{classs}. Klase</h3>
                  {show[i] &&
                  themes.filter(theme => {
                    return theme.theme_class === classs
                  }).map((theme, i) => {
                    return (
                      <div
                      className="pr2 pointer pv1"
                      id={theme.theme_id}
                      key={i}
                      onClick={()=>updateTaskId(theme.theme_id)}
                      >
                              {theme.theme_name} 
                            </div>
                          );
                        })       
                      }
                </div>     
              );
            })
          }
        </div>
        </div>
  );
}


export default Themeselection