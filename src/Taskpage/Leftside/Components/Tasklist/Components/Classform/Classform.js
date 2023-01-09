import React,{useState} from 'react';
import './Classform.css'

const Classform = ({classs, themes, updateActiveTheme}) => {

  const [show, updateShow] = useState(false);

  return (
	  <div className="mt4">
      <h3 onClick={() => updateShow(!show) } className="f4 b di mb2 mh4 pointer  blue">{classs}. Klase</h3>
      {show &&
        <ol className="">
        {themes.map((theme, i) => {
              return (
                  <li
                    className="list pt2"
                     key={i}
                     onClick={()=> updateActiveTheme(theme)}
                  >
                     {theme.theme_name} 
                  </li>
              );
            })
          
        }
        </ol>
      }
    </div>
	)
}

export default Classform