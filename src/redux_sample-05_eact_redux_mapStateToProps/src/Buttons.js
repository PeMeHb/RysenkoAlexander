import { decYear, incYear } from './actions';

export const Buttons = ({ update }) => {
  const click = (add) => {
    if (add) {
      update(incYear());
    } else {
      update(decYear());
    }
  };

  return (
    <React.Fragment>
      <button onClick={() => click()}>Decrease year</button>&nbsp;&nbsp;
      <button onClick={() => click(true)}>Increase year</button>
    </React.Fragment>
  );
};
