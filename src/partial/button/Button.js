
import { decYear, incYear } from 'partial/button';

import './button.scss';



export const Buttons = ({ update }) => (

    const click = (add) => {
        if (add) {
            update(incYear());
        } else {
            update(decYear());
        }
    };
    return (
        <React.Fragment>
            <button onClick={() => click()}>Decrease Year</button> <br/>
            <button onClick={() => click(true)}>Increase Year</button>
        </React.Fragment>
    )

)


/*const items = [
  'Topic title',
  'Some info',
  'Random text',
];

export const Aside = () => (
  <aside className="aside">
    <ul className="aside__list">
      {
         items.map((item, index) => (
           <li key={index} className="aside__list-item">
             <a href={'#'} className="aside__list-link">{item}</a>
           </li>
              ))
          }
    </ul>
  </aside>
);*/
