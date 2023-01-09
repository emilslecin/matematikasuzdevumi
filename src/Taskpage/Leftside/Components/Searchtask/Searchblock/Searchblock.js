import React from 'react';
//import './Searchblock.css';

const Searchblock = ({theme, updateActiveTheme, updateShowBar}) => {

  return (
    <div 
      onClick={()=>{ updateActiveTheme(theme); updateShowBar(false)}}
      className="ba  pv1 b--black-50 mv1"
    >
      {theme.theme_name}
      
    </div>
  )
}


export default Searchblock
