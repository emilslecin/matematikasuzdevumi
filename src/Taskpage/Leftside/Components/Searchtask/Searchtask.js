import React, {useEffect, useState} from 'react';
import Searchblock from './Searchblock/Searchblock';



import './Searchtask.css'

const Searchtask = ({updateActiveTheme, themes}) => {

  const [searchField, updateSearchField] = useState('');
  const [showBar, updateShowBar] = useState(true);

  useEffect(()=>{

    document.addEventListener('click', function handleClickOutsideBox(event) {
    if(event.target.id==='aa'){
      updateShowBar(true)
    }
    else{updateShowBar(false)} });
  })

  return (
    <div className="tc w-60 center mt4 measure relative">
       <label id="nnn" className="nnn center f3 fw6 ph0 mh0 ">Meklēt tēmas :</label >
       
       <div id="aa">
         <input 
         id="aa"
            onChange={(field)=> updateSearchField(field.target.value)}
            onClick={()=>updateShowBar(true)}
            className="mt3 w-100 input-reset ba b--black-20 pa2  db "
            type="text"
            autoComplete='off'
            aria-describedby="name-desc">
          </input>
          
            <div className="c o-90 absolute w-100 bg-yellow ph1">
            { showBar &&
              themes.filter(theme => {
                return theme.theme_name.toLowerCase().startsWith(searchField.toLowerCase())&&searchField
              })
              .map((theme, i) => {
                  return (
                      <Searchblock 
                        updateActiveTheme={updateActiveTheme}
                        key={i} 
                        theme={theme}
                        updateShowBar={updateShowBar}
                      />
                  );
                })
            }
          </div>
        </div>
    </div>
  )
}



export default Searchtask

